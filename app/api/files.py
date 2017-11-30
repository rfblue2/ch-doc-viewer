'''
Roland Fong
API for files
'''
from flask import Blueprint, request, json
from helpers import JSONEncoder
from bson import ObjectId
from database import db, fs
import re

files_api = Blueprint('files_api', __name__)

# upload a file and return it's name and id
@files_api.route('/', methods=['POST'])
def save_upload():
  file = request.files['file']
  filename = file.filename
  fileid = fs.put(file, filename=filename)
  return json.dumps({
    'filename': filename, 
    'id': str(fileid)
  }), 200, {'ContentType':'application/json'} 

# get all files, optionally specify ids of specific files
@files_api.route('/', methods=['GET'])
def get_filenames():
  all_args = request.args.to_dict()
  fileids = re.split(',', all_args.get('fileids', ''))
  query = {} 
  if not(fileids == ['']):
    query = {
      '_id': {
        '$in' : list(map(lambda x : ObjectId(x), fileids))
      }
    }
  files = list(db.fs.files.find(query, ['_id', 'filename']))
  return JSONEncoder().encode(files)

# get a single file by id
@files_api.route('/<fileid>', methods=['GET'])
def get_file(fileid):
  file = fs.find_one({'_id': ObjectId(fileid)})
  return json.dumps({
    'id': fileid, 
    'filename': file.filename, 
    'text': str(file.read(), encoding='utf-8'),
  }), 200, {'ContentType':'application/json'}  

# delete file by id
@files_api.route('/<fileid>', methods=['DELETE'])
def delete_file(fileid):
  file = fs.delete(ObjectId(fileid))
  return json.dumps({'id': fileid}), 200, {'ContentType':'application/json'} 
