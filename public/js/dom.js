
const selector = (text) => {
  return document.querySelector(text)
}

const create = (element, parent, content,classes) => {
  let newElement = document.createElement(element);
  if (content)  newElement.textContent = content;
  if (classes)  newElement.setAttribute("class", classes)
  if (parent) return parent.appendChild(newElement);
  else  return newElement
}

const showData = (results) => {
  JSON.parse(results).forEach(function(item) {
    let ul = create("ul", create("div", selector("#" + item.type_of_note), null,"notes"), null);
    create("li", ul,item.user_name,"user")
    create("li", ul ,item.post_content,"text")
  })
}

// const showData = (results) => {
//   JSON.parse(results).forEach(function(item) {
//     let ul = create("ul", create("div", selector("#" + item.type_of_note), null,"notes"), null);
//     create("li", ul,item.user_name,"user")
//     create("li", ul ,item.post_content,"text")
//     let input=create('input',ul,null,null)
//     input.addEventListener('keyup',(e)=>{
//       if (e.which===13) {
//         let array={
//           post_id:'1',
//           user_id:'2',
//           comment_content:input.value
//         }
//         console.log(event.target.id);
//         fetch("POST", "/addcomment",array, (res) => {
//           // console.log(res);
//         })
//
//       }
//
//     })
//   })
// }








// var array={
//   username:'ahmed',
//   user_password:'123456789',
//   email:'ramy@ramy.com'
//
// }
fetch("/getdata",{
  method:'POST'
})
.then(response=>( response.text()))
.then(data=>showData(data))


// adding form validation
var form = document.getElementById('signup__form')
if (form) {
  var message=document.getElementById('message')
  message.style.display='none'


form.addEventListener('submit',function(event){
  // event.preventDefault()
  var userName=document.getElementById('userName').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var cPassword = document.getElementById('confirmPassword').value
  message.style.display='block'
  if (!userName || userName.length<2 || userName.length>30) {
    message.textContent='PLEASE ENTER AN User Name with (3-20 characters)'
  }
  else if (!email) {
    message.textContent='PLEASE ENTER AN EMAIL ADDRESS'
  }
  else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}/)) {
    message.textContent='PLEASE ENTER A VALIDE EMAIL ADDRESS'
  }
  else if (password.length<8) {
    message.textContent='Password must be at least 8 characters long.'
  }
  else if (!password.match(/^(?=.*[a-z]).+$/)) {
    message.textContent='Password must contain a lowercase letter.'
  }
  else if (!password.match(/^(?=.*[A-Z]).+$/)) {
    message.textContent='Password montain an uppercase letter.'
  }
  else if (!password.match(/^(?=.*[0-9_\W]).+$/)) {
    message.textContent='Password must contain a number or special character.'
  }
  else if (password!=cPassword) {
    message.textContent='Password YOU ENTERED DO NOT MATCH'
  }
  else{
    // message.style.display='none'
    // fetch("POST","signup",(response)=>{
    //   if (response) {
    //     message.style.display='block'
    //     message.textContent=response
    //
    //   }
    // })
  }
})
}
