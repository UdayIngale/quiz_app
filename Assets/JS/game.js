const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: 
      "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question:
      "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question:
      "The statement a===b refers to _________",
    choice1: "Both a and b are equal in value, type and reference address",
    choice2: "Both a and b are equal in value",
    choice3: "Both a and b are equal in value and type",
    choice4: "There is no such statement",
    answer: 3
  },
  {
    question:
      "The snippet that has to be used to check if “a” is not equal to “null” is _________",
    choice1: "if(a!=null)",
    choice2: "if (!a)",
    choice3: "if(a!null)",
    choice4: "if(a!==null)",
    answer: 1
  },
  {
    question:
      "JavaScript is a _______________ language.",
    choice1: "Object-Oriented",
    choice2: "High-level",
    choice3: "Assembly-language",
    choice4: "Object-based",
    answer: 4
  },
  {
    question:
      "The script must be placed in ______",
    choice1: "Head",
    choice2: "Head and Body",
    choice3: "Title and Head",
    choice4: "all above",
    answer: 2
  },
  {
    question:
      "Which of the following function of String object extracts a section of a string and returns a new string?",
    choice1: "Slice()",
    choice2: "Split()",
    choice3: "Replace()",
    choice4: "Search()",
    answer: 1
  },
  {
    question:
      "How can you add a comment in a JavaScript?",
    choice1: "<!--This is a comment-->",
    choice2: "// This is a comment",
    choice3: "--This is a comment-- ",
    choice4: "`This is a comment`",
    answer: 2
  },
  {
    question:
      " What is the JavaScript syntax for printing values in HTML?",
    choice1: "console.print(5); ",
    choice2: "console.log(5); ",
    choice3: "document.print(5)",
    choice4: "document.write(5)",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
