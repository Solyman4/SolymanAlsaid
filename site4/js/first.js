
document.getElementById("digclock").style.display = "none";

const deg = 6;
var hr = document.getElementById("hr");
var mn = document.getElementById("mn");
var sc = document.getElementById("sc");

setInterval(() => {

  var day = new Date();
  var hh = day.getHours() * 30;
  var mm = day.getMinutes() * deg;
  var ss = day.getSeconds() * deg;


  hr.style.transform = "rotateZ(" + (hh + (mm / 12)) + "deg)";
  mn.style.transform = "rotateZ(" + (mm) + "deg)";
  sc.style.transform = "rotateZ(" + (ss) + "deg)";

})



// Digital clock 

var dhr = document.getElementById("dhour");
var dmin = document.getElementById("dmin");
var dsec = document.getElementById("dsec");

var ampm = document.getElementById("ampm");


setInterval(() => {
  var day = new Date();
  var hh = day.getHours();
  var mm = day.getMinutes();
  var ss = day.getSeconds();


  mm = checkTime(mm);
  ss = checkTime(ss);
  var campm = hh >= 12 ? 'pm' : 'am';
  if (campm == "pm")
    hh = hh - 12;
  dhr.innerHTML = hh;
  dmin.innerHTML = mm;
  dsec.innerHTML = ss;
  ampm.innerHTML = campm;

})



function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function Cbtn() {

  var bt = document.getElementById("cbt");

  if (bt.innerHTML == "Digital Clock") {
    document.getElementById("clock").style.display = "none";
    document.getElementById("digclock").style.display = "flex";
    bt.innerHTML = "Clock";
  } else {
    document.getElementById("digclock").style.display = "none";
    document.getElementById("clock").style.display = "flex";
    bt.innerHTML = "Digital Clock";
  }

}

