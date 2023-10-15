

var x = 0;
var c = 0;

load();

// load from local storage
function load() {
    removeAll()
    x = 0;
    for (var i = 0; i < localStorage.length; i++) {
        Add(i, localStorage.getItem("Todot" + i));
    }
}

function addButton() {
    // store in local storage
    localStorage.setItem("Todot" + x, document.getElementById("Addinput").value);
    load();
}



function Add(c, value) {
    var Todot = document.createElement("div");
    Todot.id = "" + c; Todot.className = "Todot";

    var ps = document.createElement("div");
    ps.id = "ps"; ps.className = "ps";

    var buttons = document.createElement("div");
    buttons.id = "buttons"; buttons.className = "buttons";

    var p = document.createElement("p");
    p.className = "p"; p.style.cssText += "background-color: " + getRandomColor() + ";";

    var checkCon = document.createElement("div");
    checkCon.id = "checkCon"; checkCon.className = "checkCon";

    var checkb = document.createElement("input");
    checkb.id = "checkb"; checkb.className = "checkb"; checkb.type = "checkbox"; checkb.onclick = checkTask;

    if (value.charAt(0) == "@") {
        checkb.checked = true;
        p.style.cssText += "text-decoration: line-through; opacity:0.3; color: #bebebe";
        value = value.substring(1);
    }


    var delb = document.createElement("button");
    delb.className = "delb"; delb.onclick = deleteTask;

    var colb = document.createElement("button");
    colb.className = "colb"; colb.onclick = RanColor;



    p.innerHTML = value;

    if (value.trim() != "") {
        console.log(x);
        document.body.appendChild(Todot);
        document.getElementsByClassName("Todot")[x].appendChild(ps);
        document.getElementsByClassName("Todot")[x].appendChild(buttons);



        document.getElementsByClassName("ps")[x].appendChild(p);


        document.getElementsByClassName("buttons")[x].appendChild(checkCon);
        document.getElementsByClassName("checkCon")[x].appendChild(checkb);

        document.getElementsByClassName("buttons")[x].appendChild(delb);
        document.getElementsByClassName("buttons")[x].appendChild(colb);


        x++;


    }
    // for bitter color looking when you loading the page 
    colb.click();
}

var col;

function checkTask() {
    var cb = this;
    var p = this.parentNode.parentNode.previousSibling.firstChild;
    var tn = p.parentNode.parentNode;


    if (cb.checked) {

        col = p.style.color;
        p.style.cssText += "text-decoration: line-through; opacity:0.3; color: #bebebe";
        tn.className += " checked";
        localStorage.setItem("Todot" + tn.id, "@" + p.innerHTML);
    } else {

        p.style.cssText += "text-decoration: none; opacity:1; color: " + col;
        tn.classList.remove("checked");
        // remove first litter from p.innerHTML 
        localStorage.setItem("Todot" + tn.id, p.innerHTML.substring(0));
    }
}


function deleteTask() {
    var tn = this.parentNode.parentNode;
    tn.style.cssText += "opacity:0; transition: opacity 0.5s;";

    setTimeout(() => {
        tn.style.cssText += "display:none;";
    }, 800);

    tn.className += " deleted";

    // get the index of the task
    var index = tn.id;

    console.log(index);

    // remove from local storage
    localStorage.removeItem("Todot" + index);

    // change the key of an item in local storage 
    var arr = [];
    for (var i = 0; i < localStorage.length + 1; i++) {

        if (localStorage.getItem("Todot" + i) == null) i++;

        arr.push(localStorage.getItem("Todot" + i));
    }

    localStorage.clear();

    for (var i = 0; i < arr.length; i++) {
        localStorage.setItem("Todot" + i, arr[i]);
    }



}

// remove all tasks  from local storage 
function removeAll() {
    var Todot = document.getElementsByClassName("Todot");
    var tlength = Todot.length;

    for (var i = 0; i < tlength; i++) {
        Todot[0].remove();
    }
}




function RanColor() {
    var cn = this.parentNode.previousSibling.firstChild;
    var rColor = getRandomColor();
    cn.style.cssText += "background-color: " + rColor + ";";
    // check if the color is dark or light

    console.log(getContrastYIQ(rColor));
    if (getContrastYIQ(rColor) == "dark") {
        cn.style.cssText += "color: white;";
    } else {
        cn.style.cssText += "color: black;";
    }


}


function getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'light' : 'dark';
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}






