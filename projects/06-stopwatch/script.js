let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(time) {
    let diffInMin = time / (1000 * 60);
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    return {
        m: mm < 10 ? "0" + mm : mm,
        s: ss < 10 ? "0" + ss : ss,
        ms: ms < 10 ? "0" + ms : ms
    };
}

function printTime() {
    let formatted = formatTime(elapsedTime);
    minutesEl.textContent = formatted.m;
    secondsEl.textContent = formatted.s;
    millisecondsEl.textContent = formatted.ms;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        printTime();
    }, 10);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 1;
    printTime();
    lapsList.innerHTML = "";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    const formatted = formatTime(elapsedTime);
    const lapTimeStr = `${formatted.m}:${formatted.s}:${formatted.ms}`;
    const li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCounter}</span><strong>${lapTimeStr}</strong>`;
    lapsList.prepend(li);
    lapCounter++;
}