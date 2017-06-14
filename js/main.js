var on = false
var readyToClear = false
var toScreen = ""
var memory = []
var expression = []
var lastKeyClass = "number"
var initialValue = 0
var lastExpression =[]



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

var neg = document.getElementById('negate')
neg.addEventListener("click", negate)

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

var sqrt = document.getElementById('sq-root')
sqrt.addEventListener("click", sqRoot)

// var perc = document.getElementById('percent')
// perc.addEventListener("click", percent)

var perc = document.getElementById('percent')
perc.addEventListener("click", modulo)


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

function modulo(){
  if (on){
  //   if(lastKeyClass==="operator") {
  //     expression.pop()
  //   }
  //
  //   if(lastKeyClass==="number") {
  //     expression.push(screen.textContent)
  //   }
  //   expression.push("x")
  //   console.log(expression)
  //   readyToClear=true
  //   lastKeyClass="operator"
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
    lastExpression =[]
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
    lastExpression =[]
  }
}

function clearMem(){
  if (on) {
    memory = []
    console.log(memory)
    document.getElementById('memory').textContent=""

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
    if (memory.length<3) {
      memory.push(screen.textContent)
      if (memory.length>0) {
        document.getElementById('memory').textContent="M"
      }
      console.log("memory: " + memory)
      readyToClear=true
    }
  }
}

function fromMem(){
  if(on) {
    if (memory.length>0) {
      memory.pop()
      if (!memory.length>0) {
        document.getElementById('memory').textContent=""
      }
      console.log(memory)

    }
  }
}

function negate(){
  if(on) {
    screen.textContent *= -1
//
  }
}

function sqRoot() {
  if(on) {
    screen.textContent = Math.sqrt(screen.textContent)
  }
}

/*** Superceded by Modulo Function ***/
// function percent() {
//   if(on) {
//     screen.textContent /= 100
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
  lastExpression =[]
  console.log(memory)

}

/***** EVALUATE: THE MONEY MAKER *****/
function evaluate(){


  console.log("LE 284: " + lastExpression)
  if(on) {
      expression.push(screen.textContent)

      if (lastExpression.length > 0) {
        expression.push(lastExpression[0])
        expression.push(lastExpression[1])
      }



      console.log(expression)

      // Saves last two string indices to repeat upon subsequent "equals" presses
      lastExpression.push(expression[expression.length-2])
      lastExpression.push(expression[expression.length-1])

      console.log("LE line 344 : " + lastExpression)

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
    }



    //display answer, and "readyToClear"
    if (!(expression == (1/0))) {
      if (expression <= 999999999) {
        screen.textContent =        (Math.round(expression*10000000))/10000000
      }
    } else {
      screen.innerHTML = '<i>ERR</i>'
    }
    expression = []
    readyToClear=true

}


function color() {
  //
  //clearIt

}
