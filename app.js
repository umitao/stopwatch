"use strict";

const digits = document.querySelector(".digits");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");
const table = document.getElementById("table");
const fragment = new DocumentFragment();

let startingTime = null;
let totalTimeSinceStart = null;
let stoppedTime = null;
let timerID = undefined;
const totalLapTime = 0;
let lapNumber = 0;
const laps = [];

startButton.onclick = function startTimer() {
  if (!stoppedTime) {
    startingTime = Date.now();
  } else {
    startingTime = Date.now() - stoppedTime;
  }
  timerID = setInterval(handleTimer, 10);
  showButton(stopButton, lapButton);
  hideButton(startButton, resetButton);
};

stopButton.onclick = function pauseTimer() {
  stoppedTime = Date.now() - startingTime;
  clearInterval(timerID);
  hideButton(stopButton, lapButton);
  showButton(startButton, resetButton);
};

resetButton.onclick = function handleReset() {
  digits.innerHTML = `${convertTimeToString(0)}`;
  laps.length = 0;
  clearInterval(timerID);
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  stoppedTime = 0;
  lapNumber = 0;
  showButton(lapButton);
  hideButton(resetButton);
};

//LAP FUNC ONGOING WORK
lapButton.onclick = function saveLapCreateNew() {
  if (timerID !== undefined) {
    lapNumber++;
    const totalLapTime = laps.reduce(
      (lapsTempTotal, lastLap) => lapsTempTotal + lastLap,
      0
    );

    const lastLapTime = Date.now() - (startingTime + totalLapTime);
    laps.push(lastLapTime);
    addLapRow(lapNumber, lastLapTime);
  }
};

function handleTimer() {
  totalTimeSinceStart = Math.floor(Date.now() - startingTime);
  digits.innerHTML = `${convertTimeToString(totalTimeSinceStart)}`;
}

function hideButton(...selectors) {
  selectors.map((element) => (element.style.display = "none"));
}

function showButton(...selectors) {
  selectors.map((element) => (element.style.display = "inline-block"));
}

function addLapRow(lapNumber, lapTime) {
  let tr = document.createElement("tr");
  let trFragment = fragment.appendChild(tr);
  let td = document.createElement("td");
  trFragment.prepend(td);
  trFragment.prepend(td.cloneNode()); //Until here it does NOT render
  tr.firstChild.innerHTML = `Lap ${lapNumber}`;
  tr.lastChild.innerHTML = convertTimeToString(lapTime);
  table.prepend(trFragment); //Here it goes to DOM
}

function convertTimeToString(time) {
  time /= 10;
  const seconds = Math.floor((time / 100) % 60);
  const minutes = Math.floor((time / (100 * 60)) % 60);
  const hundredths = Math.floor(time % 100);

  const padNumber = (number) => number.toString().padStart(2, "0");
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(hundredths)}`;
}

function addEmptyRows() {
  for (let i = 0; 6 > i + laps.length; i++) {
    let emptyRow = document.createElement("tr");
    emptyRow.appendChild(table);
  }
}

// const padNumber = (...number) =>
//   number.map((element) => element.toString().padStart(2, "0"));
// function getStringMinutes(timeElapsed) {
//   return `${Math.floor((timeElapsed / (100 * 60)) % 60)
//     .toString()
//     .padStart(2, "0")}:`;
// }

// function getStringSeconds(timeElapsed) {
//   return `${Math.floor((timeElapsed / 100) % 60)
//     .toString()
//     .padStart(2, "0")}.`;
// }

// function getStringMilliseconds(timeElapsed) {
//   return `${Math.floor(timeElapsed % 100)
//     .toString()
//     .padStart(2, "0")}`;
// }

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
