
let displayVal = '0';
let num1 = null;
let num2 = null;
let op = null;
let op2 = null;
let result = null;
const buttons = document.querySelectorAll('button')
let lastInputWasOp = false;

const add = (a, b) => a + b
const sub = (a, b) => a - b
const mult = (a, b) => a * b
const div = (a, b) => {
    if (b === 0) return "ERROR";
    else return parseFloat((a / b).toFixed(5));
}



const operate = (op, int1, int2) => {
    switch (op) {
        case '+':
            return add(int1, int2);
        case '-':
            return sub(int1, int2);
        case '/':
            return div(int1, int2);
        case '*':
            return mult(int1, int2);
    };

};


const updateDisplay = () => {
    const display = document.getElementById('display');
    display.innerText = displayVal;

    if (displayVal.length > 9) {

        display.innerText = displayVal.substring(0, 9);
    }
}


updateDisplay();


const click = () => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {

            if (buttons[i].classList.contains('int')) {
                inputNum(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].id === "equal"){
                inputEquals();
                updateDisplay();
            }else if (buttons[i].classList.contains('operator')){
                inputOp(buttons[i].value);
                updateDisplay();
            }else if (buttons[i].id === 'reset'){
                resetDisplay();
                updateDisplay();
            } else if (buttons[i].id === 'decimal'){
                inputDecimal('.')
                updateDisplay();
            }else if (buttons[i].id === 'sign'){
                inputSign(displayVal);
                updateDisplay();
            }else if (buttons[i].id === 'percent'){
                inputPercent(displayVal);
                updateDisplay();
            }
        });
    }
}

click();


const inputNum = (val) => {
    if (op === null) {
        if (displayVal === '0' || displayVal === 0) {
            displayVal = val;
        } else if (displayVal === num1) {
            displayVal = val;
        } else {
            displayVal += val;
        }

    } else {
        if (displayVal === num1) {
            displayVal = val;
        } else {
            displayVal += val;
        }

     }
    lastInputWasOp = false;

}

const inputOp = (operator) => {
    if (lastInputWasOp) return;

    if (op != null && op2 === null) {
        op2 = operator;
        num2 = displayVal;
        result = operate(op, Number(num1), Number(num2));
        displayVal = roundAccurately(result, 15).toString();
        num1 = displayVal;
        result = null;
    } else if (op != null && op2 != null) {
        num2 = displayVal;
        result = operate(op2, Number(num1), Number(num2));
        op2 = operator;
        displayVal = roundAccurately(result, 15).toString();
        num1 = displayVal;
        result = null;
    } else {
        op = operator;
        num1 = displayVal;
    }
    lastInputWasOp = true;
};

const inputEquals = () => {
    if (op == null) {
        displayVal = displayVal;
    } else if (op2 != null) {
        num2 = displayVal;
        result = operate(op2, Number(num1), (Number(num2)))
        if (result === 'ERROR') displayVal = 'ERROR';
        else {
            displayVal = roundAccurately(result, 15).toString();
            num1 = displayVal;
            num2 = null;
            op = null;
            op2 = null;
            result = null;
        }
    } else {
        num2 = displayVal;
        result = operate(op,Number(num1), Number(num2));
        if (result === 'ERROR') displayVal = 'Nope';
        else {
            displayVal = roundAccurately(result, 15).toString();
            num1 = displayVal;
            num2 = null;
            op = null;
            op2 = null;
            result = null;
        }
    }
}
const inputDecimal = (dot) => {
    if (displayVal === num1 || displayVal === num2) {
        displayVal = '0';
        displayVal += dot;

    } else if (!displayVal.includes(dot)) {
        displayVal += dot;
    }
}

const resetDisplay = () => {
    displayVal = "0"
    num1 = null;
    num2 = null;
    op = null;
    op2 = null;
    result = null;
}



const inputPercent = (num) => displayVal = (num / 100).toString();
const inputSign = (num) => displayVal = (num * -1).toString();
const roundAccurately = (num, places) => parseFloat(Math.round(num + 'e' + places) + 'e-' + places);