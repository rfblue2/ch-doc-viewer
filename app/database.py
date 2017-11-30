from pymongo import MongoClient
import gridfs
import os

MONGO_URI = os.environ.get('MONGODB_URI', 'mongodb://localhost')
client = MongoClient(MONGO_URI)
db = client['heroku_g229m5gt' if ('MONGODB_URI' in os.environ) else 'chineseDB']
fs = gridfs.GridFS(db)
