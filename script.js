// Object Values
const calculator = {
    displayValue: "0",
    firstNumber: null,
    waitingForSecondNumber: false,
    operator: null,
};

// Update Display
const updateDisplay = () => {
    const display = document.querySelector(".screen");
    display.value = calculator.displayValue;
};
updateDisplay();

// Handle Key Press 
const keys = document.querySelector(".keys");
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

//Input Digit
const inputDigit = (digit) => {
    const { displayValue, waitingForSecondNumber } = calculator;

    if (waitingForSecondNumber === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayValue =
            displayValue === "0" ? digit : displayValue + digit;
    }
};

// Input Decimal
const inputDecimal = (dot) => {
    if (calculator.waitingForSecondNumber === true) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondNumber = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Handle Operators
const handleOperator = (nextOperator) => {
    const { firstNumber, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitingForSecondNumber) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstNumber == null && !isNaN(inputValue)) {
        calculator.firstNumber = inputValue;
    } else if (operator) {
        const result = calculate(firstNumber, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstNumber = result;
    }
    calculator.waitingForSecondNumber = true;
    calculator.operator = nextOperator;
};

// Calculator Logic
const calculate = (firstNumber, secondNumber, operator) => {
    if (operator === "+") {
        return firstNumber + secondNumber;
    } else if (operator === "-") {
        return firstNumber - secondNumber;
    } else if (operator === "*") {
        return firstNumber * secondNumber;
    } else if (operator === "/") {
        return firstNumber / secondNumber;
    } else
        return secondNumber;
}

// Reset Calculator
const resetCalculator = () => {
    calculator.displayValue = "0";
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
};