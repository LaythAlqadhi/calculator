let firstNumber = null;
let operator = null;
let secondNumber = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    displayError("Cannot divide by zero!");
    return null;
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

function clearDisplay() {
  const display = document.getElementById('display');
  display.value = '';
  firstNumber = null;
  operator = null;
  secondNumber = null;
}

function appendNumber(number) {
  const display = document.getElementById('display');
  display.value += number;
  enableDecimalButton();
}

function appendDecimal() {
  const display = document.getElementById('display');
  if (!display.value.includes('.')) {
    display.value += '.';
  }
  disableDecimalButton();
}

function setOperator(selectedOperator) {
  if (firstNumber !== null && operator !== null && secondNumber === null) {
    operator = selectedOperator;
    return;
  }

  const display = document.getElementById('display');
  if (display.value !== '') {
    firstNumber = parseFloat(display.value);
    operator = selectedOperator;
    display.value = '';
    enableDecimalButton();
  }
}

function calculate() {
  const display = document.getElementById('display');
  if (firstNumber !== null && operator !== null && display.value !== '') {
    secondNumber = parseFloat(display.value);
    const result = operate(operator, firstNumber, secondNumber);
    if (result !== null) {
      display.value = roundToMaxDecimals(result, 5);
      firstNumber = result;
      operator = null;
      secondNumber = null;
    }
    enableDecimalButton();
  }
}

function applyPercentage() {
  const display = document.getElementById('display');
  const currentValue = parseFloat(display.value);

  if (!isNaN(currentValue)) {
    const result = currentValue / 100;
    display.value = result.toFixed(2);
  } else {
    display.value = "";
  }
}

function deleteLastCharacter() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
  enableDecimalButton();
}

function displayError(message) {
  const display = document.getElementById('display');
  display.value = 'Error: ' + message;
}

function roundToMaxDecimals(number, maxDecimals) {
  const factor = Math.pow(10, maxDecimals);
  return Math.round(number * factor) / factor;
}

function enableDecimalButton() {
  const display = document.getElementById('display');
  document.querySelector('.decimal').disabled = display.value.includes('.');
}

function disableDecimalButton() {
  document.querySelector('.decimal').disabled = true;
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    appendNumber(parseInt(key));
  } else if (key === '.') {
    appendDecimal();
  } else if (key === '+') {
    setOperator('+');
  } else if (key === '-') {
    setOperator('-');
  } else if (key === '*') {
    setOperator('*');
  } else if (key === '/') {
    setOperator('/');
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLastCharacter();
  }
});
