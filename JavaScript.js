var nameEl = document.querySelector(".names")
var scoreEl = document.querySelector(".scores")
var homePage = "index.html";
var highScores = "highscores.html";
var questionPage = "questions.html"
var names = localStorage.getItem("UserName")
var Score = localStorage.getItem("Score")
let startingSeconds = 120;
let secondsElapsed = 0;
var userName;


let countdownEl = document.querySelector(".timer");


function convertSeconds(s) {
    var min = Math.floor(s / 60);
    var sec = s % 60;
    if (min < 10) {
        min = "0" + min;
    } else {
        min = min
    }
    if (sec < 10) {
        sec = "0" + sec;
    } else {
        sec = sec;
    }
    if (min == 0 && sec < 10) {
        $(".timer").css({
            color: "red"
        })
    }
    return min + ':' + sec;
}


function timer() {
    var interval = setInterval(counter, 1000);

    function counter() {

        secondsElapsed++;
        countdownEl.innerHTML = (convertSeconds(startingSeconds - secondsElapsed));
        if (startingSeconds == secondsElapsed) {
            clearInterval(interval)
        }

        if (secondsElapsed == startingSeconds) {
            clearInterval(interval)
            alert("Time is Up!");
            test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>"
            _("test_status").innerHTML = "Test Completed";


            if (correct > 0) {
                setTimeout(function () {
                    var value = confirm("Do you want to enter your score?");
                    var finalScore = score;
                    localStorage.setItem("finalScore", finalScore)
                    correct = 0;
                    if (value == true) {
                        window.location.href = highScores;
                        return false;
                    } else if (value == false) {
                        window.location.href = homePage;
                        return;
                    }
                }, 3000);
            } else {
                setTimeout(function () {
                    window.location.href = homePage;
                }, 3000);
            }
        }
    }
}

var pos = 0,
    score = 0,
    test,
    test_status,
    question,
    choice,
    choices,
    chA,
    chB,
    chC,
    chD,
    correct = 0;

var questions = [
    ["Which method would be best to use to automatically adjust the size of the content on a webpage?",
        "col-lg-12 col-md-10 col-sm-8",
        "width: auto / height: auto",
        "container-fluid /container",
        "margin: auto auto / padding: auto auto",
        "A"
    ],
    ["Which command below would be best for displaying follow along procedures in the browser?",
        "console.map();",
        "alert();",
        "console.log();",
        "prompt();",
        "C"
    ],
    ["What can breakpoints be used for in the web browsers sources tab?",
        "To view and only modify HTML and CSS code.",
        "To view and delete web browser's local storage.",
        "To run a step by step diagnosis of JavaScript code.",
        "To run a step by step diagnosis of JavaScript code and permananetly fix it in the web browser.",
        "C"
    ],
    ["You can nest jQuery scripts inside of JavaScript loops only when_______.",
        "JavaScript is the parent syntax.",
        "jQuery is the parent syntax.",
        "jQuery is called as a global variable",
        "None of the above",
        "D"
    ],
    ["If 'this.' is used within a nested function what will be the value of 'this.'?",
        "The nested function value.",
        "The parent function value.",
        "The nested window value",
        "The parent window value",
        "D"
    ],
    ["If I wanted to use the variable fun within my functions, what would be the best way to acheive it?",
        "var fun",
        "fun",
        "this.fun",
        "document.queryselector('fun')",
        "A"
    ],
];

function _(x) {
    return document.getElementById(x);
};



function renderQuestion() {

    var test = _("test");
    var test_status = _("test_status")

    if (pos >= questions.length && secondsElapsed != startingSeconds) {
        test.innerHTML = `<h2 class='col-lg-12'>You got ${correct} of ${questions.length} questions correct</h2>`
        test_status.innerHTML = "Test Completed";


        if (correct > 0) {
            setTimeout(function () {
                var value = confirm("Do you want to enter your score?");
                var finalScore = score;
                localStorage.setItem("finalScore", finalScore)
                correct = 0;
                if (value == true) {
                    window.location.href = highScores;
                    return false;
                } else if (value == false) {
                    window.location.href = homePage;
                    return;
                }
            }, 3000);
        } else {
            setTimeout(function () {
                window.location.href = homePage;
            }, 3000);
        }
    }

    if (pos < questions.length) {
    _("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    chD = questions[pos][4];
    test.innerHTML = "<h2>" + question + "</h2>";
    test.innerHTML += "<input class='questions' type='radio' name='choices' value='A'>" + chA + "<br>";
    test.innerHTML += "<input class='questions' type='radio' name='choices' value='B'>" + chB + "<br>";
    test.innerHTML += "<input class='questions' type='radio' name='choices' value='C'>" + chC + "<br>";
    test.innerHTML += "<input class='questions' type='radio' name='choices' value='D'>" + chD + "<br><br>";
    test.innerHTML += "<button class='submitBtn' onclick='checkAnswer()'>Submit Answer</button>";
    }
}

function checkAnswer() {
    choices = document.getElementsByName("choices");
    var scoreEl = document.querySelector(".score")
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    if (choice == questions[pos][5]) {
        correct++;
        score = score + 10;
        scoreEl.textContent = score;
    } else {
        startingSeconds -= 30;
    }
    pos++;
    renderQuestion();
}

window.addEventListener("load", timer, false);
window.addEventListener("load", renderQuestion, false);