const http = require('http');
const fs = require('fs');
const pg = require('pg');
const handler = require('./handler');
const cookie = require('cookie');
const type = ['/css/style.css','/js/dom.js','/favicon.ico','/js/index.js']

const router = (request, response) => {
    const {url} = request
    if (url === '/') {
      handler.checkToken('/index.html',request, response);
    }else if (url === "/create-post" && request.method === 'POST') {
      handler.sendDataToDB(request,response)
    }else if (url==="/login") {
      handler.checkToken('/login.html',request,response)
   }else if (url==="/signup") {
      handler.serveFiles('/register.html', response);
    }else if (url==="/checkUser") {
      handler.getUserDataFromDB(request,response)
    }else if (url==="/getdata") {
      handler.getDBData(response)
    }else if (url==="/adduser" && request.method === 'POST') {
      handler.signUp(request,response)
    }else if (url==="/logout") {
      handler.logout(request,response)
    }else if (url==="/addcomment") {
      handler.addcomment(request,response)
    }else if (url==="/getcomment") {
      handler.getcomment(request,response)
    }
    else if (type.includes(url)) {
      handler.serveFiles(url, response);
    }else {
      response.writeHead(404, 'Content-Type:text/html');
      response.end('<h1>Page not found</h1>');
    }
};

module.exports = router;
