'''
Roland Fong
Python server that interfaces with pyMongo
'''
from flask import Flask, jsonify, send_from_directory
from flask import request
from flask import json
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from settings import APP_ROOT
import networkx as nx
import gridfs
import json
import os
import re

app = Flask(__name__, static_folder='build')
cors = CORS(app)
MONGO_URI = os.environ.get('MONGODB_URI', 'mongodb://localhost')
client = MongoClient(MONGO_URI)
db = client['heroku_g229m5gt' if ('MONGO_URI' in os.environ) else 'chineseDB']
fs = gridfs.GridFS(db)
matcher = re.compile(r'[\u4e00-\u9fff]+')

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

################################################################################

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return send_from_directory('client/build', 'index.html')
    else:
        if(os.path.exists("client/build/" + path)):
            return send_from_directory('client/build', path)
        else:
            return send_from_directory('client/build', 'index.html')

################################################################################

@app.route('/files', methods=['POST'])
def save_upload():
  file = request.files['file']
  filename = file.filename
  fileid = fs.put(file, filename=filename)
  return json.dumps({
    'filename': filename, 
    'id': str(fileid)
  }), 200, {'ContentType':'application/json'} 

################################################################################

@app.route('/files', methods=['GET'])
def get_filenames():
  files = list(db.fs.files.find({}, ['_id', 'filename']))
  return JSONEncoder().encode(files)

################################################################################

@app.route('/files/<fileid>', methods=['GET'])
def get_file(fileid):
  file = fs.find_one({'_id': ObjectId(fileid)})
  return json.dumps({
    'id': fileid, 
    'filename': file.filename, 
    'text': str(file.read(), encoding='utf-8'),
  }), 200, {'ContentType':'application/json'}  

################################################################################

@app.route('/files/<fileid>', methods=['DELETE'])
def delete_file(fileid):
  file = fs.delete(ObjectId(fileid))
  return json.dumps({'id': fileid}), 200, {'ContentType':'application/json'} 

################################################################################

@app.route('/keywordgraph')
def get_keyword_graph():
  # TODO query param for window size
  all_args = request.args.to_dict()
  fileid = all_args['fileid']
  file = fs.find_one({'_id': ObjectId(fileid)})
  contents = file.read().decode("utf-8") 

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

  d = 2 # window to look for adj words

  # create graph from text
  def create_col_graph(text):

    # split the text into an array of words given dictionary (array) for that text
    def segment_text(text, dictionary):
      words = []
      i = 0
      while i < len(text):
        if not matcher.match(text[i]):
          i = i + 1
          continue
        c = text[i]
        if i < len(text) - 1:
          bigram = c + text[i+1]
          if bigram in dictionary:
            words.append(bigram)
            i = i + 1
          elif c in dictionary:
            words.append(c)
        elif c in dictionary:
          words.append(c)
        i = i + 1

      return words

    words = segment_text(text, full_dictionary)

    g = nx.DiGraph()
    g.add_nodes_from(list(set(words)))

    i = 0
    while i < len(words):
      for j in range(1, d):
        if (i + j < len(words)):
          g.add_edge(words[i], words[i + j])
      i = i + 1

    nx.set_node_attributes(g, name='degree', values=dict(nx.degree(g)))

    return g

  ##############################################################################

  graph = create_col_graph(contents)

  return jsonify(nx.node_link_data(graph))

################################################################################

def get_keywords(fileid):
  # TODO implement by implementing pagerank on keyword graph
  return {}, 501
