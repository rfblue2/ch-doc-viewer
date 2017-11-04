# Chinese Document Viewer (中文文件读机) [WIP]

Fall 2017 Independent work project.

This is a document viewer made specifically to support reading Chinese.  Users can upload text files containing Chinese text and perform rudimentary analyses on the text using this web application.  Currently the following functionality is supported:
- Keyword Collocation Networks

## Running the server
The server is a flask application.  You must have python (with pip), virtualenv, and flask installed. To run, setup the virtual environment, then startup the server (localhost:5000)
```
source ch-env/bin/activate          # start up virtual environment
pip install -r requirements.txt
python wsgi.py
```

## Running the client
The client is a react application that runs as a separate application at localhost:3000.  You must have npm installed.
```
npm install
npm start
```

The client code is linted using eslint.
