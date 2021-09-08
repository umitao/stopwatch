const miliseconds = document.querySelector("#miliseconds")
//setInterval(Date.now(), 10)

const timer = Math.floor(Date.now() / 10)
console.log(timer)
const salise = setInterval(timer, 10);
//miliseconds.innerHTML = salise

console.log(salise)
const last2 = salise.toString().substring(10)
console.log(last2)