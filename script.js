// Calculator class constructor that will take all of the inputs for the calculator as well as all of the functions.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    };
    // Function to clear out the different variables on the calculator screen.
    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.readyToReset = false;
      this.operation = undefined;
    };
    // Function for removing a single number/symbol on the calculator screen.
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    // Function to be initiated each time that a user clicks on a number to be added to the calculator screen.
    appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
    };
    // Function for when a user clicks on an operation symbol.
    chooseOperation(operation) {
      if (this.currentOperand === "") return
      if (this.currentOperand !== "" && this.previousOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    };
    // Function that takes the value of what is being displayed on the calculator and computes a single value.
    compute() {
      let computation;
      const previous = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) return
      switch (this.operation) {
        case "+":
          computation = previous + current;
          break;
        case "-":
          computation = previous - current;
          break;
        case "*":
          computation = previous * current;
          break;
        case "÷":
          computation = previous / current;
          break;
        default:
          return;
      }
      this.readyToReset = true;
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = "";
    };
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    };
  
    // Function that updates the value of what is displayed in the output.
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = "";
      }
    };
  };
  
  // Constants.
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearButton = document.querySelector("[data-allClear]");
  const previousOperandTextElement = document.querySelector("[data-previousOperand]");
  const currentOperandTextElement = document.querySelector("[data-currentOperand]");
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
        calculator.currentOperand = "";
        calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
  });