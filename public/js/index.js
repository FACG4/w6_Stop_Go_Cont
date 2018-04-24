var email = document.getElementById("email");
var password = document.getElementById("password");
var form = document.getElementsByTagName("form")[0];

var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");

var checkEmail = function() {
  if (email.validity.typeMismatch) {
    displayErr(emailErr, "Please enter a valid email address");
  } else if (email.validity.valueMissing) {
    displayErr(emailErr, "Please enter an email address");
  } else {
    displayErr(emailErr, "");
    return true;
  }
};

var checkPw = function() {
  if (password.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};


function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);


form.addEventListener("submit", function(event) {

  if (!checkEmail()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }

});
