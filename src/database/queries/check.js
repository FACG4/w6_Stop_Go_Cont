const dbConnection = require('../db_connection');

const getUserData = (email,password,cb)=>{
  console.log('jjjjjjj');
const sql = {
  text: 'SELECT name,id,role FROM users WHERE email = $1 AND password = $2',
  values:[email,password]
}
  dbConnection.query(sql,(err,res)=>{
    if (err) return cb(err)

    return cb(null,res.rows)
  });



}
module.exports=getUserData;
