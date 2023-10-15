




function cl(s) { 
    console.log(s);
}


function changeById(id , change) {
   
    document.getElementById(id).innerHTML = change;

}

function changeByClass(className , change) {
   
    document.getElementsByClassName(className)[0].innerHTML = change;

}

function getInputValueById(id) {
   
    return document.getElementById(id).value;

}

function getById(id) {
   
    return document.getElementById(id);

}








