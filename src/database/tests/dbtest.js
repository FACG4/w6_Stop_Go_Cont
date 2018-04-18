const postData = require('../queries/postdata');
const getData = require('../queries/getdata');
const runDbBuild = require('../db_build');
const test = require('tape');

test("test for getting data",t=>{
runDbBuild((err,res)=>{
  let expected = [
        {
        user_name: "MARWA",
        post_content: "stop stop stop",
        type_of_note: "STOP"
        },
        {
        user_name: "RAMY",
        post_content: "stop ramy and ishak",
        type_of_note: "STOP"
        },
        {
        user_name: "MOHAMMED",
        post_content: "GO GOG GO",
        type_of_note: "GO"
        },
        {
        user_name: "RAMY",
        post_content: "go fun time",
        type_of_note: "GO"
        },
        {
        user_name: "ISHAK",
        post_content: "CONT. CONT. CONT.",
        type_of_note: "CONT"
        },
        {
        user_name: "ISHAK",
        post_content: "continue team",
        type_of_note: "CONT"
        }
]
  getData((err,res)=>{
    if (err) console.log(err);
    t.deepEqual(res,expected,"Both arrays are equals")
    t.end()
  });

})

})



test("test for inserting data",t=>{
runDbBuild((err,res)=>{

  postData(1,'test for stop', 'STOP',(err,res)=>{
    if (err) console.log(err);
    getData((err,res)=>{
      if (err) console.log(err);
      t.deepEqual(res.length,7,"Length match")
      t.end()
    });
  })

});

})
