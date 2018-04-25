var bcrypt = require('bcrypt');
const hashPassword = (password,cb) => {
  bcrypt.hash(password, 8,(err, hash)=> {
    if (err) {
        return cb(err);
    }
    else {
      console.log(hash);
       cb(null,hash)
    }
  });
};
module.exports=hashPassword
