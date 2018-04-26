const dbConnection = require('../db_connection');
const addcommentquery=(post_id,user_id,comment_content,cb)=>{
  const sql={
    text:`INSERT INTO comments (post_id,user_id,comment_content) VALUES
    ($1,$2,$3); `,
    values:[post_id,user_id,comment_content]
  }
  dbConnection.query(sql,(err,res)=>{
    if (err) {
      return cb(err)

    }
    else {
        dbConnection.query('select * from comments;',(err,res)=>{
          if (err) {
            return cb(err)
          } else {
            console.log(res.rows);
            return cb (null,res.rows)
          }
        })
    }
  })
}
module.exports=addcommentquery
