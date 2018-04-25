const fs = require('fs');
const path = require('path');
const postData = require('./database/queries/postdata.js');
const getData = require('./database/queries/getdata.js');
const queryString = require('querystring');
const getUserData = require('./database/queries/check')

const contentType = {
  html:'text/html',
  css: 'text/css',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  ico: 'image/ico',
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
      if(postContent.length >0){
      postData(userId, postContent, postType, (err, res) => {
          if (err) {
              response.writeHead(500, 'Content-Type:text/html');
              response.end('<h1>Sorry, there was a problem adding that user</h1>');
          }
        else {
          response.writeHead(302, {"location": "/"});
          response.end('Done')
        }
      });
    }else{
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, Enter some content</h1>');

    }
    });
}


const getDBData = (response)=>{
    getData((err,result)=>{
      if (err) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem adding that user</h1>');
      }
      else {
        response.writeHead(200, 'Content-Type:application/json');
        response.end(JSON.stringify(result))
      }
    })
}

const getUserDataFromDB = (request,response)=>{
  let data = '';
  request.on('data', function(chunk) {
      data += chunk;
  });
  request.on('end', () => {
    console.log(data);
      const email = queryString.parse(data).email.trim();
      const password = queryString.parse(data).password;
      console.log(email,password);
      if(email.length >0&&password.length>0){
      getUserData(email,password, (err, res) => {
        if (err) {
          let typeError=err.type
          if (typeError==='database error') {
            response.writeHead(500, 'Content-Type:text/html');
            response.end('<h1>Sorry, something error</h1>');

          }
          else {
            response.writeHead(500, 'Content-Type:text/html');
            response.end('<h1>Sorry, password not match</h1>');
          }
        }



        else if (res.length == 0) {
              response.writeHead(500, 'Content-Type:text/html');
              response.end('<h1>Sorry, user not found</h1>');
          }
        else {
          console.log(res);
          response.writeHead(302, {"location": "/"});
          response.end('Done')
        }
      });
    }else{
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, Enter some content</h1>');

    }
    });
}

module.exports={
  serveFiles,
  sendDataToDB,
  getDBData,
  getUserDataFromDB
}
