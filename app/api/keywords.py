"""
Roland Fong
API for keyword stuffs
"""
from flask import Blueprint, jsonify, request
from bson import ObjectId
from database import fs
from settings import APP_ROOT
import networkx as nx
import operator
import math
import re
import os

keywords_api = Blueprint('keywords_api', __name__)

matcher = re.compile(r'[\u4e00-\u9fff]+')


@keywords_api.route('/keywordcounts', methods=['GET'])
def get_keyword_counts():
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])
    n = int(all_args.get('n', 1))  # n-grams
    limit = int(all_args.get('limit', 100))

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    counts = {}

    for file in files:
        text = file.read().decode('utf-8')
        for i in range(0, len(text) - n + 1):
            c = []
            cont = False
            for j in range(0, n):
                c.append(text[i + j])
                if not matcher.match(c[j]):
                    cont = True

            if cont:
                continue

            n_gram = ''.join(c)

            if not n_gram in counts:
                counts[n_gram] = 1
            else:
                counts[n_gram] = counts[n_gram] + 1

    sorted_counts = sorted(counts.items(), key=operator.itemgetter(1), reverse=True)
    freqs = list(map(lambda x: {'word': x[0], 'freq': x[1]}, sorted_counts))

    return jsonify(freqs[:limit])


@keywords_api.route('/keywordperm', methods=['GET'])
def get_keyword_permutations():
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])
    keywords = re.split('[，,]+', all_args['keywords'])
    keywords = list(filter(None, keywords))
    window = int(all_args.get('window', 5))  # get n chars before after keyword

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    permutations = []

    for file in files:
        contents = file.read().decode('utf-8')
        # find the start/end indices of keywords
        indices = []
        for keyword in keywords:
            indices = indices + [(m.start(), m.end()) for m in re.finditer(keyword, contents)]

        # obtain strings of certain length
        for s, e in indices:
            new_start = max(0, s - window)
            new_end = min(e + window, len(contents))
            permutations.append({
                'filename': file.filename,
                'fileid': str(file._id),
                'before': contents[new_start:s],
                'keyword': contents[s:e],
                'after': contents[e:new_end]
            })

    return jsonify(permutations)


# split the text into an array of words given dictionary (array) for that text
def segment_text(text, dictionary):
    wordlist = []
    i = 0
    while i < len(text):
        if not matcher.match(text[i]):
            i = i + 1
            continue
        c = text[i]

        wordlist.append(c)  # ignore the dictionary

        # only allows unigrams:
        # if c in dictionary:
        #     wordlist.append(c)

        # allows for bigrams:
        # if i < len(text) - 1:
        #     bigram = c + text[i + 1]
        #     if bigram in dictionary:
        #         wordlist.append(bigram)
        #         i = i + 1
        #     elif c in dictionary:
        #         wordlist.append(c)
        # elif c in dictionary:
        #     wordlist.append(c)

        i = i + 1

    return wordlist


# create graph from texts and window size
def create_col_graph(texts, full_dictionary, d):
    g = nx.Graph()

    for t in texts:
        words = segment_text(t, full_dictionary)

        g.add_nodes_from(list(set(words)))

        i = 0
        while i < len(words):
            for j in range(1, d):
                if i + j < len(words):
                    g.add_edge(words[i], words[i + j])
            i = i + 1

    degrees = dict(nx.degree(g))
    nx.set_node_attributes(g, name='degree', values=degrees)

    return g


def create_keyword_graph(files, window, dist, keywords):
    stopwords = []
    with open(os.path.join(APP_ROOT, './static/stopwords.txt'), 'r') as stop_file:
        for w in stop_file:
            stopwords.append(w[:-1])

    full_dictionary = []
    with open(os.path.join(APP_ROOT, './static/dictionary.txt'), 'r') as dict_file:
        for w in dict_file:
            full_dictionary.append(w[:-1])

    full_dictionary = list(filter(lambda d: not d in stopwords, list(full_dictionary)))

    # concat the contents of all the files, separated by null char
    all_texts = list(map(lambda f: f.read().decode('utf-8'), files))
    graph = create_col_graph(all_texts, full_dictionary, window)

    # if keywords specified, then only include keywords and nodes that
    # are distance away from keyword nodes
    if not (keywords == ['']):
        new_graph = nx.Graph()
        new_graph.add_nodes_from(nx.nodes(graph))
        for keyword in keywords:
            succ_dict = {k: v for k, v in nx.bfs_successors(graph, keyword)}
            succs = [keyword]
            for i in range(0, dist):
                temp_succs = []
                while len(succs) > 0:
                    succ = succs.pop()
                    if succ in succ_dict:
                        for s in succ_dict[succ]:
                            new_graph.add_edge(succ, s)
                            temp_succs.append(s)
                succs = temp_succs

        # delete zero degree nodes that are not keywords
        degrees = dict(nx.degree(new_graph))
        nx.set_node_attributes(new_graph, name='degree', values=degrees)
        zero_degree_nodes = []
        for n in new_graph:
            if degrees[n] == 0 and not (n in keywords):
                zero_degree_nodes.append(n)
        new_graph.remove_nodes_from(zero_degree_nodes)
        graph = new_graph

    return graph


# Generate keyword graph with given texts, with connections to words
# within window (default 2) and optionally only show connections
# to given keywords
@keywords_api.route('/keywordgraph', methods=['GET'])
def get_keyword_graph():
    # TODO return error when arg missing
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])
    window = int(all_args.get('window', 2))
    dist = int(all_args.get('distance', 5))  # graph distance of words from keyword
    keywords = re.split(',', all_args.get('keywords', ''))

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    graph = create_keyword_graph(files, window, dist, keywords)

    return jsonify(nx.node_link_data(graph))


@keywords_api.route('/keywords', methods=['GET'])
def get_keywords():
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])
    window = int(all_args.get('window', 2))
    n = int(all_args.get('n', -1))  # how many keywords to return

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    graph = create_keyword_graph(files, window, 0, [''])

    ranks = nx.pagerank(graph)
    n = n if n != -1 else len(ranks)
    ranks = sorted(ranks.items(), key=operator.itemgetter(1), reverse=True)[:n]
    ranks = list(map(lambda x: {'word': x[0], 'rank': x[1]}, ranks))

    return jsonify(ranks)


# score types include 'freq', 'mu', 'mi', 'mi2', 'll', 'z', 'dice', 'log-dice', 't', 'log-ratio', 'min-sensitivity'
def create_keyword_graph2(texts, d, terms, score_type):

    stopwords = []
    with open(os.path.join(APP_ROOT, './static/stopwords.txt'), 'r') as stop_file:
        for w in stop_file:
            stopwords.append(w[:-1])

    n = 0  # total number of tokens in entire corpus
    for t in texts:
        n += len(t)

    term_freqs = {}  # term frequency (term: r1)
    collocate_freqs = {}  # the words collocated with term (collocate: c1)
    collocations = {}  # the collocations ((word, collocate) : { O11, O12, O21, O22, E11, E12, E21, E22 })

    # iterate through text to find term instances
    for text in texts:
        for i, word in enumerate(text):
            if word not in terms:
                continue

            if word in term_freqs:
                term_freqs[word] += 1
            else:
                term_freqs[word] = 1

            neighbors = []  # words within the window near term of interest
            for j in range(1, d):
                if i + j < len(text) and text[i+j] not in stopwords and matcher.match(text[i+j]):
                    neighbors.append(text[i + j])
                if i - j >= 0 and text[i-j] not in stopwords and matcher.match(text[i-j]):
                    neighbors.append(text[i - j])

            for w in neighbors:
                collocate_freqs[w] = 0 # placeholder to hold the collocate

                if (word, w) in collocations:
                    collocations[(word, w)]['o11'] += 1
                else:
                    collocations[(word, w)] = {'o11': 1}

    # iterate through texts again to tally collocate counts
    for text in texts:
        for i, word in enumerate(text):
            if word not in collocate_freqs:
                continue
            else:
                collocate_freqs[word] += 1

    for (term, collocate) in collocations.keys():
        k = (term, collocate)
        o11 = collocations[k]['o11']
        r1 = term_freqs[term]
        r2 = n - term_freqs[term]
        c1 = collocate_freqs[collocate]
        c2 = n - collocate_freqs[collocate]
        o12 = r1 - o11
        o21 = c1 - o11
        o22 = r2 - o21
        collocations[k].update({
            'o12': o12,
            'o21': o21,
            'o22': o22,
            'e11': r1 * c1 / n,
            'e12': r1 * c2 / n,
            'e21': r2 * c1 / n,
            'e22': r2 * c2 / n,
        })

    # construct graph
    def create_col_graph2(collocates, scorer):
        g = nx.DiGraph()
        list(map(lambda c: g.add_node(c, term=False), collocates))
        list(map(lambda t: g.add_node(t, term=True), terms))
        list(map(lambda x: g.add_edge(x[0][0], x[0][1], weight=scorer(x[1])), collocations.items()))
        return g

    scorers = {
        'freq': lambda x: x['o11'],
        'mu': lambda x: x['o11'] / x['e11'],
        'mi': lambda x: math.log2(x['o11'] / x['e11']),
        'mi2': lambda x: math.log2(x['o11'] ^ 2 / x['e11']),
        'll': lambda x: 2 * (x['o11'] * math.log(x['o11'] / x['e11']) +
                             x['o12'] * math.log(x['o12'] / x['e12']) +
                             x['o21'] * math.log(x['o21'] / x['e21']) +
                             x['o22'] * math.log(x['o22'] / x['e22'])),
        'z': lambda x: (x['o11'] - x['e11']) / math.sqrt(x['e11']),
        'dice': lambda x: (2 * x['o11']) / (x['r1'] + x['c1']),
        'log-dice': lambda x: 14 + math.log2((2 * x['o11']) / (x['r1'] + x['c1'])),
        't': lambda x: (x['o11'] - x['e11']) / math.sqrt(x['o11']),
        'log-ratio': lambda x: math.log2((x['o11'] * x['r2']) / (x['o21'] * x['r2'])),
        'min-sensitivity': lambda x: min(x['o11'] / x['c1'], x['o11'] / x['r1'])
    }

    return create_col_graph2(collocate_freqs.keys(), scorers[score_type])


@keywords_api.route('/keywordgraph2', methods=['GET'])
def get_keyword_graph2():
    # TODO return error when arg missing
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])
    window = int(all_args.get('window', 2))
    keywords = re.split(',', all_args.get('keywords', ''))
    score_type = all_args.get('score_type', 'mi') # default to mutual information

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    texts = list(map(lambda f: f.read().decode('utf-8'), files))

    graph = create_keyword_graph2(texts, window, keywords, score_type)

    return jsonify(nx.node_link_data(graph))
