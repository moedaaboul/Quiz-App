// Define variables using querySelector
const startButton = document.querySelector(".btn");
const startContainer = document.querySelector(".start-container");
const main = document.querySelector(".main-container");
const questionID = document.querySelector(".question-id");
const questionText = document.querySelector(".question-text");
const timerEl = document.querySelector(".timer");
const ul = document.querySelector("ul");
const score = document.querySelector(".score");
const end = document.querySelector(".end-container");
const highscores = document.querySelector(".high-scores");
const tableSection = document.querySelector(".table-body");
const submitButton = document.querySelector("#submit");
const finalScores = document.querySelector(".scores-container");
const submitContainer = document.querySelector(".submit-container");
const reload = document.querySelector("#go-back");
const clearHistory = document.querySelector("#reset");
const subHeader = document.querySelector(".sub-header");
const timeContainer = document.querySelector(".time-container");
const highscoreLink = document.querySelector(".highscore-link");
const answerFeedback = document.querySelector(".answer-status");
const scoreLine = document.querySelector(".score-line");
const progressBar = document.querySelector(".progress-bar");

// Add event listener to start button on initial page
startButton.addEventListener("click", start);

// Stores how many clicks were made on the "view high scores page"
let scoreClicks = 0;

// Stored variable to ensure that no duplicate scores are recorded upon the list answer elements click
let listClicks = 0;

// variable sets timeLeft when the clock starts
let timeLeft = 60;

// global timeInterval variable stored to allow clearing outside of countdown function
let timeInterval = 0;

//  count variable to locate the current order of questions
let count = 0;

// scores variable initialed as zero
let scores = 0;

// variable to whether latest answer is correct or false
let feedback = "";

// contestant variable to store current contestant
let contestant = "";

// scoreArray to store all historical scores saved under local storage
let scoreArray = [];

// Adds event listener to the highscore link to view score history
highscoreLink.addEventListener("click", viewScores);

// Enables viewScores function upon the highscorelink click
function viewScores() {
  if (scoreClicks === 0) {
    startContainer.setAttribute("style", "display:none;");
    main.classList.add("hidden");
    end.classList.remove("hidden");
    scoreLine.classList.add("hidden");
    generateHighScores();
    scoreClicks++;
    clearInterval(timeInterval);
    timerEl.innerHTML = "-";
  }
}

// Enables start() function upon the start button click to show main question screens
function start() {
  startContainer.setAttribute("style", "display:none;");
  subHeader.classList.remove("hidden");
  timeContainer.classList.remove("hidden");
  main.classList.remove("hidden");
  generateQuestion();
  countdown();
}

// Enables generateQuestion() function to populate new Question and Answer choices based on count variable
function generateQuestion() {
  questionID.textContent = questions[count].id;
  questionText.textContent = questions[count].question;
  progressBar.style.width = completion;
  answersLength = Object.keys(questions[count].answers).length;
  answerFeedback.textContent = feedback;
  listClicks = 0;
  for (var i = 0; i < answersLength; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += Object.keys(questions[count].answers)[i];
    li.addEventListener("click", handleClick);
    li.addEventListener("click", runQuestions);
  }
}

// function to handleClick upon answer click by updating score, feedback and answer
function handleClick(event) {
  if (listClicks === 0) {
    var element = event.target;
    var content = element.textContent;
    listClicks++;
    if (questions[count].answers[content]) {
      scores += 10;
      feedback = "Correct answer!";
    } else {
      timeLeft -= 10;
      feedback = "Wrong answer!";
    }
  }
}

// countdown function using setInterval() method to commence the 1 second countdown from timeLeft var
function countdown() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      timerEl.innerHTML = "-";
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// global questions variable that stores all questions, answers, and whether the answer is truthy in an object format
const questions = [
  {
    id: 1,
    question: "Commonly used data types DO NOT include:",
    answers: { strings: false, booleans: false, alerts: true, numbers: false },
  },
  {
    id: 2,
    question:
      "The condition in an if/ else statement is enclosed within ____.:",
    answers: {
      quotes: false,
      "curly brackets": false,
      parantheses: true,
      "square brackets": false,
    },
  },
  {
    id: 3,
    question: "Arrays in JavaScript can be used to store:",
    answers: {
      "numbers and strings": false,
      "other arrays": false,
      booleans: false,
      "all of the above": true,
    },
  },
  {
    id: 4,
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: {
      commas: false,
      "curly brackets": false,
      quotes: true,
      parantheses: false,
    },
  },
  {
    id: 5,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      JavaScript: false,
      "terminal /bash": false,
      "for loops": false,
      "console.log": true,
    },
  },
];

// runQuestions function to trigger a stop effect by reseting time if number of questions is exceeded
const runQuestions = () => {
  if (count >= questions.length - 1) {
    timeLeft = 0;
  } else {
    nextQuestion();
  }
};

// gameOverfunction to hide main screen and unhide end container that shows sumbit page
const gameOver = () => {
  main.classList.add("hidden");
  end.classList.remove("hidden");
  submitContainer.classList.remove("hidden");
  score.textContent = scores;
};

// completion variable to reflect progress in the progress bar
let completion = 1 / questions.length;

// next question function is a question counter by adding one to the count va
const nextQuestion = () => {
  count += 1;
  completion = ((count + 1) / questions.length) * 100 + "%";
  ul.textContent = "";
  generateQuestion();
  console.log(completion);
};

// submitFunction function to the submit form button listener to get and store new scores
const submitFunction = function (event) {
  event.preventDefault();

  let contestant = document.querySelector("#user").value;

  let storedObject = JSON.parse(localStorage.getItem("scoreList"));

  if (storedObject !== null) {
    scoreArray = storedObject;
  }

  let scoreList = {
    firstName: contestant,
    score: scores,
  };

  scoreArray.push(scoreList);
  localStorage.setItem("scoreList", JSON.stringify(scoreArray));
  generateHighScores();
};

submitButton.addEventListener("click", submitFunction);

// Generates high scores from local storage
const generateHighScores = () => {
  let storedObject = JSON.parse(localStorage.getItem("scoreList")) || [];

  console.log(storedObject);

  // storedObject.forEach(function (value, index) {});

  let byScore = storedObject.sort((a, b) => {
    return b.score - a.score;
  });

  byScore.forEach(function (object, index) {
    let tr = document.createElement("tr");
    let rank = document.createElement("th");
    let name = document.createElement("td");
    let userScore = document.createElement("td");
    rank.setAttribute("scope", "row");
    rank.innerHTML = index + 1;
    name.innerHTML = object.firstName;
    userScore.innerHTML = object.score;
    tr.appendChild(rank);
    tr.appendChild(name);
    tr.appendChild(userScore);
    tableSection.appendChild(tr);
  });
  submitContainer.classList.add("hidden");
  finalScores.classList.remove("hidden");
  scoreClicks++;
};

// reload functionality enabled upon the "go-back" click
reload.addEventListener("click", function () {
  location.reload();
});

// clear history functionality enabled upon the "clear-history" click
clearHistory.addEventListener("click", function () {
  window.localStorage.removeItem("scoreList");
  highscores.classList.add("hidden");
});
