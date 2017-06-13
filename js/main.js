

var screen = document.getElementById('screen');

const num = document.getElementsByClassName('number')
var toScreen = ""

var memory = []

const body = document.querySelector('body')

var offButton = document.getElementById("off-button")
offButton.addEventListener("click", turnOff)

var onButton = document.getElementById('on-button')
onButton.addEventListener("click", turnOn)


for(i=0; i<num.length; i++) {
  num[i].addEventListener("click",addNumber)
}

function addNumber(){
  if(body.classList.value=="on") {
    console.log(this.id)
    console.log(body.classList.value)
    if(screen.textContent=="0") {
      screen.textContent = this.id
    } else if (screen.textContent.length<10) {
      screen.textContent += this.id
    
    }
}

}

function turnOff(){
  screen.textContent=""
  body.classList.remove('on')
}

function turnOn(){
  screen.textContent="0"
  body.classList.add('on')

}
