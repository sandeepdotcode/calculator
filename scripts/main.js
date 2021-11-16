let expr = {
  prevOp: null,
  operator: null,
  currOp: null,
};

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
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
    default:
      result = "ERROR";
  }
  return result;
}

function displayScreen() {
    lowerScreen.innerText = expr.currOp;
}

function clearExprn() {
    for (key in expr) {
        expr[key] = null;
    }
}

function clearScreen() {
    lowerScreen.textContent = "0";
    upperScreen.textContent = "";
}

function numberInput(e) {
  if (expr.currOp == null) {
    expr.currOp = e.target.innerText;
  } else {
    expr.currOp += e.target.innerText;
  }
  displayScreen();
}

const numBtns = document.querySelectorAll(".number-button");
const clrBtn = document.querySelector(".clr-button");
const lowerScreen = document.querySelector(".lower-screen");
const upperScreen = document.querySelector(".upper-screen");

numBtns.forEach((btn) => btn.addEventListener("click", numberInput));
clrBtn.addEventListener('click', () => {
    clearExprn();
    clearScreen();
});