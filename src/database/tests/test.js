const postData = require('../queries/insert.js');
const search = require('../queries/search.js');
const test = require('tape');


//this is tests for insert query function
test("test for inserting data"),t=>{
  let actual = ,
  let expected={
    post_id:1,
    user_id:2,
    post_content:"Hi there",
    post_type:"GO"
  }
  postData()
  t.eqauls(actual,expected,"ITs OK")
  t.end()
}
