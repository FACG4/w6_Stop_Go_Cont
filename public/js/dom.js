const fetch = (method, url, value, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText)
      cb(response)

    }
  };
  xhr.open(method, url)
  xhr.send(value)
}


const selector=(text)=>{
  return document.querySelector(text)
}

// const divv = document.selectElementById("#stop");
//
// divv.addEventListener("click",function(){
//   document.body.classList.toogle("hideme");
// });

const create = (element)=>{
  document.createElement(element);
}

const showData = (res) => {
  let goDiv = selector("go");
  let contDiv = selector("cont");
  let stopDiv = selector("stop");
res.forEach(item) =>{
let user = res.user_name ;
let postText = res.post_content ;
let typeOfNote = res.type_of_note;
if(typeOfNote == "go"){
create("li");
li.textContent = user ;
create("li");
li.textContent = postText;
create("li");
li.textContent = typeOfNote ;
create("ul");
ul.appendChild(li);
let div = create("div");
div.appendChild(ul);
goDiv.appendChild(div)
}
}}

fetch("POST","/getdata",data,(res)=>{
  showData(res)
})
