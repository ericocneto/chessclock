'use strict'

let activePlayer = 0 // 0 = white, 1 = black

let whiteTimeCurrent = 300
let blackTimeCurrent = 300

let timer = null

const whiteButton = document.getElementById('whiteDisplay')
const blackButton = document.getElementById('blackDisplay')

const whiteTimeEl = document.getElementById('whiteTimeRemaining')
const blackTimeEl = document.getElementById('blackTimeRemaining')
const clockSound = document.getElementById('clockSound')


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const mm = String(minutes).padStart(2, '0')
  const ss = String(remainingSeconds).padStart(2, '0')

  return `${mm}:${ss}`
}

document.addEventListener('keydown', (e) => {
  if(e.key===" ") {
  clearInterval(timer)

  whiteButton.classList.remove('playing--now')
  blackButton.classList.remove('playing--now')

  if (activePlayer === 0) {
    whiteButton.classList.add('playing--now')
    timer = setInterval(() => {
      whiteTimeCurrent--
      whiteTimeEl.textContent = formatTime(whiteTimeCurrent)
    }, 1000)
    clockSound.play()

    activePlayer = 1
  } else {
    blackButton.classList.add('playing--now')
    timer = setInterval(() => {
      blackTimeCurrent--
      blackTimeEl.textContent = formatTime(blackTimeCurrent)
    }, 1000)
    clockSound.play()

    activePlayer = 0
  }
}})
