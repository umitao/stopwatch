"use strict";

const digits = document.querySelector(".digits");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");

const minutes = document.createElement("span");
minutes.innerText = "00:";
const seconds = document.createElement("span");
seconds.innerText = "00.";
const milliseconds = document.createElement("span");
milliseconds.innerText = "00";

// let hours = null;
let startTime = null;
let savedTime = null;
let timerID = null;

window.onload = () => {
  digits.append(minutes, seconds, milliseconds);
  resetButton.style.display = "none";
  stopButton.style.display = "none";
};

stopButton.onmouseup = function stopTimer() {
  savedTime = Date.now() - startTime;
  clearInterval(timerID);
  stopButton.style.display = "none";
  lapButton.style.display = "none";
  startButton.style.display = "inline-block";
  resetButton.style.display = "inline-block";
};

startButton.onmouseup = function startTimer() {
  if (savedTime === null) {
    startTime = Date.now();
  } else {
    startTime = Date.now() - savedTime;
  }
  timerID = setInterval(handleTimer, 10);
  startButton.style.display = "none";
  resetButton.style.display = "none";
  stopButton.style.display = "inline-block";
  lapButton.style.display = "inline-block";
};

function handleTimer() {
  const timeDifference = Math.floor((Date.now() - startTime) / 10);
  milliseconds.innerText = (timeDifference % 100).toString().padStart(2, "0");
  seconds.innerText = `${Math.floor((timeDifference / 100) % 60)
    .toString()
    .padStart(2, "0")}.`;
  minutes.innerText = `${Math.floor((timeDifference / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0")}:`;
}

//console.log(startTimer);

// function setSeconds() {
//   const secondString = Math.floor(Date.now() / 1000).toString().substring(8)
//   console.log(secondString)
//   seconds.innerHTML = secondString;
//   // seconds.innerHTML++
// }
// function setMiliseconds() {
//   clearInterval(Interval)
//   Interval = setInterval(startWatch, 10)
// }

// startButton.onclick = setMiliseconds

// function startWatch() {
//   miliseconds.innerHTML = Math.floor(Date.now() / 10).toString().substring(10);
// }
//const getSeconds = setInterval(setSeconds, 1000)

//const moment = new Date()
//console.log(moment.getMilliseconds())

//clearInterval(getMiliseconds)
//clearInterval(getSeconds)

//setInterval(Date.now(), 10)
//const timer = Math.floor(Date.now() / 10).toString().substring(10);
// miliseconds.innerHTML = setMiliseconds
//const salise = setInterval(timer, 10);
//0miliseconds.innerHTML = salise

//console.log(salise)
//const last2 = salise.toString().substring(10)
//console.log(last2)

// const str1 = '5';
// console.log(Date.now() / 365 / 24 / 60 / 60 / 1000)
// console.log(str1.padStart(2, '0'));
// expected output: "05"
