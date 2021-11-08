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

console.log(Object.values(questions[4].answers)[0]);
