# Chinese Document Viewer (中国古代文言小说阅读系统) [WIP]

Fall 2017 Independent work project.

This is a document viewer made specifically to support reading Chinese.  Users can upload text files containing Chinese text and perform rudimentary analyses on the text using this web application.  Currently the following functionality is supported:
- Keyword in Context Search
- Keyword Collocation Networks

## Running the server
The server is a flask application.  You must have python 3 with Pipenv installed. To run, setup the virtual environment, then startup the server (localhost:5000)
```
pipenv install      # install required packages
pipenv shell        # start the virtual environment
npm run server      # start development server
```


## Running the client
The client is a react application that runs as a separate application at localhost:3000.  You must have npm installed.
```
npm install         # install required packages
npm start           # start dev server to serve client
```

The client code is linted using eslint.

## Testing in Production
The production app is served by flask on port 5000 and reads a generated build folder.  Generate a static build and then start the server in production.
```
npm run build       # generate static build files
python wsgi.py      # start production server
```
