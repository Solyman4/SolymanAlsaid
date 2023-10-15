

function change() {

    var input1 = document.getElementById("input1").value;

    var word = document.getElementById("wordInput").value;
    var changeword = document.getElementById("changeInput").value;

    var checkBox = document.getElementById("check");

    console.log(word.toUpperCase());


    word = word.trim();
    changeword = changeword.trim();

    var input1L = input1.split("\n");

    for (var i = 0; i < input1L.length; i++) {

        input1L[i] = " " + input1L[i] + " ";
    }

    input1 = input1L.join("\n");



    var input1A = input1.split(" ");
    var count = 0;

    if (checkBox.checked == true) {
        for (var i = 0; i < input1A.length; i++) {

            if (input1A[i] == word) {
                input1A[i] = changeword;
                count++;
            }

        }
    } else {
        for (var i = 0; i < input1A.length; i++) {

            if (input1A[i].toUpperCase() == word.toUpperCase()) {
                input1A[i] = changeword;
                count++;
            }

        }
    }


    if (word != "")
        document.getElementById("counter").innerHTML = "The word occurs : " + count + " Times";

    document.getElementById("input2").value = input1A.join(" ");



}

