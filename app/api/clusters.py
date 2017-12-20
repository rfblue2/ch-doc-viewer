"""
Roland Fong
API for hierarchical clustering
"""
from flask import Blueprint, jsonify, request
from bson import ObjectId
from database import fs
from scipy.cluster.hierarchy import linkage, to_tree
from functools import reduce
import pandas as pd
import math
import re

clusters_api = Blueprint('clusters_api', __name__)

matcher = re.compile(r'[\u4e00-\u9fff]+')


@clusters_api.route('/dendrogram', methods=['GET'])
def get_dendrogram():
    all_args = request.args.to_dict()
    fileids = re.split(',', all_args['file_ids'])

    files = fs.find({
        '_id': {
            '$in': list(map(lambda x: ObjectId(x), fileids))
        }
    })

    all_texts = dict((f.name, f.read().decode('utf-8')) for f in files)

    doc_freqs = {}
    for title, text in all_texts.items():

        doc_vocab = []
        for i in range(0, len(text)):
            c = text[i]

            if not matcher.match(c):
                continue

            if c not in doc_vocab:
                if not c in doc_freqs:
                    doc_freqs[c] = 1
                else:
                    doc_freqs[c] = doc_freqs[c] + 1
                doc_vocab.append(c)

    # compute tf-idf for each document
    n = len(all_texts)

    def compute_tfidf(text):
        tfidf = {}
        for i in range(0, len(text)):
            c = text[i]

            if not matcher.match(c):
                continue

            if c not in tfidf:
                tfidf[c] = 1
            else:
                tfidf[c] = tfidf[c] + 1
        for t in tfidf:
            tfidf[t] = tfidf[t] * math.log(n / doc_freqs[t])

        tfidf = pd.Series(tfidf)
        tfidf = tfidf / sum(tfidf)
        return tfidf

    tfidfs = list(map(compute_tfidf, all_texts.values()))
    tfidf_df = pd.concat(tfidfs, axis=1, keys=all_texts.keys())
    tfidf_df = tfidf_df.fillna(0)

    clusters = linkage(tfidf_df.transpose(), 'ward')

    # Convert the cluster data into JSON format compatible with D3

    # src: https://stackoverflow.com/questions/19964266/scipy-dendrogram-to-json-for-d3-js-tree-visualisation
    # Create a nested dictionary from the ClusterNode's returned by SciPy
    def add_node(node, parent):
        # First create the new node and append it to its parent's children
        new_node = dict(node_id=node.id, children=[])
        parent['children'].append(new_node)

        # Recursively add the current node's children
        if node.left: add_node(node.left, new_node)
        if node.right: add_node(node.right, new_node)

    # Label each node with the names of each leaf in its subtree
    def label_tree(t, labels):
        # If the node is a leaf, then we have its name
        if len(t['children']) == 0:
            leaf_names = [labels[t['node_id']]]

        # If not, flatten all the leaves in the node's subtree
        else:
            leaf_names = reduce((lambda ls, c: ls + label_tree(c, labels)), t['children'], [])

        # Delete the node id since we don't need it anymore and
        # it makes for cleaner JSON
        del t['node_id']

        # Labeling convention: '-'-separated leaf names
        t['name'] = '-'.join(sorted(map(str, leaf_names)))

        return leaf_names

    tree = to_tree(clusters, rd=False)
    dendrogram = dict(children=[], name='Root1')
    add_node(tree, dendrogram)
    label_tree(dendrogram['children'][0], tfidf_df.columns.values)
    
    return jsonify(dendrogram)

