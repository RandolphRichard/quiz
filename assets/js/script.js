// DOM elements

var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var startBtn = document.querySelector("#startbtn");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var reactionEl = document.querySelector("#reaction");

var realTimeQuestion = 0;
var time = questions.length * 10;
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

function questionClick() {
  // In case the answer is incorrect
  if (this.value !== questions[realTimeQuestion].answer) {
    // If the answer is wrong
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // what we need to display
    timerEl.textContent = time;
    reactionEl .textContent = "Wrong Answer!";
    reactionEl .style.color = "red";
   
  } else {
    reactionEl .textContent = "Correct Answer!";
    reactionEl .style.color = "green";
    
  }

  // wrong or correct comment
  reactionEl .setAttribute("class", "reaction");
  setTimeout(function() {
    reactionEl .setAttribute("class", "reaction hide");
  }, 1000);

  // Following question
  realTimeQuestion++;

  // Remaining time
  if (realTimeQuestion === questions.length) {
    endQuiz();
  } else {
    bringQuestion();
  }
}

function endQuiz() {
  // end the time
  clearInterval(timerId);

  // end page
  var endpageEl = document.getElementById("endpage");
  endpageEl.removeAttribute("class");

  var realScoreEl = document.getElementById("real-score");
  setTimeout(function(){
    realScoreEl.classList.add("zoom-out")
    },3000);
    
  // final score
  var realScoreEl = document.getElementById("real-score");
  realScoreEl.textContent = time;

 
  questionsEl.setAttribute("class", "hide");
}




function clockTick() {
  // refresh the  time
  time--;
  timerEl.textContent = time;

  // battle the time
  if (time <= 0) {
    endQuiz();
  }
}
function viewScore() {
  // What to do with the initials
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // localstorage
    var topScores =
      JSON.parse(window.localStorage.getItem("topscores")) || [];

    // format new score object for current user
    var updatedScore = {
      score: time,
      initials: initials
    };

    // localstorage
    topScores.push(updatedScore);
    window.localStorage.setItem("topscores", JSON.stringify(topScores));

    // open the new page
    window.location.href = "thescores.html";
  }
}

function enterKey(event) {
  if (event.key === "Enter") {
    viewScore();
  }
}

// once you send your initials
submitBtn.onclick = viewScore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = enterKey;