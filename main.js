const allSquares = document.querySelectorAll(".tic-tac-toe .square");
const btn = document.querySelector(".btn");
const line = document.querySelector("line");
const svgElement = document.querySelector("svg");

let freeIndexForOponent = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

const rightAnswers = ["012", "345", "678", "036", "147", "258", "048", "246"];

let answers = Array(9).fill("");

let answersX = "";
let answersO = "";

btn.addEventListener("click", () => {
  answersO = "";
  answersX = "";

  freeIndexForOponent = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  answers = Array(9).fill("");

  allSquares.forEach((square) => {
    square.innerText = "";
  });

  svgElement.style.position = "initial";
  line.setAttribute("x1", "0");
  line.setAttribute("y1", "0");
  line.setAttribute("x2", "0");
  line.setAttribute("y2", "0");
});

let checkTwoArrays = (arr, target) => target.every((v) => arr.includes(v));

let checkHasTwoArraysAtLeastOneElement = (arr, target) =>
  target.some((v) => arr.includes(v));

const sameElementsInArrays = (source, target) => {
  var result = source.filter((item) => {
    return target.indexOf(item) > -1;
  });

  return result;
};

const removeElementFromArray = (array, element) => {
  const removeIndex = array.indexOf(element);
  array.splice(removeIndex, 1);
};

const randomLocation = () => {
  return freeIndexForOponent[
    Math.floor(Math.random() * freeIndexForOponent.length)
  ];
};

const sumUsersAnswers = () => {
  answersX = "";
  answersO = "";
  answers.forEach((answer, index) => {
    if (answer === "X") {
      answersX += index;
    } else if (answer === "O") {
      answersO += index;
    }
  });
};

const drawLine = (result) => {
  svgElement.style.position = "absolute";
  switch (result) {
    case "012":
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "60");
      line.setAttribute("x2", "360");
      line.setAttribute("y2", "60");
      break;
    case "345":
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "180");
      line.setAttribute("x2", "360");
      line.setAttribute("y2", "180");
      break;
    case "678":
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "300");
      line.setAttribute("x2", "360");
      line.setAttribute("y2", "300");
      break;
    case "036":
      line.setAttribute("x1", "60");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "60");
      line.setAttribute("y2", "360");
      break;
    case "147":
      line.setAttribute("x1", "180");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "180");
      line.setAttribute("y2", "360");
      break;
    case "258":
      line.setAttribute("x1", "300");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "300");
      line.setAttribute("y2", "360");
      break;
    case "048":
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "360");
      line.setAttribute("y2", "360");
      break;
    case "246":
      line.setAttribute("x1", "360");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "0");
      line.setAttribute("y2", "360");
      break;

    default:
      break;
  }
};

const checkWhoWin = (answersX, answersO) => {
  rightAnswers.forEach((rightAnswer) => {
    const rightAnswerInArray = rightAnswer.split("");
    const answersXInArray = answersX.split("");
    const answersOInArray = answersO.split("");

    if (
      checkTwoArrays(answersXInArray, rightAnswerInArray) ||
      checkTwoArrays(answersOInArray, rightAnswerInArray)
    ) {
      setTimeout(() => drawLine(rightAnswer), 400);
    }
  });
};

const moveToWin = (winner) => {
  const element = rightAnswers.find((rightAnswer) => {
    let rightAnswerInArray = rightAnswer.split("");
    let answersWinner = winner.split("");

    if (
      sameElementsInArrays(rightAnswerInArray, answersWinner).length == 2 &&
      checkHasTwoArraysAtLeastOneElement(
        rightAnswerInArray,
        freeIndexForOponent
      )
    ) {
      return rightAnswer;
    }
  });
  return element;
};

const findFirstWin = (winner, looser) => {
  const element = rightAnswers.find((rightAnswer) => {
    let rightAnswerInArray = rightAnswer.split("");
    let answersWinner = winner.split("");
    let answersLooser = looser.split("");

    if (
      sameElementsInArrays(rightAnswerInArray, answersWinner) &&
      !checkHasTwoArraysAtLeastOneElement(rightAnswerInArray, answersLooser)
    ) {
      return rightAnswer;
    }
  });
  return element;
};

const stepToWin = (winner, looser) => {
  let firstMatchWin = findFirstWin(winner, looser);

  if (firstMatchWin) {
    let answersWinner = winner.split("");
    firstMatchWin = firstMatchWin.split("");

    answersWinner.forEach((answerO) =>
      removeElementFromArray(firstMatchWin, answerO)
    );

    return firstMatchWin;
  } else {
    return 0;
  }
};

const oponentMove = () => {
  let oponentAnswer;

  const blockUserWin = moveToWin(answersX);
  const moveToWinOponent = moveToWin(answersO);

  if (answersO.length == 0) {
    oponentAnswer = randomLocation();
  } else if (moveToWinOponent) {
    const winMove = sameElementsInArrays(
      freeIndexForOponent,
      moveToWinOponent.split("")
    );
    oponentAnswer = winMove[0];
  } else if (blockUserWin) {
    const blockMove = sameElementsInArrays(
      freeIndexForOponent,
      blockUserWin.split("")
    );
    oponentAnswer = blockMove[0];
  } else {
    let firstMatchWin = stepToWin(answersO, answersX);

    if (firstMatchWin) {
      oponentAnswer = firstMatchWin[0];
    } else {
      oponentAnswer = randomLocation();
    }
  }

  setTimeout(() => {
    if (oponentAnswer) allSquares[Number(oponentAnswer)].innerText = "O";
  }, 300);

  answers.fill("O", Number(oponentAnswer), Number(oponentAnswer) + 1);

  removeElementFromArray(freeIndexForOponent, oponentAnswer);
};

allSquares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (square.innerText) return;
    square.innerText = "X";
    answers.fill("X", index, index + 1);
    removeElementFromArray(freeIndexForOponent, "" + index);

    sumUsersAnswers();
    oponentMove();
    sumUsersAnswers();

    checkWhoWin(answersX, answersO);
  });
});
