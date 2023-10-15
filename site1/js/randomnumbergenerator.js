

function RButton() { 
    var from = Number(getInputValueById("From"));
    var to = Number(getInputValueById("To"));

    var result = RandomN(from, to);
    
    changeById("RNumber", result);
}

function RandomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}