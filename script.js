let displayScreen = document.querySelector(".display-screen");
let numButtons = document.querySelectorAll("#numBtn");
let operatorButtons = document.querySelectorAll("#operatorBtn");
let decimalButton = document.querySelector("#decimal");
let equalsButton = document.querySelector("#equals");
let clearButton = document.querySelector("#clear");
let deleteButton = document.querySelector("#delete");

let currentInput = "";
let num1 = null;
let num2 = null;
let currentOperator = null;
let resultDisplayed = false;

numButtons.forEach(button => {
    button.addEventListener("click", function () {
        appendNumber(button.textContent);
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", function () {
        appendOperator(button.textContent);
    })
});

decimalButton.addEventListener("click", appendDecimal);
equalsButton.addEventListener("click", calculateResult);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNum);
document.addEventListener("keydown", handleKeyboardInput);


/**
 * DOCU: Appends a number to the current input and updates the display.
 * @param {string} num - The number to append (0-9).
 */
function appendNumber(num) {
    if (resultDisplayed) {
        currentInput = "";
        resultDisplayed = false;
    }

    currentInput += num;
    displayScreen.textContent = currentInput;
}

/**
 * DOCU: Stores current input as num1 or computes intermediate result, sets the operator.
 * @param {string} selectedOperator - The operator selected (+, -, ×, ÷).
 */
function appendOperator(selectedOperator) {
    if (currentInput === "") return;

    if (num1 === null) {
        num1 = parseFloat(currentInput);
    } else if (currentOperator !== null) {
        num2 = parseFloat(currentInput);
        num1 = operate(currentOperator, num1, num2);
        displayScreen.textContent = num1;
    }

    currentOperator = selectedOperator;
    currentInput = "";
    resultDisplayed = false;
}

/** DOCU: Appends a decimal point to the current input if not already present. */
function appendDecimal() {
    if (currentInput.includes(".")) return;

    currentInput += ".";
    displayScreen.textContent = currentInput;
}

/** DOCU: Performs the calculation based on the selected operator and operands. */
function calculateResult() {
    if (currentInput === "" || currentOperator === null || num1 === null) return;

    num2 = parseFloat(currentInput);
    const result = operate(currentOperator, num1, num2);
    displayScreen.textContent = result;

    currentInput = result.toString();
    num1 = result;
    num2 = null;
    currentOperator = null;

    resultDisplayed = true;

    console.log(result);
}

/** DOCU: Clears all inputs and resets calculator to default state. */
function clear() {
    displayScreen.textContent = "0";
    currentInput = "";
    num1 = null;
    num2 = null;
    currentOperator = null;
}

/** DOCU: Deletes the last digit of the current input and updates the display. */
function deleteNum() {
    currentInput = currentInput.slice(0, -1);
    displayScreen.textContent = currentInput || "0";
}

/**
 * DOCU: Handles keyboard input and maps keys to calculator actions.
 * @param {KeyboardEvent} e - The keydown event.
 */
function handleKeyboardInput(e) {
    const key = e.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === "+") {
        appendOperator("+");
    } else if (key === "-") {
        appendOperator("-");
    } else if (key === "*" || key === "x" || key === "X") {
        appendOperator("×");
    } else if (key === "/") {
        appendOperator("÷");
    } else if (key === "=" || key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteNum();
    } else if (key === "Escape" || key === "c" || key === "C") {
        clear();
    } else if (key === ".") {
        appendDecimal();
    }
}

/**
 * DOCU:  POerforms operation based on operator symbol.
 * @param {string} operator - The arithmetic operator (+, -, ×, ÷).
 * @param {number} num1 - First operand.
 * @param {number} num2 - Second operand.
 * @return {number|string} - Result of the operation or an error message.
 */
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            if (num2 === 0) return "Huh?";
            return divide(num1, num2);
        default:
            return null;
    }
}

/** DOCU: Adds two numbers. */
function add(num1, num2) {
    return num1 + num2;
}

/** DOCU: Subtracts second number from first. */
function subtract(num1, num2) {
    return num1 - num2;
}

/** DOCU: Multiplies two numbers. */
function multiply(num1, num2) {
    return num1 * num2;
}

/** DOCU: Divides first number by second, handles division by zero. */
function divide(num1, num2) {
    return num1 / num2;
}