const dbConnection = require('../db_connection');

const bcrypt = require('bcrypt');

const getUserData = (email,password,cb)=>{
const sql = {
  text: 'SELECT name,id,role,password FROM users WHERE email = $1',
  values:[email]
}
  dbConnection.query(sql,(err,res)=>{
    if (err) return cb(err)
    console.log(res.rows[0].password,'ramy');
    let hashPassword=res.rows[0].password
    bcrypt.compare(password, hashPassword, function(error, result) {
    if (error) {
        return cb({error,type:'database error'});
      }
      else if(result==true){
        return cb(null,res.rows)
      }
      else {
      return cb({error,type:'password not match'});
      }
});
  });



}
module.exports=getUserData;
