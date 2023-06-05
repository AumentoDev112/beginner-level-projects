const promptError = document.getElementById("paragraph");

let show = document.getElementById("displayAns");

function displayNumber(value) {
  const lastChar = show.value.slice(-1);

  if (/\d/.test(value)) {
    show.value += value;
  } else if (["+", "-", "*", "/", "%"].includes(value)) {
    if (lastChar.trim() !== "") {
      show.value += " " + value + " ";
    }
  } else if (value === "." && !getLastNumber(show.value).includes(".")) {
    show.value += value;
  }
}

function backspace() {
  const lastWord = show.value.slice(-1);
  if (lastWord == " ") {
    // console.log("This is Empty");
    show.value = show.value.slice(0, -3);
  } else if (lastWord !== " ") {
    show.value = show.value.slice(0, -1);
  }
}

function calculate() {
  let expression = show.value;
  const result = evaluateExpression(expression);
  show.value = result;
  if (expression == "") {
    show.value = "";
    promptError.textContent = "Enter a Number First !";
    promptError.style.color = "red";
  }
}

const clickedButton = document.querySelectorAll("#calculatorButton");
clickedButton.forEach((e) => {
  e.addEventListener("click", () => {
    promptError.textContent = "Here You can calculate me!";
    promptError.style.color = "black";
  });
});


function clearScreen() {
  show.value = "";
}

function evaluateExpression(expression) {
  const tokens = expression.split(" ");
  let result = parseFloat(tokens[0]);
  let operator = null;

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (["+", "-", "*", "/", "%"].includes(token)) {
      operator = token;
    } else if (operator === "%") {
      let num = parseFloat(token);
        if (!num) {
        return result/100;
      } 
        else if (num){
          return num = (result/100)*num;
      }
    } else {
      const num = parseFloat(token);
      switch (operator) {
        case "+":
          result += num;
          break;
        case "-":
          result -= num;
          break;
        case "*":
          result *= num;
          break;
        case "/":
          result /= num;
          break;
      }
    }
  }

  return result;
}

function getLastNumber(expression) {
  const tokens = expression.split(" ").reverse();

  for (const token of tokens) {
    if (/^\d/.test(token)) {
      return token;
    }
  }

  return "";
}

function moveCursorLeft() {
  const currentPosition = show.selectionStart;

  if (currentPosition > 0) {
    show.setSelectionRange(currentPosition - 1, currentPosition - 1);
  }
}

// Move the cursor to the right
function moveCursorRight() {
  const currentPosition = show.selectionStart;

  if (currentPosition < show.value.length) {
    show.setSelectionRange(currentPosition + 1, currentPosition + 1);
  }
}

function validatePaste(event) {
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData("text");
  const onlyNumbers = pastedText.replace(/\D/g, ""); // Remove non-numeric characters
  event.preventDefault();
  document.execCommand("insertText", false, onlyNumbers); // Insert only the numeric text
}

function handleKeyDown(event) {
  const allowedKeysRegex = /^[\d+\-*/%.]$/;
  const keyPressed = event.key;

  if (allowedKeysRegex.test(keyPressed)) {
    promptError.textContent = "Here You can calculate me!";
    promptError.style.color = "black";
    displayNumber(keyPressed);
    event.preventDefault();
  } else if (keyPressed === "Enter") {
    event.preventDefault();
    calculate();
  } else if (keyPressed === "ArrowLeft") {
    event.preventDefault();
    // Add your custom logic for the left arrow key
    // For example, you can move the cursor to the left
    moveCursorLeft();
  } else if (keyPressed === "ArrowRight") {
    event.preventDefault();
    // Add your custom logic for the right arrow key
    // For example, you can move the cursor to the right
    moveCursorRight();
  } else {
    event.preventDefault();
  }
}

show.addEventListener("keydown", handleKeyDown);
const equal = document
  .getElementById("calculatorEqual")
  .addEventListener("click", calculate);
document
  .getElementById("calculatorButtonClear")
  .addEventListener("click", clearScreen);

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 8) {
    event.preventDefault();
    var cursorElement = document.activeElement;

    if (
      cursorElement.tagName === "INPUT" ||
      cursorElement.tagName === "TEXTAREA"
    ) {
      var cursorPosition = cursorElement.selectionStart;
      var value = cursorElement.value;
      var updatedValue =
        value.substring(0, cursorPosition - 1) +
        value.substring(cursorPosition);
      cursorElement.value = updatedValue;
      cursorElement.selectionStart = cursorPosition - 1;
      cursorElement.selectionEnd = cursorPosition - 1;
    }
  }
});
