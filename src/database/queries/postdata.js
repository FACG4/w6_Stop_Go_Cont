const dbConnection = require('../db_connection');

const postData = (userId, postContent, postType, cb ) =>{
  const sql = {
    text:'INSERT INTO posts (user_id,post_content,type_of_note) VALUES ($1,$2,$3)',
    values:[userId,postContent,postType]

  }
  dbConnection.query(sql,(err,res) =>{
    if(err){

    return  cb(err)
    }

    cb(null,res)
  });
};


module.exports = postData
