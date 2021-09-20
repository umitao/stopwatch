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
let totalLapTime = 0;
let stopTimeStamp = null;
let lapNumber = 1;
let mainTimer = undefined;
let lapTimer = undefined;
const laps = [];

window.onload = addEmptyRows();

startButton.onclick = function startTimer() {
  if (!stopTimeStamp) {
    startingTime = Date.now();
  } else {
    startingTime = Date.now() - stopTimeStamp;
  }
  mainTimer = setInterval(handleTimer, 10);
  lapTimer = setInterval(handleLapTimer, 10);
  showButton(stopButton, lapButton);
  hideButton(startButton, resetButton);
};

stopButton.onclick = function pauseTimer() {
  stopTimeStamp = Date.now() - startingTime;
  clearInterval(mainTimer);
  clearInterval(lapTimer);
  hideButton(stopButton, lapButton);
  showButton(startButton, resetButton);
};

resetButton.onclick = function handleReset() {
  digits.innerHTML = `${convertTimeToString(0)}`;
  laps.length = 0;
  mainTimer = clearInterval(mainTimer);
  clearInterval(lapTimer);
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  stopTimeStamp = 0;
  lapNumber = 1;
  totalLapTime = 0;
  showButton(lapButton);
  hideButton(resetButton);
  addEmptyRows();
};

lapButton.onclick = function saveLapCreateNew() {
  if (mainTimer !== undefined) {
    lapNumber++;
    const lastLapTime = Date.now() - (startingTime + totalLapTime);
    laps.push(lastLapTime);

    totalLapTime = laps.reduce(
      (lapsTempTotal, lastLap) => lapsTempTotal + lastLap
    );
    // console.log(totalLapTime);
    // console.log(totalTimeSinceStart);

    addLapRow(lapNumber, lastLapTime);
    removeEmptyRows();
  }
};

function handleTimer() {
  totalTimeSinceStart = Math.floor(Date.now() - startingTime);
  digits.innerHTML = `${convertTimeToString(totalTimeSinceStart)}`;
}

function handleLapTimer() {
  let lapStartTime = startingTime + totalLapTime;
  let currentLapTime = Math.floor(Date.now() - lapStartTime);
  let parentOfLapCell = table.firstElementChild;
  let lapTimeCell = parentOfLapCell.lastChild;
  let lapNumberCell = parentOfLapCell.firstChild;
  lapNumberCell.innerHTML = `Lap ${lapNumber}`;
  lapTimeCell.innerHTML = `${convertTimeToString(currentLapTime)}`;
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
  for (let i = 0; i + laps.length < 6; i++) {
    let emptyRow = document.createElement("tr");
    let emptyFragment = fragment.appendChild(emptyRow);
    let emptyCell = document.createElement("td");
    emptyRow.appendChild(emptyCell);
    emptyRow.appendChild(emptyCell.cloneNode());
    table.appendChild(emptyFragment);
    emptyRow = null;
    emptyCell = null;
  }
}

function removeEmptyRows() {
  if (7 > lapNumber) {
    let allLapNodes = document.querySelectorAll("tr");
    let lastLapNode = allLapNodes[allLapNodes.length - 1];
    lastLapNode.remove();
  }
}

// function markBestWorstLap() { //Unfinished- wrong
//   if (laps.length >= 2) {
//     const worstLap = Math.min(...laps);
//     const bestLap = Math.max(...laps);
//     if (lapTime < bestLap) {
//       tr.classList.add("best-lap");
//     }
//   }
// }
// markBestWorstLap();
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
