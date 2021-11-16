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
    const lowerScreen = document.querySelector(".lower-screen");
    lowerScreen.innerText = expr.currOp;
}

function numberInput(e) {
  if (expr.currOp == null) {
    expr.currOp = e.target.innerText;
  } else {
    expr.currOp += e.target.innerText;
  }
  displayScreen();
  console.log(expr.currOp);
}

const numBtn = document.querySelectorAll(".number-button");

numBtn.forEach((btn) => btn.addEventListener("click", numberInput));
