const fs = require('fs');
const path = require('path');
const postData = require('./database/queries/postdata.js');
const getData = require('./database/queries/getdata.js');
const queryString = require('querystring');
const check = require('./database/queries/checksignup');
const getUserData = require('./database/queries/check')
const hashPassword = require('./hash');
const signupToDb = require('./database/queries/signup');
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
  let userInfo = [] ;
  request.on('data',chunk =>{
    userInfo += chunk
  });
  request.on('end',()=>{
    const name = queryString.parse(userInfo).name ;
    const username = queryString.parse(userInfo).username ;
    const password = queryString.parse(userInfo).password;
    const email = queryString.parse(userInfo).email;
    if(username.length<3 || username.length>30){
      console.log(2);
      response.end('length of username must be from 3 to 8');
    }else if(username ===''){
      console.log(1);
      response.end('you must enter your name');
    }else if(password.length<8){
      console.log(3);
    response.end('password should not be less than 8')
  }else{
    console.log('ِAll Is Ok');
    check('user_name' ,username,(err,result)=>{
      if(err){
        response.end('Sorry,user name has benn token');
      }
      else{
        console.log('user check is ok');
        // console.log(result);
        // response.end('result')
        check('email' ,email,(err,result)=>{
          if(err){
            response.end('Sorry,this email has been signed in');
          }
          else{
            // console.log(result);
            // response.end(result)
            console.log('email check is ok');

            hashPassword(password,(err,res)=>{
              if (err) {
              return  console.log("err");
              }
              signupToDb(name,username,res,email,(err,result)=>{
                if (err) {
                    return (err)
                }
                else {
                  response.writeHead(302, {'location':'/'});
                  response.end()
                }
              })
              })
          }
        })
      }
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




const logout=(request,response)=>{
  // let cookie=request.headers.cookie

response.writeHead(302,
   { 'Set-Cookie': ['token=false; HttpOnly; Max-Age=0','logged=false;HttpOnly;Max-Age=0'],
    'location':'/login'
  }
);
response.end()
}


module.exports={
  serveFiles,
  sendDataToDB,
  getDBData,
  signUp,
  getUserDataFromDB,
  logout
}
