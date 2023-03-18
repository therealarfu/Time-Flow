let runningTimer = false
let startTime;
let timerInterval;
let elapsedTime = 0;
let previousTime = 0;
let timeString;

function startTimerButton(){
    const timerRect = document.getElementById("timer")
    const startRect = document.getElementById("start")

    runningTimer = !runningTimer
    if (runningTimer) {
        startTimer()
        timerRect.style.backgroundColor = "#4472C4"
        startRect.textContent = "Stop timer"
    } else {
        stopTimer()
        timerRect.style.backgroundColor = "#262626"
        startRect.textContent = "Start timer"
    }
}

function resetTimer() {
    const startRect = document.getElementById("start")
    const timerRect = document.getElementById("timer")
    stopTimer()
    timerRect.textContent = "00:00.00"
    elapsedTime = 0
    previousTime = 0
    timerRect.style.backgroundColor = "#262626"
    startRect.textContent = "Start timer"
    runningTimer = !runningTimer
}

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space' || event.code === 'Enter' || event.key === 's') {
        startTimerButton()
    } else if (event.key === 'r') {
        resetTimer()
    }
});

function startTimer() {
    startTime = Date.now()
    timerInterval = setInterval(updateTimer, 100)
}

function stopTimer() {
    clearInterval(timerInterval)
    previousTime = elapsedTime
}

function updateTimer() {
    const timerLabel = document.getElementById("timer")
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime + previousTime
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 100);

    if (minutes > 59) {
        const hours = Math.floor(minutes / 60);
        const minuteRemainder = minutes % 60;
        timeString = `${hours.toString().padStart(2, '0')}:${minuteRemainder.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString()}0`;
    } else {
        timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString()}0`;
    }

    timerLabel.textContent = timeString;
}  