var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const postData = require('./database/queries/postdata.js');
const getData = require('./database/queries/getdata.js');
const queryString = require('querystring');
const check = require('check');
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

const signUp =(request,response)=>{
  let userInfo = '' ;
  request.on('data',chunk =>{
    userInfo += chunk
  });
  request.on('end',()=>{
    userInfo=JSON.parse(userInfo)
    const username = userInfo.username ;
    const user_password = userInfo.user_password;
    const email = userInfo.email;
    console.log(username);
    console.log(typeof queryString.parse(userInfo));
    if(username.length<3 || username.length>30){
      console.log(2);
      response.end('length of username must be from 3 to 8');
    }else if(username ===''){
      console.log(1);
      response.end('you must enter your name');
    }else if(user_password.length<8){
      console.log(3);
    response.end('password should not be less than 8')
  }else{
    console.log('hi');
    check = ('user_name' ,username,(err,response)=>{
      if(err){
        response.end('Sorry,Unvalid email');
      }
      else{
        response.end('Done')
      }
    })

    check = ('email' ,email,(err,response)=>{
      if(err){
        response.end('Sorry,Unvalid email');
      }
      else{
        response.end('Done')
      }
    })




    const hashPassword = bcrypt.hash(user_password, 8, (err, hash) => {
        if(err){
        return err
      }else {
        return hash
      }
//
//         signupToDb(username ,hashedPassword,(err,res)=>{
//           if(err){
//             response.writeHead(500, 'Content-Type:text/html');
//             response.end('<h1>Sorry, there was a problem adding that user</h1>');
//           }
//           else {
//             response.writeHead(200, 'Content-Type:application/json');
//             response.end()
//           }
//           }
//         });
//       }
//
//   });
//
//   });
// };
//
//
//

})

    }
  });
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

          if (res.length ===0) {
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

  signUp,

  getUserDataFromDB

}
