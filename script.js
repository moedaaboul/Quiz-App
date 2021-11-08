var timerEl = document.querySelector(".timer");

function countdown() {
  var timeLeft = 30;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    //
    // YOUR CODE HERE
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft === 0) {
      // Calls function to show message
      clearInterval(timeInterval);
      timerEl.innerHTML = "-";
    }
  }, 1000);
}

countdown();

const questions = [
  {
    id: 0,
    question: "Commonly used data types DO NOT include:",
    answers: [
      { strings: false },
      { booleans: false },
      { alerts: true },
      { numbers: false },
    ],
  },
  {
    id: 1,
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
    id: 2,
    question: "Arrays in JavaScript can be used to store:",
    answers: [
      { "numbers and strings": false },
      { "other arrays": false },
      { booleans: true },
      { "all of the above": false },
    ],
  },
  {
    id: 3,
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
    id: 4,
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
