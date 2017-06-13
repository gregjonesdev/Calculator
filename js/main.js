var on = false
var readyToClear = false
var toScreen = ""
var memory = []
var expression = []
var lastKeyClass = "number"




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

var equal = document.getElementById('equals')
equal.addEventListener("click",evaluate)

/**** Operators ****/

var addIt = document.getElementById('add')
addIt.addEventListener("click", add)

var subtractIt = document.getElementById('subtract')
subtractIt.addEventListener("click", subtract)

var multiplyIt = document.getElementById('multiply')
multiplyIt.addEventListener("click", multiply)

var divideIt = document.getElementById('divide')
divideIt.addEventListener("click", divide)

var dec = document.getElementById('dec')
dec.addEventListener("click", decimal)




function add(){
  if(on) {
    if(lastKeyClass==="operator") {
      expression.pop()
    }

    if(lastKeyClass==="number") {
      expression.push(screen.textContent)
    }
      expression.push("+")
      console.log(expression)
      readyToClear=true
      lastKeyClass="operator"
    }
}

function subtract(){
  if(on){
    if(lastKeyClass==="operator") {
      expression.pop()
    }

    if(lastKeyClass==="number") {
      expression.push(screen.textContent)
    }
      expression.push("-")
      console.log(expression)
      readyToClear=true
      lastKeyClass="operator"
  }
}

function multiply(){
  if (on){
    if(lastKeyClass==="operator") {
      expression.pop()
    }

    if(lastKeyClass==="number") {
      expression.push(screen.textContent)
    }
    expression.push("x")
    console.log(expression)
    readyToClear=true
    lastKeyClass="operator"
  }
}

function divide(){
  if(on) {
    if(lastKeyClass==="operator") {
      expression.pop()
    }

    if(lastKeyClass==="number") {
      expression.push(screen.textContent)
    }
    expression.push("/")
    console.log(expression)
    readyToClear=true
    lastKeyClass="operator"
  }
}

function decimal(){
  if (on){
    if (!(screen.textContent.indexOf(".")>=0)) {
      screen.textContent += "."
      lastKeyClass="number"
    }
  }
}






function addNumber(){
  if (on) {
    if(body.classList.value=="on") {
      console.log(this.id)
      //console.log(body.classList.value)
      if((screen.textContent=="0") || (readyToClear)) {
        screen.textContent = this.id
        lastKeyClass="number"
        readyToClear=false
      } else if (screen.textContent.length<9) {
        screen.textContent += this.id
        console.log(expression)
        lastKeyClass="number"
        readyToClear=false
      }
    }
  }
}

function clear() {
  if (on) {
    screen.textContent="0"
  }
}

function clearMem(){
  if (on) {
    memory = []
    console.log(memory)
  }
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
  //neg.textContent = ""
  memory = []
  expression = []
  body.classList.remove('on')
  on=false
}

function turnOn(){
  on = true
  screen.textContent="0"
  body.classList.add('on')
  memory = []
  expression = []
  console.log(memory)

}

/***** EVALUATE: THE MONEY MAKER *****/
function evaluate(){
  if(on) {
    expression.push(screen.textContent)
    console.log(expression)
// First, change any "n", "x", "r" sequence to float n * float r
//
//  Start from back of array to not interfere with index, though this may not be necessary
//
for (i=expression.length-1; i>0; i--) {
    if (expression[i]==="x") {
        let temp = (parseFloat(expression[i-1])*(parseFloat(expression[i+1])))

        expression.splice(i-1,3,temp)
        console.log(expression)
    }

}

//repeat for division

for (i=expression.length-1; i>0; i--) {
    if (expression[i]==="/") {
        let temp = (parseFloat(expression[i-1])/(parseFloat(expression[i+1])))

        expression.splice(i-1,3,temp)
        console.log(expression)
    }

}






//go through addition and subtraction

for (i=expression.length-1; i>0; i--) {
    if (expression[i]==="+") {
        let temp = (parseFloat(expression[i-1])+(parseFloat(expression[i+1])))

        expression.splice(i-1,3,temp)
        console.log(expression)
    }

}

for (i=expression.length-1; i>0; i--) {
    if (expression[i]==="-") {
        let temp = (parseFloat(expression[i-1])-(parseFloat(expression[i+1])))

        expression.splice(i-1,3,temp)
        console.log(expression)
    }

}


//display answer, and "readyToClear"
  if (!(expression == (1/0))) {
    screen.textContent = expression
  } else {
    //screen.textContent = "ERR"
    screen.innerHTML = '<i>ERR</i>'
  }
  expression = []
  readyToClear=true

  }
}
