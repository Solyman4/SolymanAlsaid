




function generatePass() {
  var spiC = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "_"];
  var salphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  var calphabet = "ABCDEFGHIGKLMNOPQRSTUVWXYZ".split("");

  var passwordLength = document.getElementById("passL").value;

  if (passwordLength > 50) { return; }



  var password = [];

  for (var i = 0; i <= passwordLength - 1; i++) {

    var spiCrandomNumber = Math.floor(Math.random() * spiC.length),
      spiCrandom = spiC[spiCrandomNumber];

    var salphabetRandomNumber = Math.floor(Math.random() * salphabet.length),
      salphabetRandom = salphabet[salphabetRandomNumber];

    var calphabetRandomNumber = Math.floor(Math.random() * calphabet.length),
      calphabetRandom = calphabet[calphabetRandomNumber];

    var numbersRandom = Math.floor(Math.random() * 10); // random from 0 to 9

    var Arrays = [spiCrandom, salphabetRandom, calphabetRandom, numbersRandom];


    var randomN = Math.floor(Math.random() * 4),
      randomArray = Arrays[randomN];

    password[i] = randomArray;
  }



  var passdiv = document.getElementById("pass");
  passdiv.style.color = "black";
  passdiv.style.fontWeight = "bold";
  passdiv.innerHTML = password.join("");





}

// $("ti").hide();  // Jquery

function copy() {
  var elm = document.getElementById("pass");

  if (elm.innerHTML === "Create Password") {
    return;
  }
  // copy for Internet Explorer

  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(elm);
    range.select();
    document.execCommand("Copy");
  }
  else if (window.getSelection) {
    // copy other browsers

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
  }

  // toast action 

  VanillaToasts.create({

    // notification title
    title: 'Password is copied .',

    // notification message
    text: 'the copied password : ' + elm.innerHTML,

    // success, info, warning, error   / optional parameter
    type: 'info',

    // path to notification icon
    // icon: '/img/alert-icon.jpg',

    // topRight, topLeft, topCenter, bottomRight, bottomLeft, bottomCenter
    positionClass: 'topCenter',

    // auto dismiss after 5000ms
    timeout: 5000

    // executed when toast is clicked
    // callback: function() { ... } 

  });

}
