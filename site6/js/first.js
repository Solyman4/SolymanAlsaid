

var database = firebase.database();
var n = 0;
database.ref('AA Number of posts').once('value').then(function (snapshot) {
    n = (snapshot.val() && snapshot.val().postsNumber) || 0;
});

readFromDataBase();

database.ref('post').on('value', function (snapshot) {
    console.log("here");
});

async function readFromDataBase() {
    // var userId = firebase.auth().currentUser.uid;
    // return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    //     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //     // ...
    // })

    if (localStorage.getItem("name") != null) {
        document.getElementById("inname").value = localStorage.getItem("name");
    }

    var n = 0;
    await database.ref('AA Number of posts').once('value').then(function (snapshot) {
        n = (snapshot.val() && snapshot.val().postsNumber) || 0;
    });


    for (let i = 1; i <= n; i++) {

        database.ref('post' + i).on('value', function (snapshot) {
            var postname = (snapshot.val() && snapshot.val().poastName) || 'Anonymous';
            var postText = (snapshot.val() && snapshot.val().postText) || 'Anonymous';

            var fie = document.createElement("fieldset");
            fie.id = "pFieldset" + i;
            var leg = document.createElement("legend");
            leg.innerHTML = postname;
            var fdiv = document.createElement("div");
            fdiv.innerHTML = postText; fdiv.lang = "ar";


            document.getElementById("posts").prepend(fie);
            document.getElementById("pFieldset" + i).appendChild(leg);
            document.getElementById("pFieldset" + i).appendChild(fdiv);


        });

        document.getElementById('loader').style = "display:none;"

    }

}


var x = 0;
async function Post() {
    var nameInput = document.getElementById("inname").value;
    var postInput = document.getElementById("textarea").value;

    // creation of the elements .

    var fie = document.createElement("fieldset");
    fie.id = "pFieldset" + n;
    var leg = document.createElement("legend");
    leg.innerHTML = nameInput;
    var fdiv = document.createElement("div");
    fdiv.innerHTML = postInput;

    if (postInput.trim() != "" && nameInput.trim() != "") {
        localStorage.setItem("name", nameInput);

        document.getElementById('loader').style = "display:flex;"

        document.getElementById("posts").prepend(fie);
        document.getElementById("pFieldset" + n).appendChild(leg);
        document.getElementById("pFieldset" + n).appendChild(fdiv);
        n++;

        document.getElementById("textarea").value = '';

        await database.ref('AA Number of posts').set({ postsNumber: n });
        writePost(nameInput, postInput);
        document.getElementById('loader').style = "display:none;"


    }




}



async function writePost(name, post) {
    console.log(n);
    database.ref('post' + n).set({
        postText: post,
        poastName: name
    });
}

