const dbConnection = require('../db_connection');

const getData = (cb)=>{
const sql = {
  text: `SELECT users.user_name,posts.post_content,posts.type_of_note
  FROM posts
  INNER JOIN users
  ON posts.user_id= users.id
  ORDER BY type_of_note DESC`
}
  dbConnection.query(sql,(err,res)=>{
    if (err) return cb(err)
    return cb(null,res.rows)
  });



}
module.exports=getData;
