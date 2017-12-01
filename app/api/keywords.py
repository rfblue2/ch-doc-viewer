'''
Roland Fong
API for keyword stuffs
'''
from flask import Blueprint, jsonify, request
from helpers import JSONEncoder
from bson import ObjectId
from database import db, fs
from settings import APP_ROOT
import networkx as nx
import re
import os

keywords_api = Blueprint('keywords_api', __name__)

matcher = re.compile(r'[\u4e00-\u9fff]+')

@keywords_api.route('/keywordperm', methods=['GET'])
def get_keyword_permutations():
  all_args = request.args.to_dict()
  fileids = re.split(',', all_args['fileids'])
  keywords = re.split('[，,]+', all_args['keywords'])
  keywords = list(filter(None, keywords))
  window = int(all_args.get('window', 5)) # get n chars before after keyword 

  files = fs.find({
    '_id': {
      '$in' : list(map(lambda x : ObjectId(x), fileids))
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
    for s,e in indices:
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


################################################################################

@keywords_api.route('/keywordgraph', methods=['GET'])
def get_keyword_graph():
  # TODO query param for window size
  all_args = request.args.to_dict()
  fileids = re.split(',', all_args['fileids'])
  window = all_args.get('window', 2)
  files = fs.find({
    '_id': {
      '$in' : list(map(lambda x : ObjectId(x), fileids))
    }
  })

  stopwords = []
  with open(os.path.join(APP_ROOT, './static/stopwords.txt'), 'r') as stop_file:
    for w in stop_file:
      stopwords.append(w[:-1])

  full_dictionary = []
  with open(os.path.join(APP_ROOT, './static/dictionary.txt'), 'r') as dict_file:
    for w in dict_file:
      full_dictionary.append(w[:-1])
  
  full_dictionary = list(filter(lambda d: not d in stopwords, list(full_dictionary)))

  ##############################################################################
  # Creates keyword collocation graph - refactor this out of this file
  ##############################################################################

  d = window # window to look for adj words

  # create graph from texts
  def create_col_graph(texts):

    # split the text into an array of words given dictionary (array) for that text
    def segment_text(text, dictionary):
      words = []
      i = 0
      while i < len(text):
        if not matcher.match(text[i]):
          i = i + 1
          continue
        c = text[i]

        # only allows unigrams:
        if c in dictionary:
          words.append(c)

        # allows for bigrams:
        # if i < len(text) - 1:
        #   bigram = c + text[i+1]
        #   if bigram in dictionary:
        #     words.append(bigram)
        #     i = i + 1
        #   elif c in dictionary:
        #     words.append(c)
        # elif c in dictionary:
        #   words.append(c)
        
        i = i + 1

      return words

    g = nx.DiGraph()

    for text in texts:
      words = segment_text(text, full_dictionary)

      g.add_nodes_from(list(set(words)))

      i = 0
      while i < len(words):
        for j in range(1, d):
          if (i + j < len(words)):
            if (words[i + j] == '\0'):
              break
            g.add_edge(words[i], words[i + j])
        i = i + 1

    nx.set_node_attributes(g, name='degree', values=dict(nx.degree(g)))

    return g

  ##############################################################################

  # concat the contents of all the files, separated by null char
  texts = list(map(lambda f: f.read().decode('utf-8'), files))
  graph = create_col_graph(texts)

  return jsonify(nx.node_link_data(graph))

################################################################################

@keywords_api.route('/keywords', methods=['GET'])
def get_keywords(fileid):
  # TODO implement by implementing pagerank on keyword graph
  return {}, 501
