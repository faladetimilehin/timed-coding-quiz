
var finalScore = document.querySelector('#final-score');
var nameInput = document.querySelector('#initials');
var scoreButton = document.querySelector('#submit');
var formFeedback = document.querySelector('#msg');
var feedbackButton = document.querySelector('#feedback');
var highScoresList = document.querySelector('#highscores');
var clearHighScores = document.querySelector('#clear');
var allScores = [];




function displayMessage(type, message) {
  formFeedback.textContent = message;
  formFeedback.setAttribute("class", type);
}

scoreButton.addEventListener('click', function (event) {
  event.preventDefault();

  // Calculate the user's score based on their performance
  var userScore = calculateUserScore();

  var user = {
    score: userScore, // Store the calculated score
    name: nameInput.value.trim(),
  }

  if (user.name === "") {
    displayMessage("error", "Name cannot be blank");
  } else {
    displayMessage("success", "Saved successfully");
  }

  allScores.push(user);
  localStorage.setItem("allScores", JSON.stringify(allScores));

  displayScore(); // Call the displayScore function
});

// Calculate user's score based on their performance
function calculateUserScore() {
  // ... (calculate the score based on user's answers)
  return userScore;
}


function displayScore() {
  // Clear existing scores
  highScoresList.innerHTML = "";

  var storedScores = JSON.parse(localStorage.getItem("allScores")) || [];

  for (var i = 0; i < storedScores.length; i++) {
    var score = storedScores[i];

    var li = document.createElement('li');
    li.textContent = score.name + '_' + score.score;

    highScoresList.appendChild(li);
  }
}

clearHighScores.addEventListener('click', function (event) {
  localStorage.removeItem("allScores");
  displayScore(); // Clear the displayed scores on the page
});


