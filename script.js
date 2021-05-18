const calButtonns = document.querySelectorAll('.button');

const nightButton = document.querySelector('#night-button');
nightButton.addEventListener('click', toggleTheme);

const topScreen = document.querySelector('#top-screen');
const bottomScreen = document.querySelector('#bottom-screen');

let currentCalculation = '';
let currentOperatorChar = '';
let currentOperator = '';
let currentNum1 = '';
let currentNum2 = '';
let ans = '';

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
            
            break;
        case('ans'):
            break;
        case('equal'):
            equal();
            break;
        default:
            if (buttonID.startsWith('num')) {
                let num = buttonID.substring(4);
                if (num === 'dot') num = '.';
                bottomScreen.textContent += num;
                
                //if the user is entering the value for currentNum1
                if (currentOperator === '') currentNum1 += num;
                else currentNum2 += num;

                currentCalculation += num;
            } else if (buttonID.startsWith('op')) {
                //if a full calculation was already entered
                if (currentNum2 != '') {
                    equal();
                }

                populateDisplay(bottomScreen.textContent + ' ' + e.target.textContent, '');
                currentOperator = buttonID.substring(3);
                currentOperatorChar = e.target.textContent;
                currentCalculation += ' ' + currentOperatorChar + ' ';
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
    return result;
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(operator) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            return num1 / num2;
        }
}

function clear() {
    populateDisplay('','');
    currentCalculation = '';
    currentOperatorChar = '';
    currentOperator = '';
    currentNum1 = '';
    currentNum2 = '';
    ans = '';
}

function clearOp () {

}

function toggleTheme(e) {
    document.body.classList.toggle('dark');
}

start();