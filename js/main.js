var on = false
var readyToClear = false
var toScreen = ""
var memory = []




var screen = document.getElementById('main');

const num = document.getElementsByClassName('number')
for(i=0; i<num.length; i++) {
  num[i].addEventListener("click",addNumber)
}

const body = document.querySelector('body')

var offButton = document.getElementById("off-button")
offButton.addEventListener("click", turnOff)

var onButton = document.getElementById('on-button')
onButton.addEventListener("click", turnOn)

//var neg = document.getElementById('negate')
//neg.addEventListener("click", negate)

var toMem = document.getElementById('to-mem')
toMem.addEventListener("click",addMem)

var fMem = document.getElementById('from-mem')
fMem.addEventListener("click",fromMem)

var reMem = document.getElementById('call-mem')
reMem.addEventListener("click",callMem)

var cMem = document.getElementById('clear-mem')
cMem.addEventListener("click", clearMem)

var clearIt = document.getElementById('clear')
clearIt.addEventListener("click", clear)

/**** Operators ****/

var addIt = document.getElementById('add')
addIt.addEventListener("click", add)

var subtractIt = document.getElementById('subtract')
subtractIt.addEventListener("click", subtract)

var multiplyIt = document.getElementById('multiply')
multiplyIt.addEventListener("click", multiply)

var divideIt = document.getElementById('divide')
divideIt.addEventListener("click", divide)


function add(){
  if(on) {
    alert("adding?")
  }
}

function subtract(){
  if(on){
    alert("subtracting?")
  }
}

function multiply(){
  if (on){
    alert("multiplying?")
  }
}

function divide(){
  if(on) {
    alert("dividing?")
  }
}








function addNumber(){
  if (on) {
    if(body.classList.value=="on") {
      console.log(this.id)
      console.log(body.classList.value)
      if(screen.textContent=="0") {
        screen.textContent = this.id
      } else if (screen.textContent.length<9) {
        screen.textContent += this.id
      }
    }
  }
}

function clear() {
  screen.textContent="0"
}

function clearMem(){
  memory = []
  console.log(memory)
}

function callMem(){
  if(on) {
    if (memory.length>0) {
      screen.textContent = memory[memory.length-1]
      memory.pop()
      console.log(memory)
    }
  }
}

function addMem(){
  if(on) {
    memory.push(screen.textContent)
    console.log("memory: " + memory)
  }
}

function fromMem(){
  if(on) {
    if (memory.length>0) {
      memory.pop()
      console.log(memory)
    }
  }
}

// function negate(){
//   if(on) {
//     let sign = document.getElementById('sign')
//     sign.textContent="-"
//   }
// }

function turnOff(){
  screen.textContent=""
  neg.textContent = ""
  memory = []
  body.classList.remove('on')
  on=false
}

function turnOn(){
  on = true
  screen.textContent="0"
  body.classList.add('on')
  memory = []
  console.log(memory)

}

/***** EVALUATE: THE MONEY MAKER *****/
function evaluate(){
//
// for (i=exp.length-1; i>0; i--) {
//     if (exp[i]==="x") {
//         let temp = parseFloat(exp[i-1]*parseFloat(exp[i+1]))
//         exp.splice(i-1,3,temp)
//     }
//
// }
}
