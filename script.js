  const display = document.querySelector('#display');
  const clear = document.querySelector('#clear');
  const backspaceButton = document.querySelector('#backspace');
  const decimal = document.querySelector('#decimal');
  const btns = document.querySelectorAll("button");
  const equals = document.querySelector("#equals");
  const operatorButtons = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");

let firstNum = "";
let secendNum = "";
let oper = ""; 

window.addEventListener('keydown', e => {
  let keyData = document.querySelector(`button[data-key="${e.key}"]`);
  if(!keyData) return;
  display.value += keyData
});
backspaceButton.addEventListener('click', backspace);
numbers.forEach(num => num.addEventListener('click', displayInputs));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', collect));
equals.addEventListener('click', sum);
clear.addEventListener('click', clearInputs);
decimal.addEventListener('click', decimalCheck);

function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  if (a === 0 || b === 0){
    alert(`Cannot divide by zero!`);
  }else {
    return a / b;
  }
};

function modulo(a, b) {
   return a % b;
};

function operator(num1, num2, operatorSign) {
   switch (operatorSign) {
      case '+':
       return add(num1, num2)
         break;
      case '-':
       return subtract(num1, num2)
         break;
      case '*':
       return multiply(num1, num2)
         break;
      case '/':
       return divide(num1, num2)
         break;
      case '%':
       return modulo(num1, num2)
         break;
   }
};

function displayInputs() {
  let currentDisplayValue = "";
  currentDisplayValue = this.textContent;
  display.value += currentDisplayValue;  
};

function decimalCheck() {
   if (Number.isInteger(+display.value)) {
      display.value += ".";
   }else{
     return;
   }
};

function backspace() {
  return display.value = display.value.slice(0,-1);
};

function clearInputs() {
   display.value = "";
   secendNum = "";
   firstNum = "";
   oper = "";
};


function collect() {
  if (firstNum === "") {
    firstNum = display.value;
    oper = this.textContent;
    display.value = "";
  }else{
    secendNum = display.value;
    oper = this.textContent;
    display.value = "";
    let temp = "";
    temp = operator(+firstNum, +secendNum, oper);
    firstNum = temp;
    secendNum = "";
  }
};

function sum() {
  if ( firstNum === "" && secendNum === "") return;
  secendNum = display.value;
  display.value = Math.round(operator(+firstNum, +secendNum, oper) * 10000) / 10000;
  secendNum = "";
  firstNum = "";
};
