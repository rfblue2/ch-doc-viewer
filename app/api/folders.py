"""
Roland Fong
API for handling folders
"""

from flask import Blueprint, json, jsonify, request
from helpers import JSONEncoder
from database import db, fs
from bson import ObjectId

folders_api = Blueprint('folders_api', __name__)


@folders_api.route('/', methods=['GET'])
def get_folders():
    cursor = db.folders.find({})
    folders = []
    for f in cursor:
        folders.append(f)
    return JSONEncoder().encode(folders)


@folders_api.route('/', methods=['POST'])
def add_folder():
    all_args = request.args.to_dict()
    folder_name = all_args['folder_name']
    result = db.folders.insert_one({
        'folder_name': folder_name
    })
    return json.dumps({
        'folder_name': folder_name,
        '_id': str(result.inserted_id)
    }), 200, {'ContentType': 'application/json'}


@folders_api.route('/<folder_id>', methods=['GET'])
def get_folder(folder_id):
    folder = db.folders.find_one({'_id': ObjectId(folder_id)})
    return jsonify(folder)


@folders_api.route('/<folder_id>', methods=['DELETE'])
def delete_folder_and_files(folder_id):
    if folder_id == 0: # cannot delete root!
        return json.dumps({'message': 'Cannot delete file root!'}), 400

    # delete files in folder
    files = fs.find({'folder_id': folder_id})
    file_ids = list(map(lambda f: f._id, files))
    map(lambda i: fs.delete(i), file_ids)

    db.folders.delete_one({'_id': ObjectId(folder_id)})

    return json.dumps({
        'folder_id': folder_id,
        'file_ids': file_ids
    }), 200, {'ContentType': 'application/json'}