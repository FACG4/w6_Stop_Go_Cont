const fs = require('fs');
const path = require('path');
const postData = require('./database/queries/postdata.js');
const getData = require('./database/queries/getdata.js');
const queryString = require('querystring');
const check = require('./database/queries/checksignup');
const getUserData = require('./database/queries/check')
const hashPassword = require('./hash');
const signupToDb = require('./database/queries/signup');
const jwt = require('jsonwebtoken');
const addcommentquery = require('./database/queries/addcommentq');
const getcommentquery = require('./database/queries/getcommentquery');
const cookie = require('cookie');
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
  // console.log(request.body);
  let userInfo = [] ;
  request.on('data',chunk =>{
    userInfo += chunk
  });
  request.on('end',()=>{
    // console.log(userInfo);
    userInfo = JSON.parse(userInfo)

     const name = 'test' ;
    const username = userInfo.userName;
    const password = userInfo.password;
    const email = userInfo.email;
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
                  console.log('all done reach end');
                  response.writeHead(302, {'location':'/'});
                  response.end('sssss')
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
    // console.log(data);
      const email = queryString.parse(data).email.trim();
      const password = queryString.parse(data).password;
      // console.log(email,password);
      if(email.length >0&&password.length>0){
      getUserData(email,password, (err, res) => {
        if (err) {
            response.writeHead(500, 'Content-Type:text/html');
            response.end(`<h1>Sorry, ${err.type}</h1>`);



        }



        else if (res.length == 0) {
              response.writeHead(500, 'Content-Type:text/html');
              response.end('<h1>Sorry, user not found</h1>');
          }
        else {
          // console.log(res);

          const userData={userName:res.name,id:res.id,role:res.role}
          // console.log(userData);
          jwt.sign(JSON.stringify(userData),process.env.JWT_KEY,(err,token)=>{
            response.writeHead(302,{'set-cookie':[`name=${res.name}`,
          `token=${token}`],
          'location':'/'
            })
        response.end()
          })
          // response.writeHead(302, {"location": "/"});
        }
      });
    }else{
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, Enter some content</h1>');
    }
    });
}

const checkToken = (rout,request,response)=>{
  console.log(1);
  if(request.headers.cookie){
    console.log(2);
    const cookietoken=cookie.parse(request.headers.cookie).token
    jwt.verify(cookietoken,process.env.JWT_KEY, function(err, decoded) {
      if (err) {
        console.log(3);
        console.log(err);
          response.writeHead(501,{'Content-Type': 'text/html'})
          response.end('<h1>Sorry,error in reading cookies</h1>');

      }
      else if (decoded) {
        console.log(4);
        console.log(decoded,"gggggg");
        if (rout==='/login.html') {
          console.log(5);
          console.log('we have cookies and the rout is ',rout);
          response.writeHead(302,{'location':'/'})
          response.end()
        }
        else if(rout==='/index.html'){
          console.log(6);
          console.log('we have cookies and the rout is ',rout);
          serveFiles('/index.html', response);
        }

      }

// err
// decoded undefined
});



  //  if(rout==='/index.html'){
  //    console.log(7);
  //   console.log('we have cookies and the rout is ',rout);
  //   response.writeHead(302,{'location':'/login'})
  //   response.end()
  // }
  // else{
  //   console.log(8);
  //   serveFiles('/login.html', response);
  //
  // }
}else if(rout==='/login.html'){
console.log(9);
  serveFiles('/login.html', response);
}
else {
  console.log(10);
  response.writeHead(302,{'location':'/login'})
  response.end()

}

//
//   console.log('hi');
//   if(request.headers.cookie){
//     console.log(request.headers.cookie);
//   const obj = cookie.parse(request.headers.cookie);
//   // console.log(obj);
//     if(obj.token&&rout!= '/login.html'){
//
//       serveFiles('/index.html', response);
//
//       // serveFiles(rout, response);
//     // console.log(obj);
//     // response.writeHead(302,{'location':'/'})
//     // response.end()
// }
// }  else if(rout==='/login.html'){
//   serveFiles('/login.html', response);
// }else{
//   response.writeHead(302,{'location':'/login'})
//   response.end()
//
// }


}


const logout=(request,response)=>{
  // let cookie=request.headers.cookie

response.writeHead(302,
   { 'Set-Cookie': ['token=false; HttpOnly; Max-Age=0','name=false;HttpOnly;Max-Age=0'],
    'location':'/login'
  }
);
response.end()
}


const addcomment=(request,response)=>{
  let alldata=[]
  request.on('data',data=>{
    alldata+=data
  })
  request.on('end',()=>{
    alldata = JSON.parse(alldata)
    const post_id=alldata.post_id
    const user_id=alldata.user_id
    const post_comment_content=alldata.comment_content
    addcommentquery(post_id,user_id,post_comment_content,(err,result)=>{
      if (err) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem adding that comment</h1>');
      }
      else {
        response.writeHead(200, 'Content-Type:application/json');
        response.end(JSON.stringify(result))

      }
    })
  })
}
const getcomment=(request,response)=>{
  let alldata=[]
  request.on('data',data=>{
    alldata+=data
  })
  request.on('end',()=>{
getcommentquery((err,result)=>{
  if (err) {
    response.writeHead(500, 'Content-Type:text/html');
    response.end('<h1>Sorry, there was a problem adding that comment</h1>');
  }
  else {
    response.writeHead(200, 'Content-Type:application/json');
    response.end(JSON.stringify(result))
  }
})
  })
}





module.exports={
  serveFiles,
  sendDataToDB,
  getDBData,
  signUp,
  getUserDataFromDB,
  logout,
  addcomment,
  getcomment,
  checkToken
}
