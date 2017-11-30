'''
Roland Fong
API for files
'''
from flask import Blueprint, request, json
from helpers import JSONEncoder
from bson import ObjectId
from database import db, fs

files_api = Blueprint('files_api', __name__)

@files_api.route('/', methods=['POST'])
def save_upload():
  file = request.files['file']
  filename = file.filename
  fileid = fs.put(file, filename=filename)
  return json.dumps({
    'filename': filename, 
    'id': str(fileid)
  }), 200, {'ContentType':'application/json'} 

@files_api.route('/', methods=['GET'])
def get_filenames():
  files = list(db.fs.files.find({}, ['_id', 'filename']))
  return JSONEncoder().encode(files)

@files_api.route('/<fileid>', methods=['GET'])
def get_file(fileid):
  file = fs.find_one({'_id': ObjectId(fileid)})
  return json.dumps({
    'id': fileid, 
    'filename': file.filename, 
    'text': str(file.read(), encoding='utf-8'),
  }), 200, {'ContentType':'application/json'}  

@files_api.route('/<fileid>', methods=['DELETE'])
def delete_file(fileid):
  file = fs.delete(ObjectId(fileid))
  return json.dumps({'id': fileid}), 200, {'ContentType':'application/json'} 
