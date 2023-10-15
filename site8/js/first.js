
var database = firebase.database();


// dilog
var dil = document.getElementById("myModal");
var qui = document.getElementById("qui");
qui.onclick = function () {
    dil.style.display = "block";
}
var closesp = document.getElementById("close");
closesp.onclick = function () {
    dil.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == dil) {
        dil.style.display = "none";
    }
}
// end dilog 


var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

var quill = new Quill('#area', {
    modules: { toolbar: toolbarOptions },
    theme: 'snow'
});


var vi = document.getElementById('vi');
var ed = document.getElementById('ed');
var mood = document.getElementById('mood');

quill.enable(false);
ed.disabled = true;

database.ref('text').once('value').then(function (snapshot) {
    var tex = (snapshot.val() && snapshot.val().Text) || " ";

    quill.setContents(tex);
    quill.enable(true);


});

//=========
checkMood = false;
database.ref('text').on('value', function (snapshot) {
    var tex = (snapshot.val() && snapshot.val().Text) || " ";

    if (checkMood) {
        quill.setContents(tex);
    }

});


vi.onclick = function () {
    vi.disabled = true;
    ed.disabled = false;

    mood.innerHTML = "View mood";

    quill.enable(false);

    checkMood = true;


}

ed.onclick = function () {
    vi.disabled = false;
    ed.disabled = true;

    mood.innerHTML = "Edit mood";

    quill.enable(true);

    checkMood = false;


}

quill.on('text-change', function (delta, oldDelta, source) {

    if (source == 'api') {

    } else if (source == 'user') {
        console.log("A user action triggered this change.");

        database.ref('text').set({
            Text: quill.getContents()
        });

    }



});








