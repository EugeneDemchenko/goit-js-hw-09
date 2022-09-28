const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const view = document.querySelector('body');
let timerId = null;

stopButton.setAttribute('disabled', '')

startButton.addEventListener('click', colorSwitcherOn)
stopButton.addEventListener('click', colorSwitcherOff)

function colorSwitcherOn() {
    timerID = setInterval(() => {
       view.style.background = getRandomHexColor() 
    }, 1000);
    stopButton.removeAttribute('disabled')
    startButton.setAttribute('disabled', '')
    console.log(timerId);
}
function colorSwitcherOff() {
    clearInterval(timerId);
    startButton.removeAttribute('disabled')
    stopButton.setAttribute('disabled', '')
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

