const dbConnection = require('../db_connection');
const check=(column,value,cb)=>{
  const sql={
    text:`SELECT * FROM users WHERE $1 = $2`,
    values:[column,value]
  }
  dbConnection.query(sql,(err,result)=>{
    if (err) {
        return cb(err)
    }
    if (result.rows.length>0) {
        return cb(null,false)
    }
    return cb(null,true)
  })
}
module.exports =check ;
