const calButtonns = document.querySelectorAll('.button');

window.addEventListener('keydown', keyPressedEvent);

const nightButton = document.querySelector('#night-button');
nightButton.addEventListener('click', toggleTheme);

const topScreen = document.querySelector('#top-screen');
const bottomScreen = document.querySelector('#bottom-screen');

let currentCalculation = '';
let currentOperatorChar = '';
let currentOperator = '';
let currentNum1 = '';
let currentNum2 = '';
let allowAddDel = true;
let allowOp = false;
const ROUND_DEC_PLACE = 5;
const MAX_DIGITS = 5;
function start() {
    calButtonns.forEach(button => {
        button.addEventListener('click', buttonClicked);
    });
}

function populateDisplay(topContent, bottomContent) {
    topScreen.textContent = topContent;
    bottomScreen.textContent = bottomContent;
}

function buttonClicked(e) {
    let buttonID = e.target.id;
    switch (buttonID) {
        case ('ac'):
            clear();
            break;
        case ('del'):
            if (allowAddDel) del();
            break;
        case('equal'):
            equal();
            break;
        default:
            if (buttonID.startsWith('num') && allowAddDel) {
                let num = buttonID.substring(4);
                if (num === 'dot') num = '.';
                
                let currentAdding;

                //if the user is entering the value for currentNum1
                if (currentOperator === '') {
                    currentNum1 += num;
                } else {
                    currentNum2 += num;
                }
                
                bottomScreen.textContent += num;
                
                //if the user is entering the value for currentNum1
                if (currentOperator === '') currentNum1 += num;
                else currentNum2 += num;

                currentCalculation += num;
                allowAddDel = true;
                allowOp = true;
            } else if (buttonID.startsWith('op') && allowOp) {
                //if a full calculation was already entered
                if (currentNum2 != '') {
                    equal();
                }

                populateDisplay(bottomScreen.textContent + ' ' + e.target.textContent, '');
                currentOperator = buttonID.substring(3);
                currentOperatorChar = e.target.textContent;
                currentCalculation += ' ' + currentOperatorChar + ' ';
                allowAddDel = true;
                allowOp = false;
            }
    }
}

function equal() {
    let result = operate(currentOperator,currentNum1,currentNum2);
    currentCalculation += ' ' + '=';
    populateDisplay(currentCalculation, result);
    currentCalculation = result;
    currentNum2 = '';
    currentNum1 = result;
    currentOperator = '';
    allowAddDel = false;
    return result;
}

function operate(operator, num1, num2) {
    let result;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 != 0) result = num1 / num2;
            break;
        case 'modulo':
            result = num1 % num2;
            break;
        case 'power':
            result = num1 ** num2;
            break;
        }
    return parseFloat(result.toFixed(ROUND_DEC_PLACE));
}

function clear() {
    populateDisplay('','');
    currentCalculation = '';
    currentOperatorChar = '';
    currentOperator = '';
    currentNum1 = '';
    currentNum2 = '';
}

function del(){
    let length = bottomScreen.textContent.length;
    bottomScreen.textContent = bottomScreen.textContent.substring(0, length - 1);
    currentCalculation = currentCalculation.substring(0, currentCalculation.length - 1);
    if (currentNum2 === '') currentNum1 = currentNum1.substring(0, currentNum1.length -1);
    else currentNum2 = currentNum2.substring(0, currentNum2.length - 1);
}

/*KEYBOARD SUPPORT*/
function keyPressedEvent(e) {
    let keyPressed = e.key;
    let id = '';
    switch (keyPressed) {
        case 'Backspace':
            id = '#del';
            break;
        case 'Escape':
            id = '#ac';
            break;
        case 'Enter':
            id = '#equal';
            break;
        case '+':
            id = '#op-add';
            break;
        case '-':
            id = '#op-subtract';
            break;
        case '*':
        case 'x':
            id = '#op-multiply';
            break;
        case '/':
            id = '#op-divide';
            break;
        case '%':
            id = '#op-modulo';
            break;
        case '^':
            id = '#op-power';
            break;
        default:
            if (!isNaN(keyPressed)) id = '#num-' + keyPressed;
            break; 
    }
    if (id != '') document.querySelector(id).click();
}

function toggleTheme(e) {
    document.body.classList.toggle('dark');
}

start();