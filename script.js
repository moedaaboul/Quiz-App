var startButton = document.querySelector(".btn");
var startContainer = document.querySelector(".start-container");
var main = document.querySelector(".main-container");
var questionID = document.querySelector(".question-id");
var questionText = document.querySelector(".question-text");
var questionHeader = document.querySelector(".question-header");
var timerEl = document.querySelector(".timer");
var ul = document.querySelector("ul");
var score = document.querySelector(".score");
var end = document.querySelector(".end-container");

startButton.addEventListener("click", start);

function start() {
  startContainer.setAttribute("style", "display:none;");
  main.classList.remove("hidden");
  generateQuestion();
  countdown();
}

function generateQuestion() {
  questionID.textContent = questions[count].id;
  questionText.textContent = questions[count].question;
  for (var i = 0; i < 4; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += Object.keys(questions[count].answers)[i];
    li.addEventListener("click", listListener);
    li.addEventListener("click", runQuestions);
  }
}

function listListener(event) {
  var element = event.target;
  var content = element.textContent;
  if (questions[count].answers[content]) {
    scores += 5;
  } else {
    timeLeft -= 5;
  }
}

var timeLeft = 30;

function countdown() {
  // setInterval() method used to create a timer moving every 1 second
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timerEl.innerHTML = "-";
      gameOver();
    }
  }, 1000);
}

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
      booleans: true,
      "all of the above": false,
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
      "for loops": true,
      "console.log": false,
    },
  },
];

var count = 0;

const runQuestions = () => {
  if (count >= questions.length - 1) {
    timeLeft = 0;
  } else {
    nextQuestion();
  }
};

let contestant = "";
var scoreArray = [];

const gameOver = () => {
  var storedObject = JSON.parse(localStorage.getItem("scoreList"));

  if (storedObject !== null) {
    scoreArray = storedObject;
  }

  main.textContent = "";
  end.classList.remove("hidden");
  score.textContent = scores;
  contestant = prompt("Game over! Please enter your name");

  var scoreList = {
    firstName: contestant,
    score: scores,
  };

  scoreArray.push(scoreList);
  localStorage.setItem("scoreList", JSON.stringify(scoreArray));
  return null;
};

var scores = 0;

const nextQuestion = () => {
  count += 1;
  ul.textContent = "";
  generateQuestion();
};
