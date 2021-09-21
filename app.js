"use strict";

const digits = document.querySelector(".digits");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");
const table = document.getElementById("table");
const tableElement = document.getElementsByTagName("table");
const fragment = new DocumentFragment();

let startingTime = null;
let totalTimeSinceStart;
let totalLapTime = 0;
let stopTimeStamp = null;
let lapNumber = 0;
let mainTimer = undefined;
let lapTimer = undefined;

const laps = [];

window.onload = addEmptyRows();

startButton.onclick = function startTimer() {
  if (!stopTimeStamp) {
    startingTime = Date.now();
    lapNumber++;
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
  lapTimer = clearInterval(lapTimer);
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  stopTimeStamp = 0;
  lapNumber = 0;
  totalLapTime = 0;
  showButton(lapButton);
  hideButton(resetButton);
  addEmptyRows();
};

lapButton.onclick = function saveLapCreateNew() {
  if (mainTimer !== undefined) {
    const lastLapTime = Date.now() - (startingTime + totalLapTime);
    laps.push(lastLapTime);
    totalLapTime = laps.reduce(
      (lapsTempTotal, lastLap) => lapsTempTotal + lastLap
    );
    markExtremes();
    addLapRow(lapNumber, lastLapTime);
    removeEmptyRows();
    lapNumber++;
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
  // lapNodesArray.push(trFragment);
  // console.log(lapNodesArray);
  table.insertBefore(trFragment, table.firstChild.nextSibling);
  //table.prepend(trFragment); //Here it goes to DOM
}

function convertTimeToString(time) {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hundredths = Math.floor((time / 10) % 100);

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
  if (lapNumber < 6) {
    let allLapNodes = document.querySelectorAll("tr");
    let lastLapNode = allLapNodes[allLapNodes.length - 1];
    // console.log(table.rows);
    lastLapNode.remove();
  }
}

//Thanks to Victor, Best Lap and Worst Lap functions working with below code.

function markExtremes() {
  const { maxIdx, minIdx } = laps.reduce(
    (acc, lap, idx) => {
      if (acc.min > lap) {
        acc.min = lap;
        acc.minIdx = idx;
      }
      if (acc.max < lap) {
        acc.max = lap;
        acc.maxIdx = idx;
      }
      return acc;
    },
    {
      maxIdx: -1,
      minIdx: -1,
      max: Number.NEGATIVE_INFINITY,
      min: Number.POSITIVE_INFINITY,
    }
  );

  if (maxIdx === minIdx) {
    // Skip if we have a tie - Should only happen either when less than 2 elements, or if all elements have the same exact value
    return;
  }

  const getLapElement = (i) => table.rows[laps.length - i - 1];
  for (let i = 0; i < laps.length; i++) {
    const lap = getLapElement(i);

    if (i !== minIdx) {
      lap.classList.remove("min");
    }
    if (i !== maxIdx) {
      lap.classList.remove("max");
    }
  }

  getLapElement(minIdx).classList.add("min");
  getLapElement(maxIdx).classList.add("max");
}
// function markBestWorstLap() { //Unfinished- wrong
//   if (laps.length >= 2) {
// const worstLap = Math.min(...laps);
// const bestLap = Math.max(...laps);
// const worstIndex = laps.indexOf(worstLap);
// const bestIndex = laps.indexOf(bestLap);
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
