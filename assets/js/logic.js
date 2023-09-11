//variables and eventlistener to start quiz and timer
var timeEl = document.querySelector("#timer");
var timeLeft = 75;
var timerInterval = 0;
var coverPage = document.querySelector("#cover-page");
var quiz = document.querySelector(".quiz");

var startQuiz = document.querySelector(".start-quiz");
startQuiz.addEventListener("click", setTime);
function setTime() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  }, 1000);

  coverPage.innerHTML = "";

  quiz.setAttribute("style", "display:block");
  switchContent();
};

//variables for quiz portion of website 
var questionsEl = document.querySelector(".ask");
var option1 = document.querySelector(".choice1");
var option2 = document.querySelector(".choice2");
var option3 = document.querySelector(".choice3");
var option4 = document.querySelector(".choice4");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");

//event listener to show additional questions in the quiz
var questionIndex = 0;
var boxEl = document.querySelector(".quiz");
boxEl.addEventListener("click", switchContent);
function switchContent() {
  questionsEl.textContent = quizKey[questionIndex].question;
  option1.textContent = quizKey[questionIndex].choice1;
  option2.textContent = quizKey[questionIndex].choice2;
  option3.textContent = quizKey[questionIndex].choice3;
  option4.textContent = quizKey[questionIndex].choice4;
};

//assess user input for if the answer is correct or wrong and log scores based on getting to the last question or timing out (time >= 0)
option1.addEventListener("click", select1);
function select1() {
  wrong.setAttribute("style", "display:block");
  correct.setAttribute("style", "display:none");
  if (timeLeft >= 10) {
    timeLeft -= 10;
  } else {
    clearInterval(timerInterval);
    logScore();
  }
  questionIndex++;
  if (questionIndex >= quizKey.length) {
    clearInterval(timerInterval);
    logScore();
  }
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    logScore();
  }
};

//repeated code for above for if choice 2 is the right or wrong answer and how the website should respond
option2.addEventListener("click", select2);
function select2() {
  wrong.setAttribute("style", "display:block");
  correct.setAttribute("style", "display:none");
  if (timeLeft >= 10) {
    timeLeft -= 10;
  } else {
    clearInterval(timerInterval);
    logScore();
  }
  questionIndex++;
  if (questionIndex >= quizKey.length) {
    clearInterval(timerInterval);
    logScore();
  }
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    logScore();
  }
};

//repeated code for above for if choice 3 is the right or wrong answer and how the website should respond
option3.addEventListener("click", select3);
function select3() {
  if (option3.textContent === "3. alerts" || option3.textContent === "3. parenthesis" || option3.textContent === "3. quotes") {
    correct.setAttribute("style", "display:block");
    wrong.setAttribute("style", "display:none");
    questionIndex++;
    if (questionIndex >= quizKey.length) {
      clearInterval(timerInterval);
      logScore();
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  } else {
    wrong.setAttribute("style", "display:block");
    correct.setAttribute("style", "display:none");
    if (timeLeft >= 10) {
      timeLeft -= 10;
    } else {
      clearInterval(timerInterval);
      logScore();
    }
    questionIndex++;
    if (questionIndex >= quizKey.length) {
      clearInterval(timerInterval);
      logScore();
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  }
};

//repeated code for above for if choice 2 is the right or wrong answer and how the website should respond
option4.addEventListener("click", select4);
function select4() {
  if (option4.textContent === "4. all of the above" || option4.textContent === "4. console log") {
    correct.setAttribute("style", "display:block");
    wrong.setAttribute("style", "display:none");
    questionIndex++;
    if (questionIndex >= quizKey.length) {
      clearInterval(timerInterval);
      logScore();
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  } else {
    wrong.setAttribute("style", "display:block");
    correct.setAttribute("style", "display:none");
    if (timeLeft >= 10) {
      timeLeft -= 10;
    } else {
      clearInterval(timerInterval);
      logScore();
    }
    questionIndex++;
    if (questionIndex >= quizKey.length) {
      clearInterval(timerInterval);
      logScore();
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  }
};

//log time finished on page
var finalScore = document.querySelector(".finalscore");
var highScore = document.querySelector(".high-score");
function logScore() {
  quiz.setAttribute("style", "display:none");
  timeEl.textContent = "Time: " + timeLeft;
  finalScore.textContent = "Your final score is " + timeLeft + ".";
  highScore.setAttribute("style", "display:block");
};

//hide correct or wrong display on mouseover 
var choices = document.querySelector("#choices");
var initialInput = document.querySelector("input");
choices.addEventListener("mouseover", hideFeedback);
initialInput.addEventListener("click", hideFeedback);
function hideFeedback() {
  correct.setAttribute("style", "display:none");
  wrong.setAttribute("style", "display:none");
};

//put score into local storage
var scoreArray = [];
function setScore() {
  localStorage.setItem("local-scoreArray", JSON.stringify(scoreArray));
}

//variables and event listener to call the function to push scores into local storage and display them on the website once they submit their initials 
var submit = document.querySelector(".submit");
var viewScores = document.querySelector("a");
var scoreBankEl = document.querySelector("#score-bank");
submit.addEventListener("click", highScoreLog);
function highScoreLog() {
  highScore.setAttribute("style", "display:none");
  timeEl.setAttribute("style", "display:none");
  viewScores.setAttribute("style", "display:none");
  correct.setAttribute("style", "display:none");
  wrong.setAttribute("style", "display:none");
  scoreBankEl.setAttribute("style", "display:block");

  var userScores = {
    name: initialInput.value,
    timeFinished: timeLeft
  };

  scoreArray.push(userScores);

  setScore();
  renderScores();
};

//get scores out of local storage 
function getScores() {
  var storedScores = JSON.parse(localStorage.getItem("local-scoreArray"));

  if (storedScores !== null) {
    scoreArray = storedScores;
  } else {
    return;
  }
}

//display scores on webpage 
var scoreDataEl = document.querySelector("#scoredata");
function renderScores() {
  for (var i = 0; i < scoreArray.length; i++) {
    var score = scoreArray[i];

    var li = document.createElement("li");
    li.textContent = score.name + " - " + score.timeFinished;

    scoreDataEl.appendChild(li);
  }
}

getScores();

//when you click go back it reloads the webpage 
var goBack = document.querySelector(".back");
goBack.addEventListener("click", function () {
  location.reload()
});

//when you click clear scores it clears scores from display and local storage
var clearScores = document.querySelector(".clear");
clearScores.addEventListener("click", function () {
  scoreDataEl.innerHTML = "";
  localStorage.clear();
});

//when you click view scores you are taken to the highscores page 
viewScores.addEventListener("click", function () {
  highScore.setAttribute("style", "display:none");
  timeEl.setAttribute("style", "display:none");
  coverPage.setAttribute("style", "display:none");
  quiz.setAttribute("style", "display:none");
  correct.setAttribute("style", "display:none");
  wrong.setAttribute("style", "display:none");
  viewScores.setAttribute("style", "display:none");
  scoreBankEl.setAttribute("style", "display:block");
  getScores();
  renderScores();
});