const calButtonns = document.querySelectorAll('.button');

const nightButton = document.querySelector('#night-button');
nightButton.addEventListener('click', toggleTheme);

const topScreen = document.querySelector('#top-screen');
const bottomScreen = document.querySelector('#bottom-screen');

let topScreenValue;
let bottomScreenValue;
let previousAns;
let previousInput;

function start() {
    calButtonns.forEach(button => {
        button.addEventListener('click', buttonClicked);
    });
}

function populateDisplay(topContent, bottomContent) {
    topScreen.textContent= topContent;
    bottomScreen.textContent = bottomContent;
}

function buttonClicked(e) {
    let button = e.target.id;
    switch (button) {
        case ('ac'):
            clear();
            break;
        case ('del'):
            del();
            break;
        case('ans'):
            populateDisplay(previousInput, previousAns);
            break;
        case('equal'):
            break;
        case('dot'):
            break;
        case('add'):
            break;
        case('subtract'):
            break;
        case('multiply'):
            break;
        case('divide'):
            break;
        case('power'):
            break;
        case('modulo'):
            break;
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        
    }
}

function clear() {
    console.log('clear');
}

function del() {
    let length = bottomScreen.textContent.length;
    bottomScreen.textContent = bottomScreen.textContent.substring(0, length - 1);
}

function toggleTheme(e) {
    document.body.classList.toggle('dark');
}

start();