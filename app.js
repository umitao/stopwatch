"use strict";

const digits = document.querySelector(".digits");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");

let startingTime = null;
let savedTime = null;
let timerID = null;
const timeElapsed = 0;

window.onload = () => {
  resetHandler();
  hideButton(resetButton, stopButton);
};

stopButton.onmouseup = function pauseTimer() {
  savedTime = Date.now() - startingTime;
  clearInterval(timerID);
  hideButton(stopButton, lapButton);
  showButton(startButton, resetButton);
};

startButton.onmouseup = function startTimer() {
  if (!savedTime) {
    startingTime = Date.now();
  } else {
    startingTime = Date.now() - savedTime;
  }
  timerID = setInterval(handleTimer, 10);
  showButton(stopButton, lapButton);
  hideButton(startButton, resetButton);
};

resetButton.onmouseup = resetHandler;

function handleTimer() {
  const timeDifference = Math.floor((Date.now() - startingTime) / 10);
  digits.innerHTML = `${getStringMinutes(timeDifference)}${getStringSeconds(
    timeDifference
  )}${getStringMilliseconds(timeDifference)}`;
}

function getStringMinutes(timeElapsed) {
  return `${Math.floor((timeElapsed / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0")}:`;
}

function getStringSeconds(timeElapsed) {
  return `${Math.floor((timeElapsed / 100) % 60)
    .toString()
    .padStart(2, "0")}.`;
}

function getStringMilliseconds(timeElapsed) {
  return `${Math.floor(timeElapsed % 100)
    .toString()
    .padStart(2, "0")}`;
}

function resetHandler() {
  digits.innerHTML = `${getStringMinutes(0)}${getStringSeconds(
    0
  )}${getStringMilliseconds(0)}`;
  clearInterval(timerID);
  savedTime = 0;
}

function hideButton(...selector) {
  selector.map((element) => (element.style.display = "none"));
}

function showButton(...selector) {
  selector.map((element) => (element.style.display = "inline-block"));
}

// const hideButton = (selector) => (selector.style.display = "none");
// const showButton = (selector) => (selector.style.display = "inline-block");

// const hide = (selector1, selector2) => {
//   selector1.style.display = "none";
//   selector2.style.display = "none";
// };

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
