var startButton = document.querySelector(".btn");
var startContainer = document.querySelector(".start-container");
var main = document.querySelector(".main-container");
var questionID = document.querySelector(".question-id");
var questionText = document.querySelector(".question-text");
var questionHeader = document.querySelector(".question-header");
var timerEl = document.querySelector(".timer");
var ul = document.querySelector("ul");

startButton.addEventListener("click", start);

function start() {
  startContainer.setAttribute("style", "display:none;");
  main.classList.remove("hidden");
  questionID.textContent = questions[count].id;
  questionText.textContent = questions[count].question;
  for (var i = 0; i < 4; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += Object.keys(questions[count].answers[i]);
  }
  countdown();
}

function countdown() {
  var timeLeft = 30;

  // the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    //
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft === 0) {
      // Calls function to show message
      clearInterval(timeInterval);
      timerEl.innerHTML = "-";
    }
  }, 1000);
}

const questions = [
  {
    id: 1,
    question: "Commonly used data types DO NOT include:",
    answers: [
      { strings: false },
      { booleans: false },
      { alerts: true },
      { numbers: false },
    ],
  },
  {
    id: 2,
    question:
      "The condition in an if/ else statement is enclosed within ____.:",
    answers: [
      { quotes: false },
      { "curly brackets": false },
      { parantheses: true },
      { "square brackets": false },
    ],
  },
  {
    id: 3,
    question: "Arrays in JavaScript can be used to store:",
    answers: [
      { "numbers and strings": false },
      { "other arrays": false },
      { booleans: true },
      { "all of the above": false },
    ],
  },
  {
    id: 4,
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      { commas: false },
      { "curly brackets": false },
      { quotes: true },
      { parantheses: false },
    ],
  },
  {
    id: 5,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { JavaScript: false },
      { "terminal /bash": false },
      { "for loops": true },
      { "console.log": false },
    ],
  },
];

var count = 0;

const runQuestions = () => {
  console.log("count", count);
  console.log("length", questions.length);
  if (count >= questions.length - 1) {
    questionID.textContent = "";
    questionText.textContent = "";
    questionHeader.textContent = "";
    ul.textContent = "";
  } else {
    handleQuestion();
    var listItems = document.querySelectorAll("li");
    handleScores();
    console.log("scores", scores);
  }
};

var scores = 0;

const handleScores = () => {
  if (questions[count].answers[questionText]) {
    scores += 5;
  }
};

const handleQuestion = () => {
  count += 1;
  console.log(count);
  ul.textContent = "";
  questionID.textContent = questions[count].id;
  questionText.textContent = questions[count].question;

  for (var i = 0; i < 4; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += Object.keys(questions[count].answers[i]);
  }
};

ul.addEventListener("click", runQuestions);
listItems.addEventListener("click", handleScores);
