const dbConnection = require('../db_connection');

const bcrypt = require('bcrypt');

const getUserData = (email,password1,cb)=>{
const sql = {
  text: 'SELECT name,id,role,password FROM users WHERE email = $1',
  values:[email]
}
  dbConnection.query(sql,(err,res)=>{
    if (err) return cb(err)
    if (res.rows.length>0) {
      let hashPassword=res.rows[0].password
      bcrypt.compare(password1, hashPassword, function(error, result) {
        console.log(result);
        if (error) {
          return cb({err,type:'something error'});
        }
        else if(result==true){
          return cb(null,res.rows[0])
        }
        else {
          return cb({err,type:'password not match'});
        }
      });
    }
    else {
      return cb({err,type:'Invalied eamail'})
    }
  });



}
module.exports=getUserData;
