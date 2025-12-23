'use strict'


let activePlayer = 0 // White starts (white === 0)
/* ======== DOM CACHE ======== */
const whiteButton = document.getElementById('whiteDisplay')
const blackButton = document.getElementById('blackDisplay')


/* ======== EVENTS ======== */
let whiteTimeCurrent = 300
let blackTimeCurrent = 300 

 document.addEventListener('keydown', function(e) {
  whiteButton.classList.remove('playing--now')
  blackButton.classList.remove('playing--now')

  if (activePlayer === 0) {
    whiteButton.classList.add('playing--now')
    activePlayer = 1
  } else {
    blackButton.classList.add('playing--now')
    activePlayer = 0
  }
})


/* ======== TIME MANAGEMENT ======== */
