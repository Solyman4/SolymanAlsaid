
var sd = new Date();

var ed = sd.getMonth() + 1;
if (ed.toString().length == 1) {
    ed = "0" + ed;
}
document.getElementById('sdate').defaultValue = sd.getFullYear() + '-' + ed + '-' + sd.toDateString().substring(8, 10);


var database = firebase.database();

var n = 0;
database.ref('AA Number of reserves').once('value').then(function (snapshot) {
    n = (snapshot.val() && snapshot.val().reservesNumber) || 0;
});

var td = document.getElementsByTagName('td');


readFromDataBase();

async function readFromDataBase() {

    await database.ref('AA Number of reserves').once('value').then(function (snapshot) {
        n = (snapshot.val() && snapshot.val().reservesNumber) || 0;
    });

    for (let i = 1; i <= n; i++) {

        database.ref('reserve' + i).on('value', function (snapshot) {
            var week = (snapshot.val() && snapshot.val().week) || "Unknown";
            var day = (snapshot.val() && snapshot.val().day) || "Unknown";
            var time = (snapshot.val() && snapshot.val().time) || "Unknown";
            var year = (snapshot.val() && snapshot.val().year) || "Unknown";
            var desc = (snapshot.val() && snapshot.val().desc) || "Unknown";

            for (let i = 0; i < td.length; i++) {

                if (td[i].className.substring(14, 16) == week &&
                    td[i].className.substring(11, 13) == year &&
                    td[i].className.substring(6, 9) == day &&
                    td[i].className.substring(1, 3) == time) {


                    var di = document.createElement('div');
                    var disp = document.createElement('span');
                    disp.innerHTML = desc;
                    di.appendChild(disp);
                    td[i].appendChild(di);


                }
            }

        });

    }
    document.getElementById('loader').style = "display:none;"

}




var sdate = document.getElementById('sdate');
var sdatev = document.getElementById('sdate').value;
console.log(sdatev);



// Updating table on load

var th = document.getElementsByTagName('th');

var tday = getTheDayName(sdatev);

for (let i = 0; i < th.length; i++) {

    if (th[i].innerHTML.substring(0, 3).toLowerCase() == tday) {
        th[i].innerHTML += "<br> " + sdatev.substring(5, 10);

        th[i].style = "background-color :rgba(0,0,0,0.1); transition:1s;"
        var td = document.getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            if (td[j].classList.contains(th[i].innerHTML.substring(0, 3).toLowerCase())) {
                td[j].style = "background-color :rgba(0,0,0,0.03); transition:1s;"
            }
        }

        var j = 1;
        while (j <= 7) {
            if (th[i + j - 1].innerHTML.substring(0, 3).toLowerCase() == "sun") {
                break;
            }
            th[i + j].innerHTML += "<br> " + incDay(sdatev, -j).substring(5, 10);
            j++;
        }
        j = 1;
        while (j <= 7) {
            if (th[i - j + 1].innerHTML.substring(0, 3).toLowerCase() == "sat") {
                break;
            }
            th[i - j].innerHTML += "<br> " + incDay(sdatev, j).substring(5, 10);;
            j++;
        }

    }



}




var td = document.getElementsByTagName('td');
for (let i = 0; i < td.length; i++) {
    td[i].className += " y" + sdatev.substring(2, 4) + "w" + getWeek(sdatev);
}

console.log(td[1].className);
console.log(td[1].className.substring(11, 13)); // year
console.log(td[1].className.substring(14, 16)); // week
console.log(td[1].className.substring(6, 9)); // day
console.log(td[1].className.substring(1, 3)); // time



// Dilog script
var dil = document.getElementById("myModal");
function Reserve() {
    dil.style.display = "block";
}
var closesp = document.getElementById("close");
closesp.onclick = function () {

    dil.style.display = "none";

    document.getElementById('dildate').value = '';
    document.getElementById('desc').value = '';

    document.getElementById('wardiv').style.display = 'none';
    document.getElementById('waitdiv').style.display = 'none';

}
// End Dilog script





var refb = document.getElementById("cf");
sdate.onchange = function () {
    refb.style.display = "inline";
}

refb.onclick = async function () {
    refb.style.display = "none";
    document.getElementById('loader').style = "display:flex;"
    var sdatevh = document.getElementById('sdate').value;
    changeTable(sdatevh);

    await checkData();
    document.getElementById('loader').style = "display:none;"

}

async function checkData() {

    var td = document.getElementsByTagName('td');

    for (let i = 0; i < td.length; i++) {
        if (td[i].className.substring(0, 4) != "Timd") {

            while (td[i].childElementCount > 0) {
                td[i].removeChild(td[i].firstChild);
            }

        }
    }

    await database.ref('AA Number of reserves').once('value').then(function (snapshot) {
        n = (snapshot.val() && snapshot.val().reservesNumber) || 0;
    });

    for (let i = 1; i <= n; i++) {

        database.ref('reserve' + i).on('value', function (snapshot) {
            var week = (snapshot.val() && snapshot.val().week) || "Unknown";
            var day = (snapshot.val() && snapshot.val().day) || "Unknown";
            var time = (snapshot.val() && snapshot.val().time) || "Unknown";
            var year = (snapshot.val() && snapshot.val().year) || "Unknown";
            var desc = (snapshot.val() && snapshot.val().desc) || "Unknown";


            for (let i = 0; i < td.length; i++) {

                if (td[i].className.substring(14, 16) == week &&
                    td[i].className.substring(11, 13) == year &&
                    td[i].className.substring(6, 9) == day &&
                    td[i].className.substring(1, 3) == time) {

                    var di = document.createElement('div');
                    var disp = document.createElement('span');
                    disp.innerHTML = desc;
                    di.appendChild(disp);
                    td[i].appendChild(di);

                }
            }

        });

    }
}



function changeTable(cdate) {
    console.log(cdate);

    var th = document.getElementsByTagName('th');

    var tday = getTheDayName(cdate);
    for (let i = 0; i < th.length - 1; i++) {

        th[i].innerHTML = th[i].innerHTML.replace(th[i].innerHTML.substring(th[i].innerHTML.lastIndexOf('<'), th[i].innerHTML.length), '');
        th[i].style = '';

        var td = document.getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            if (td[j].classList.contains(th[i].innerHTML.substring(0, 3).toLowerCase())) {
                td[j].style = "";
            }
        }
    }

    for (let i = 0; i < th.length; i++) {

        if (th[i].innerHTML.substring(0, 3).toLowerCase() == tday) {
            th[i].innerHTML += "<br> " + cdate.substring(5, 10);

            th[i].style = "background-color :rgba(0,0,0,0.2); transition:1s;"

            var td = document.getElementsByTagName('td');
            for (let j = 0; j < td.length; j++) {
                if (td[j].classList.contains(th[i].innerHTML.substring(0, 3).toLowerCase())) {
                    td[j].style = "background-color :rgba(0,0,0,0.03); transition:1s;"
                }
            }

            var j = 1;
            while (j <= 7) {
                if (th[i + j - 1].innerHTML.substring(0, 3).toLowerCase() == "sun") {
                    break;
                }
                th[i + j].innerHTML += "<br> " + incDay(cdate, -j).substring(5, 10);
                j++;
            }
            j = 1;
            while (j <= 7) {
                if (th[i - j + 1].innerHTML.substring(0, 3).toLowerCase() == "sat") {
                    break;
                }
                th[i - j].innerHTML += "<br> " + incDay(cdate, j).substring(5, 10);
                j++;
            }

        }



    }

    var td = document.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].className = td[i].className.replace("y" + td[i].className.substring(11, 13), "y" + cdate.substring(2, 4));
        td[i].className = td[i].className.replace("w" + td[i].className.substring(14, 16), "w" + getWeek(cdate));
    }



}


function incDay(date, n) {
    var fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));
    fudate = fudate.getFullYear() + '-' + (fudate.getMonth() + 1) + '-' + fudate.toDateString().substring(8, 10);
    return fudate;
}

function getWeek(year, month, day) {
    function serial(days) { return 86400000 * days; }
    function dateserial(year, month, day) { return (new Date(year, month - 1, day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay() + 2; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year, month, day),
        date2 = dateserial(yearserial(date - serial(weekday(date - serial(1))) + serial(4)), 1, 3);
    return ~~((date - date2 + serial(weekday(date2) + 5)) / serial(7));
}

function getTheDayName(date) {
    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var x = new Date(date).getDay();
    var day = days[x];
    return day;
}

// dilog gat inputs 

var confb = document.getElementById('confb');

confb.onclick = async function () {

    var dildatev = document.getElementById('dildate').value;
    var desc = document.getElementById('desc').value;

    var notRes = true;
    var wardiv = document.getElementById('wardiv');
    var waitdiv = document.getElementById('waitdiv');


    if (dildatev && desc) {

        confb.style.display = 'none';
        waitdiv.style.display = 'block';

        console.log(dildatev);
        console.log(dildatev.toString().substring(0, 10));

        var week = getWeek(dildatev);
        var day = getTheDayName(dildatev);
        var time = dildatev.substring(11, 13);
        var year = dildatev.substring(2, 4);

        // check if already reserved 

        await database.ref('AA Number of reserves').once('value').then(function (snapshot) {
            n = (snapshot.val() && snapshot.val().reservesNumber) || 0;
        });

        for (let i = 1; i <= n; i++) {

            await database.ref('reserve' + i).on('value', function (snapshot) {
                var weekd = (snapshot.val() && snapshot.val().week) || "Unknown";
                var dayd = (snapshot.val() && snapshot.val().day) || "Unknown";
                var timed = (snapshot.val() && snapshot.val().time) || "Unknown";
                var yeard = (snapshot.val() && snapshot.val().year) || "Unknown";




                if (week == weekd &&
                    year == yeard &&
                    day == dayd &&
                    time == timed) {



                    notRes = false;

                    wardiv.style.display = 'block';
                    waitdiv.style.display = 'none';

                    confb.style.display = 'inline-block';

                }


            });

        }

        // end checking 

        var td = document.getElementsByTagName('td');
        console.log(notRes);
        if (notRes) {

            for (let i = 0; i < td.length; i++) {

                if (td[i].className.substring(1, 3) == time && td[i].className.substring(6, 9) == day) {
                    console.log(td[i].className);

                    n++;

                    database.ref('AA Number of reserves').set({ reservesNumber: n });

                    database.ref('reserve' + n).set({
                        year: year,
                        week: week,
                        day: day,
                        time: time,
                        desc: desc
                    });



                }
            }
            dil.style.display = "none";

            document.getElementById('dildate').value = '';
            document.getElementById('desc').value = '';

            wardiv.style.display = 'none';
            waitdiv.style.display = 'none';

            confb.style.display = 'inline-block';


            location.reload();


        }

    }


}





