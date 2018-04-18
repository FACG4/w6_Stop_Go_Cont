const http = require('http');
const fs = require('fs');
const pg = require('pg');
const handler = require('./handler');

const type = ['/css/style.css','/js/dom.js','/img/favico.jpeg']

const router = (request, response) => {
    const {url} = request
    if (url === '/') {
      handler.serveFiles('/index.html', response);
    }else if (url === "/create-post" && request.method === 'POST') {
      handler.sendDataToDB(request,response)
    }else if (url==="/getdata") {
      handler.getDBData(response)
    }else if (type.includes(url)) {
      handler.serveFiles(url, response);
    }else {
      response.writeHead(404, 'Content-Type:text/html');
      response.end('<h1>Page not found</h1>');
    }
};

module.exports = router;
