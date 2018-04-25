const dbConnection = require('../db_connection');
const getcommentquery=(cb)=>{
  const sql={
    text:'select * from comments;'
  }
  dbConnection.query(sql,(err,res)=>{
    if (err) {
      return cb(err)
    } else {
      return cb (null,res.rows)
    }
  })
}
module.exports=getcommentquery
