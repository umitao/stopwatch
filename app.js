const miliseconds = document.querySelector("#miliseconds")
const seconds = document.querySelector("#seconds");

function setSeconds() {
  const secondString = Math.floor(Date.now() / 1000).toString().substring(8)
  console.log(secondString)
  seconds.innerHTML = secondString;
  // seconds.innerHTML++
}
function setMiliseconds() {
  miliseconds.innerHTML = Math.floor(Date.now() / 10).toString().substring(10);
}

const getMiliseconds = setInterval(setMiliseconds, 10)
const getSeconds = setInterval(setSeconds, 1000)


const moment = new Date()
console.log(moment.getMilliseconds())


clearInterval(getMiliseconds)
clearInterval(getSeconds)

//setInterval(Date.now(), 10)
//const timer = Math.floor(Date.now() / 10).toString().substring(10);
// miliseconds.innerHTML = setMiliseconds
//const salise = setInterval(timer, 10);
//0miliseconds.innerHTML = salise

//console.log(salise)
//const last2 = salise.toString().substring(10)
//console.log(last2)

function startWatch() {
  miliseconds.innerHTML = Math.floor(Date.now() / 10).toString().substring(10);

}

const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"