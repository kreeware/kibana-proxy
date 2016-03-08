# Purpose

Proxy requests from port 8000 to port 5601, using a url prefix. Mostly useful for testing the `basePath` setting of Kibana.

URL prefix is `kibana` and is automatically appended when visiting [http://localhost:8000](http://localhost:8000)

# Usage

`npm install && npm start`

Then visit [http://localhost:8000](http://localhost:8000)