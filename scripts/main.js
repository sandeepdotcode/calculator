const expr = {
  prevOp: null,
  operator: null,
  currOp: 0,
  result: null,
};

// rounds the value of result to be returned by operations
function calcRound(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function add(a, b) {
  return calcRound(a + b);
}

function subtract(a, b) {
  return calcRound(a - b);
}

function multiply(a, b) {
  return calcRound(a * b);
}

function divide(a, b) {
  return calcRound(a / b);
}

function modulo(a, b) {
  return calcRound(a % b);
}

function square(a) {
  return calcRound(a * a);
}

function sqroot(a) {
  return calcRound(Math.sqrt(a));
}

function operate(operator, num1, num2 = 0) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    case "%":
      result = modulo(num1, num2);
      break;
    case "^":
      result = square(num1);
      break;
    case "~":
      result = sqroot(num1);
      break;
    default:
      result = "ERROR";
  }
  return result;
}

// function to display to the calculator screen
// mode 0 - display currOp to lower screen
// mode 1 - display prevOp & operator to upper screen
// mode 2 - display prevOp, operator & currOp to upper screen & result on lower screen
// mode 3 - display ERROR message
function displayScreen(mode) {
  switch (mode) {
    case 0:
      lowerScreen.innerText = expr.currOp;
      break;
    case 1:
      upperScreen.innerText = `${expr.prevOp} ${expr.operator}`;
      lowerScreen.innerText = expr.currOp;
      break;
    case 2:
      upperScreen.innerText = `${expr.prevOp} ${expr.operator} ${expr.currOp} = `;
      lowerScreen.innerText = expr.result;
      break;
    case 3:
      upperScreen.innerText = "";
      lowerScreen.innerText = "ERROR";
      break;
    default:
      break;
  }
}

function clearExprn() {
  expr.prevOp = null;
  expr.operator = null;
  expr.currOp = 0;
  expr.result = null;
}

function clearScreen() {
  lowerScreen.textContent = "0";
  upperScreen.textContent = "";
}

function numberInput(e) {
  if (expr.currOp == 0) {
    expr.currOp = e.target.innerText;
  } else {
    expr.currOp += e.target.innerText;
  }
  displayScreen(0);
}

function dotInput() {
  let curString = expr.currOp.toString();
  if (!(curString.includes("."))) {
    expr.currOp += ".";
  }
  displayScreen(0);
}

function operatorInput(e) {
  if (expr.result != null) {
    expr.prevOp = expr.result;
    expr.result = null;
    expr.operator = e.target.getAttribute("data-op");
    expr.currOp = 0;
    displayScreen(1);
  } else if (expr.prevOp == null && expr.currOp != 0) {
    expr.prevOp = expr.currOp;
    expr.operator = e.target.getAttribute("data-op");
    expr.currOp = 0;
    displayScreen(1);
  } else if (expr.prevOp != null) {
    expr.prevOp = operate(expr.operator, expr.prevOp, expr.currOp);
    expr.operator = e.target.getAttribute("data-op");
    expr.currOp = 0;
    displayScreen(1);
  }
}

function eqInput() {
  if (expr.prevOp != null) {
    expr.result = operate(expr.operator, expr.prevOp, expr.currOp);
    displayScreen(2);
  }
}

const numBtns = document.querySelectorAll(".number-button");
const dotBtn = document.querySelector(".dot-button");
const clrBtn = document.querySelector(".clr-button");
const delBtn = document.querySelector(".del-button");
const opBtns = document.querySelectorAll(".op-button");
const eqBtn = document.querySelector(".eq-button");
const lowerScreen = document.querySelector(".lower-screen");
const upperScreen = document.querySelector(".upper-screen");

numBtns.forEach((btn) => btn.addEventListener("click", numberInput));
dotBtn.addEventListener("click", dotInput);
opBtns.forEach((btn) => btn.addEventListener("click", operatorInput));
eqBtn.addEventListener("click", eqInput);
clrBtn.addEventListener("click", () => {
  clearExprn();
  clearScreen();
});
delBtn.addEventListener("click", () => {
  if (expr.currOp != 0) {
    expr.currOp = expr.currOp.slice(0, -1);
    displayScreen(0);
  }
  if (expr.currOp === "") {
    expr.currOp = 0;
    displayScreen(0);
  }
});
