const startButton = document.querySelector(".btn");
const startContainer = document.querySelector(".start-container");
const main = document.querySelector(".main-container");
const questionID = document.querySelector(".question-id");
const questionText = document.querySelector(".question-text");
const questionHeader = document.querySelector(".question-header");
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
const questionContainer = document.querySelector(".question-container");
const timeContainer = document.querySelector(".time-container");
const highscoreLink = document.querySelector(".highscore-link");
const answerFeedback = document.querySelector(".answer-status");
const scoreLine = document.querySelector(".score-line");

startButton.addEventListener("click", start);

let scoreClicks = 0;

highscoreLink.addEventListener("click", viewScores);

function viewScores() {
  if (scoreClicks === 0) {
    startContainer.setAttribute("style", "display:none;");
    main.classList.add("hidden");
    end.classList.remove("hidden");
    scoreLine.classList.add("hidden");
    generateHighScores();
    // highscoreLink.removeEventListener;
    scoreClicks++;
    clearInterval(timeInterval);
    timerEl.innerHTML = "-";
  }
}

function start() {
  startContainer.setAttribute("style", "display:none;");
  subHeader.classList.remove("hidden");
  timeContainer.classList.remove("hidden");
  main.classList.remove("hidden");
  generateQuestion();
  countdown();
}

let listClicks = 0;

function generateQuestion() {
  questionID.textContent = questions[count].id;
  questionText.textContent = questions[count].question;
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

let feedback = "";

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

let timeLeft = 60;

let timeInterval = 0;

function countdown() {
  // setInterval() method used to create a timer moving every 1 second
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

let count = 0;

const runQuestions = () => {
  if (count >= questions.length - 1) {
    timeLeft = 0;
  } else {
    nextQuestion();
  }
};

let contestant = "";
let scoreArray = [];

const gameOver = () => {
  main.classList.add("hidden");
  end.classList.remove("hidden");
  submitContainer.classList.remove("hidden");
  score.textContent = scores;
};

let scores = 0;

const nextQuestion = () => {
  count += 1;
  ul.textContent = "";
  generateQuestion();
};

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

const generateHighScores = () => {
  let storedObject = JSON.parse(localStorage.getItem("scoreList"));

  // if (storedObject !== null) {
  //   scoreArray = storedObject;
  // }
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

reload.addEventListener("click", function () {
  location.reload();
});

clearHistory.addEventListener("click", function () {
  window.localStorage.removeItem("scoreList");
  highscores.classList.add("hidden");
});
