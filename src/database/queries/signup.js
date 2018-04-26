const dbConnection = require('../db_connection');

const fun = (name,user_name,password,email,cb)=>{
let sql = {
  text:'INSERT INTO users (name,user_name,password,email) VALUES ($1,$2,$3,$4)',
  values:[name,user_name,password,email]
}
dbConnection.query(sql,(err,result)=>{
  if (err) {
    console.log(err);
    cb(err)
  }
  else {
    console.log('done');
    cb(null,result)
  }
})
  console.log("hi");
}
module.exports = fun;
