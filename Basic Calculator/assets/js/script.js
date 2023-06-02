var promptError = document.getElementById("paragraph");


const show = document.getElementById("displayAns");
console.log(show.innerText);

function displayNumber(value) {
  const lastChar = show.value.slice(-1);

  if (/\d/.test(value)) {
    show.value += value;
  } else if (['+', '-', '*', '/', '%'].includes(value)) {
    if (lastChar.trim() !== '') {
      show.value += ' ' + value + ' ';
    }
  } else if (value === '.' && !getLastNumber(show.value).includes('.')) {
    show.value += value;
  }
}

function backspace(){
    show.value = show.value.slice(0, -1);
}

function calculate() {
  let expression = show.value;
  const result = evaluateExpression(expression);
  show.value = result;
  if(expression == ""){
    show.value = ""
    promptError.textContent = "Enter a Number First !";
    promptError.style.color = "red";
  }
}

const clickedButton = document.querySelectorAll("#calculatorButton");
clickedButton.forEach((e)=>{
  e.addEventListener('click',()=>{
    promptError.textContent = "Here You can calculate me!";
    promptError.style.color = "black";
    
  })
})

function clearScreen() {
  show.value = "";
}

function evaluateExpression(expression) {
  const tokens = expression.split(' ');
  let result = parseFloat(tokens[0]);
  let operator = null;

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (['+', '-', '*', '/', '%'].includes(token)) {
      operator = token;
    } else {
      const num = parseFloat(token);

      switch (operator) {
        case '+':
          result += num;
          break;
        case '-':
          result -= num;
          break;
        case '*':
          result *= num;
          break;
        case '/':
          result /= num;
          break;
        case '%':
          result %= num;
          break;
      }
    }
  }

  return result;
}

function getLastNumber(expression) {
  const tokens = expression.split(' ').reverse();

  for (const token of tokens) {
    if (/^\d/.test(token)) {
      return token;
    }
  }

  return '';
}

function handleKeyDown(event) {
  const allowedKeysRegex = /^[\d+\-*/%.]$/;
  const keyPressed = event.key;

  if (keyPressed === 'Backspace') {
    event.preventDefault();
    show.value = show.value.slice(0, -1); // Remove the last character
  } else if (keyPressed === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (!allowedKeysRegex.test(keyPressed)) {
    event.preventDefault();
  } else {
    if (['+', '-', '*', '/', '%'].includes(keyPressed)) {
      displayNumber(keyPressed);
      event.preventDefault();
    } else if (keyPressed === '+/-') {
      displayNumber(keyPressed);
      event.preventDefault();
    } else if (keyPressed === '.') {
      displayNumber(keyPressed);
      event.preventDefault();
    }
  }
}

show.addEventListener("keydown", handleKeyDown);
const equal = document.getElementById("calculatorEqual").addEventListener("click", calculate);
document.getElementById("calculatorButtonClear").addEventListener("click", clearScreen); 