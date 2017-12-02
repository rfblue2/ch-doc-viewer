"""
Roland Fong
Python server that interfaces with pyMongo
"""
from flask import Flask, send_from_directory
from flask_cors import CORS
import os

from api.files import files_api
from api.keywords import keywords_api

BUILD_DIR = '../build'
app = Flask(__name__, static_folder=BUILD_DIR)
cors = CORS(app)

app.register_blueprint(files_api, url_prefix='/files')
app.register_blueprint(keywords_api)


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == '':
        return send_from_directory(BUILD_DIR, 'index.html')
    else:
        if os.path.exists('build' + '/' + path):  # quirk - different ref dir
            return send_from_directory(BUILD_DIR, path)
        else:
            return send_from_directory(BUILD_DIR, 'index.html')
