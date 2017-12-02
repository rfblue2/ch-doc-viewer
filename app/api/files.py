"""
Roland Fong
API for files
"""
from flask import Blueprint, request, json
from helpers import JSONEncoder
from database import db, fs
from bson import ObjectId
import re

files_api = Blueprint('files_api', __name__)


# upload a file and return it's name and id
@files_api.route('/', methods=['POST'])
def save_upload():
    all_args = request.args.to_dict()
    folder_id = all_args.get('folder_id', 0) # 0 is root
    file = request.files['file']
    filename = file.filename
    file_id = fs.put(file, filename=filename, folder_id=folder_id)
    return json.dumps({
        'filename': filename,
        'folder_id': folder_id,
        'id': str(file_id)
    }), 200, {'ContentType': 'application/json'}


# get all files, optionally specify ids of specific files
# optionally query by folder
@files_api.route('/', methods=['GET'])
def get_filenames():
    all_args = request.args.to_dict()
    file_ids = re.split(',', all_args.get('file_ids', ''))
    folder_ids = re.split(',', all_args.get('folder_ids', ''))

    query = {}
    if not (file_ids == ['']):
        query['_id'] = {
            '$in': list(map(lambda x: ObjectId(x), file_ids))
        }
    if not (folder_ids == ['']):
        query['folder_id'] = {
            '$in': list(map(lambda x: ObjectId(x), folder_ids))
        }

    files = list(db.fs.files.find(query, ['_id', 'filename', 'folder_id']))
    return JSONEncoder().encode(files)


# get a single file by id
@files_api.route('/<file_id>', methods=['GET'])
def get_file(file_id):
    file = fs.find_one({'_id': ObjectId(file_id)})
    return json.dumps({
        'id': file_id,
        'filename': file.filename,
        'folder_id': str(file.folder_id),
        'text': str(file.read(), encoding='utf-8'),
    }), 200, {'ContentType': 'application/json'}


# delete file by id
@files_api.route('/<file_id>', methods=['DELETE'])
def delete_file(file_id):
    fs.delete(ObjectId(file_id))
    return json.dumps({'file_id': file_id}), 200, {'ContentType': 'application/json'}
