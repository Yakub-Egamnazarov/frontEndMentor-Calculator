// Selecting toggle buttons
const toggleButtons = document.querySelectorAll(".toggle-btn");

// selecting buttons from keypad
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const resetButton = document.querySelector("[data-reset]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const outputDisplay = document.querySelector("[data-output]");

// --------------------------------------------------------
// --- --- --- THEME SWITCH --- --- ---

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.documentElement.className = `${btn.id}`;
  });
});

// --------------------------------------------------------
// --- --- --- CALCULATOR --- --- ---
class Calculator {
  constructor(outputDisplayElement) {
    this.outputDisplayElement = outputDisplayElement;
    this.prevOperand = "";
    this.curOperand = "0";
    this.updateDisplay();
  }

  clear() {
    this.prevOperand = "";
    this.curOperand = "0";
    this.operation = undefined;
  }

  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.curOperand.includes(".")) return;
    this.curOperand = this.curOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.curOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.prevOperand = this.curOperand;
    this.curOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const cur = parseFloat(this.curOperand);

    if (isNaN(prev) || isNaN(cur)) return;

    switch (this.operation) {
      case "+":
        computation = prev + cur;
        break;
      case "-":
        computation = prev - cur;
        break;
      case "*":
        computation = prev * cur;
        break;
      case "/":
        computation = prev / cur;
        break;
      default:
        return;
    }

    this.curOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.outputDisplayElement.innerText = this.getDisplayNumber(
      this.curOperand
    );
  }
}

// ---- ---- ---- ---- ---- ---- ---- ----
// Creating a calculator object
const calculator = new Calculator(outputDisplay);

// ---- ---- ---- ---- ---- ---- ---- ----
//  Adding Event Listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
