const fetch = (method, url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText)
      cb(response)
    }
  };
  xhr.open(method, url)
  xhr.send()
}

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
  results.forEach(function(item) {
    let ul = create("ul", create("div", selector("#" + item.type_of_note), null,"notes"), null);
    create("li", ul,item.user_name,"user")
    create("li", ul ,item.post_content,"text")
  })
}

fetch("POST", "/getdata", (res) => {
  showData(res);
})


////ishak login /////////////////
// 
// fetch("POST", "/login", (res) => {
//
// })
