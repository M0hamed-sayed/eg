class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === 'خطأ: لا يمكن القسمة على صفر!') {
            this.clear();
            return;
        }
        
        if (this.currentOperand.length === 1 || this.currentOperand === '0') {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentOperand === 'خطأ: لا يمكن القسمة على صفر!') {
            this.clear();
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'خطأ: لا يمكن القسمة على صفر!') {
            this.clear();
            return;
        }
        
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.showError();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = this.roundResult(computation).toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    roundResult(number) {
        return Math.round(number * 100000000) / 100000000;
    }

    changeSign() {
        if (this.currentOperand === 'خطأ: لا يمكن القسمة على صفر!' || this.currentOperand === '0') {
            return;
        }
        
        if (this.currentOperand.charAt(0) === '-') {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
        
        this.updateDisplay();
    }

    showError() {
        this.currentOperand = 'خطأ: لا يمكن القسمة على صفر!';
        this.previousOperand = '';
        this.operation = undefined;
        
        const display = document.querySelector('.display');
        display.classList.add('error');
        
        setTimeout(() => {
            display.classList.remove('error');
        }, 2000);
        
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand === 'خطأ: لا يمكن القسمة على صفر!') {
            this.currentOperandElement.textContent = this.currentOperand;
        } else {
            this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        }
        
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// Initialize calculator
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
    } else if (e.key === '.') {
        calculator.appendNumber('.');
    } else if (e.key === '+') {
        calculator.chooseOperation('+');
    } else if (e.key === '-') {
        calculator.chooseOperation('-');
    } else if (e.key === '*') {
        calculator.chooseOperation('×');
    } else if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
    } else if (e.key === 'Escape') {
        calculator.clear();
    } else if (e.key === 'Backspace') {
        calculator.delete();
    }
});
