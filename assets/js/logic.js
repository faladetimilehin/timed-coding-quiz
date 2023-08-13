
//Writing pseudocode
// 1) Click a button that start quiz 
// Allow the time to continue to run till 0 
// Display the questions list onclick chnage to next questions list
// When the time has run out display a field to enter the user name and scores then save
// use an array to display the questions list
// Research objects 
var startButton = document.getElementById('start');
var startScreen = document.getElementById('start-screen');
var timerElement = document.getElementById('time');

var questionElement = document.getElementById('questions');
var endScreen = document.getElementById('end-screen');
var questionDiv = document.getElementById('question-title')

var scores = 0;
var highScores = 0;
var timer;
var timerCount;
var currentQuestionIndex = 0

function startGame() {
  console.log('Starting game');
  console.log(questionElement)
  startScreen.style.display = 'none';
  questionElement.style.display = "block";

  console.log()

  questionDiv.innerText = questions[currentQuestionIndex].question

  for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
    var currentChoice = questions[currentQuestionIndex].options[i]

  }

  timerCount = 10
  // Prevents start button from being clicked when round is in progress
  // startButton.disabled = true;
  startTimer();
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame);


function startTimer() {
  //Sets Timer to start
  timer = setInterval(function () {
    timerCount--;
    timerElement.innerHTML = timerCount

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval

      clearInterval(timer);
      //display the score and let the user enter the name 
      questionElement.style.display = 'none';
      endScreen.style.display = "block";
    }
  }, 1000);
}



