// DOM elements

var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var startBtn = document.querySelector("#startbtn");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");


var realTimeQuestion = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hide Homepage quiz
  var homePageEl = document.getElementById("homepage");
  homePageEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start the timer and let it run every 1s
  timerId = setInterval(clockTick, 1000);

  // Real time
  timerEl.textContent = time;

  bringQuestion();
}

function bringQuestion() {
  // get current question object from array
  var realQuestion = questions[realTimeQuestion];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = realQuestion.title;

  // Reset the questions automatically
  choicesEl.innerHTML = "";

  // choices start
  realQuestion.choices.forEach(function(choice, i) {
    // Based on couple of test, button has to be created for the choices
    var choicePresent = document.createElement("button");
    choicePresent.setAttribute("class", "choice");
    choicePresent.setAttribute("value", choice);

    choicePresent.textContent = i + 1 + ". " + choice;

    // add event listener for the choices on click
    choicePresent.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choicePresent);
  });
}