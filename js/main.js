// -----------------------------------------------------------------------------
// Stateful
// -----------------------------------------------------------------------------

var poweredOn = false
var readyToClear = false
var toScreen = ''
var memory = []
var expression = []
var lastKeyClass = 'number'
var initialValue = 0
var lastExpression = []

// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

function byId (id) {
  return document.getElementById(id)
}

function byClassName (className) {
  return document.getElementsByClassName(className)
}

function listen (id, eventType, fn) {
  var el = byId(id)

  // sanity-check: el should exist
  if (!el) return

  el.addEventListener(eventType, fn)
}

// -----------------------------------------------------------------------------
// DOM Elements
// -----------------------------------------------------------------------------

const body = document.body
const screenEl = byId('main')
const memoryEl = byId('memory')

// -----------------------------------------------------------------------------
// Events
// -----------------------------------------------------------------------------

function addOperatorEvents () {
  listen('add', 'click', clickAddBtn)
  listen('subtract', 'click', clickSubtractBtn)
  listen('multiply', 'click', clickMultiplyBtn)
  listen('divide', 'click', clickDivideBtn)
  listen('dec', 'click', clickDecimalBtn)
  listen('sq-root', 'click', clickSqRootBtn)
  listen('percent', 'click', clickPercentBtn)
}

function addNumberEvents () {
  var numEls = byClassName('number')
  for (var i = 0; i < numEls.length; i++) {
    numEls[i].addEventListener('click', clickNumberBtn)
  }
}

function addButtonEvents () {
  listen('off-button', 'click', clickTurnOffBtn)
  listen('on-button', 'click', clickTurnOnBtn)
  listen('negate', 'click', clickNegateBtn)
  listen('to-mem', 'click', clickAddMemBtn)
  listen('from-mem', 'click', clickFromMemBtn)
  listen('call-mem', 'click', clickCallMemBtn)
  listen('clear-mem', 'click', clickClearMemBtn)
  listen('clear', 'click', clickClearBtn)
  listen('equals', 'click', clickEvaluateBtn)
}

function addEvents () {
  addButtonEvents()
  addNumberEvents()
  addOperatorEvents()
}

// -----------------------------------------------------------------------------
// Operators
// -----------------------------------------------------------------------------

function clickAddBtn () {
  if (!poweredOn) return

  if (lastKeyClass === 'operator') {
    expression.pop()
  }

  if (lastKeyClass === 'number') {
    expression.push(screenEl.textContent)
  }
  expression.push('+')
  console.log(expression)
  readyToClear = true
  lastKeyClass = 'operator'
}

function clickSubtractBtn () {
  if (!poweredOn) return

  if (lastKeyClass === 'operator') {
    expression.pop()
  }

  if (lastKeyClass === 'number') {
    expression.push(screenEl.textContent)
  }
  expression.push('-')
  console.log(expression)
  readyToClear = true
  lastKeyClass = 'operator'
}

function clickMultiplyBtn () {
  if (!poweredOn) return

  if (lastKeyClass === 'operator') {
    expression.pop()
  }

  if (lastKeyClass === 'number') {
    expression.push(screenEl.textContent)
  }
  expression.push('x')
  console.log(expression)
  readyToClear = true
  lastKeyClass = 'operator'
}

function clickPercentBtn () {
  if (!poweredOn) return

  if (lastKeyClass === 'operator') {
    expression.pop()
  }

  if (lastKeyClass === 'number') {
    expression.push(screenEl.textContent)
  }
  expression.push('%')
  console.log(expression)
  readyToClear = true
  lastKeyClass = 'operator'
}

function clickDivideBtn () {
  if (!poweredOn) return

  if (lastKeyClass === 'operator') {
    expression.pop()
  }

  if (lastKeyClass === 'number') {
    expression.push(screenEl.textContent)
  }
  expression.push('/')
  console.log(expression)
  readyToClear = true
  lastKeyClass = 'operator'
}

function clickDecimalBtn () {
  if (!poweredOn) return

  if (!(screenEl.textContent.indexOf('.') >= 0)) {
    screenEl.textContent += '.'
    lastKeyClass = 'number'
  }
}

function clickNumberBtn () {
  if (!poweredOn) return

  lastExpression = []
  if (body.classList.value == 'on') {
    console.log(this.id)
    if ((screenEl.textContent == '0') || (readyToClear)) {
      screenEl.textContent = this.id
      lastKeyClass = 'number'
      readyToClear = false
    } else if (screenEl.textContent.length < 9) {
      screenEl.textContent += this.id
      console.log(expression)
      lastKeyClass = 'number'
      readyToClear = false
    }
  }
}

function clickClearBtn () {
  if (!poweredOn) return

  screenEl.textContent = '0'
  lastExpression = []
}

function clickClearMemBtn () {
  if (!poweredOn) return

  memory = []
  console.log(memory)
  memoryEl.textContent = ''
}

function clickCallMemBtn () {
  if (!poweredOn) return

  if (memory.length > 0) {
    screenEl.textContent = memory[memory.length - 1]
    memory.pop()
    console.log(memory)
  }
}

function clickAddMemBtn () {
  if (!poweredOn) return

  if (memory.length < 3) {
    memory.push(screenEl.textContent)
    if (memory.length > 0) {
      memoryEl.textContent = 'M'
    }
    console.log('memory: ' + memory)
    readyToClear = true
  }
}

function clickFromMemBtn () {
  if (!poweredOn) return

  if (memory.length > 0) {
    memory.pop()
    if (!memory.length > 0) {
      memoryEl.textContent = ''
    }
    console.log(memory)
  }
}

function clickNegateBtn () {
  if (!poweredOn) return

  screenEl.textContent *= -1
}

function clickSqRootBtn () {
  if (!poweredOn) return

  screenEl.textContent = Math.sqrt(screenEl.textContent)
}

function clickTurnOffBtn () {
  screenEl.textContent = ''
  memory = []
  expression = []
  body.classList.remove('on')
  poweredOn = false
}

function clickTurnOnBtn () {
  poweredOn = true
  screenEl.textContent = '0'
  body.classList.add('on')
  memory = []
  expression = []
  lastExpression = []
  console.log(memory)
}

// -----------------------------------------------------------------------------
// Evaluate
// -----------------------------------------------------------------------------

function clickEvaluateBtn () {
  if (!poweredOn) return

  console.log('LE 284: ' + lastExpression)

  expression.push(screenEl.textContent)

  if (lastExpression.length > 0) {
    expression.push(lastExpression[0])
    expression.push(lastExpression[1])
  }

  // Saves last two string indices to repeat upon subsequent "equals" presses
  lastExpression.push(expression[expression.length - 2])
  lastExpression.push(expression[expression.length - 1])

  // First, change any "n", "x", "r" sequence to float n * float r
  //
  //  Start from back of array to not interfere with index, though this may not be necessary
  //
  for (i = expression.length - 1; i > 0; i--) {
    if (expression[i] === 'x') {
      let temp = (parseFloat(expression[i - 1]) * (parseFloat(expression[i + 1])))

      expression.splice(i - 1, 3, temp)
      console.log(expression)
    }
  }

  // repeat for modulo
  for (i = expression.length - 1; i > 0; i--) {
    if (expression[i] === '%') {
      let a = parseFloat(expression[i - 1])
      let b = parseFloat(expression[i + 1])
      let temp = a - b * (Math.floor(a / b))

      expression.splice(i - 1, 3, temp)
      console.log(expression)
    }
  }

  // repeat for division
  for (i = expression.length - 1; i > 0; i--) {
    if (expression[i] === '/') {
      let temp = (parseFloat(expression[i - 1]) / (parseFloat(expression[i + 1])))

      expression.splice(i - 1, 3, temp)
      console.log(expression)
    }
  }

  // go through addition and subtraction
  for (i = expression.length - 1; i > 0; i--) {
    if (expression[i] === '+') {
      let temp = (parseFloat(expression[i - 1]) + (parseFloat(expression[i + 1])))

      expression.splice(i - 1, 3, temp)
      console.log(expression)
    }
  }

  for (i = expression.length - 1; i > 0; i--) {
    if (expression[i] === '-') {
      let temp = (parseFloat(expression[i - 1]) - (parseFloat(expression[i + 1])))
      expression.splice(i - 1, 3, temp)
      console.log(expression)
    }
  }

  // display answer, and "readyToClear"
  if (!(expression == (1 / 0))) {
    if (expression <= 999999999) {
      screenEl.textContent = (Math.round(expression * 10000000)) / 10000000
    }
  } else {
    screenEl.innerHTML = '<i>ERR</i>'
  }
  expression = []
  readyToClear = true
}

// -----------------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------------

function init () {
  addEvents()
  clickTurnOnBtn()
}

init()
