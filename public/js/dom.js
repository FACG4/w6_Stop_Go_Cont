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

// const divv = document.selectElementById("#stop");
//
// divv.addEventListener("click",function(){
//   document.body.classList.toogle("hideme");
// });

const create = (element, parent, content) => {

  let newElement = document.createElement(element);
  if (content) {
    newElement.textContent = content;
  }
  if (parent) {
    return parent.appendChild(newElement);
  } else {
    return newElement
  }


}


const showData = (results) => {

  let childGo = create("div", selector("#go"), null);
  let childCont = create("div", selector("#cont"), null);
  let childStop = create("div", selector("#stop"), null);


  results.forEach(function(item) {

    let array = [item.user_name, item.post_content, item.type_of_note]

    let ul = create("ul", create("div", selector("#" + item.type_of_note), null), null);
    array.forEach(details => {
      let li = create("li", ul, details)
      console.log(ul);

    })
  })
}


fetch("POST", "/getdata", (res) => {
  showData(res);
})
