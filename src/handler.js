const fs = require('fs');
const path = require('path');
const postData = require('./database/queries/postdata.js');
const getData = require('./database/queries/getdata.js');
const queryString = require('querystring');

const contentType = {
  html:'text/html',
  css: 'text/css',
  jpg: 'images/jpg',
  jpeg: 'images/jpeg',
  png: 'images/png',
  ico: 'images/ico',
  js: 'text/javascript'
}

const serveFiles = (endpoint, response)=>{
  const filePath = path.join(__dirname, '..','public', endpoint);
  const fileExtention = endpoint.split('.')[1];
  fs.readFile(filePath, (error, file)=>{
    if (error) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
        console.log(error);
    }
    response.writeHead(200,{'Content-Type':`${contentType[fileExtention]}`});
    response.end(file);
  });
}



const sendDataToDB = (request,response)=>{
  let data = '';
  request.on('data', function(chunk) {
      data += chunk;
  });
  request.on('end', () => {
      const postContent = queryString.parse(data).post.trim();
      const userId = queryString.parse(data).users;
      const postType = queryString.parse(data).postType;
      postData(userId, postContent, postType, (err, res) => {
          if (err) {
              response.writeHead(500, 'Content-Type:text/html');
              response.end('<h1>Sorry, there was a problem adding that user</h1>');
          }
        else {
          response.writeHead(302, {"location": "/"});
          response.end('Done')
          console.log('done');
        }
      });
    });
}


const getDBData = (response)=>{
    getData((err,result)=>{
      if (err) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem adding that user</h1>');

      }
      else {
        response.writeHead(302, {"location": "/"});
        response.end(JSON.stringify(result))
      }
    })
}

module.exports={
  serveFiles,
  sendDataToDB,
  getDBData
}
