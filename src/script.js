// "use strict";

/* =====================================================
   TIME PRESETS
   ===================================================== */

let activePlayer = 0; // 0 === white, 1 === black

let whiteTimeCurrent = 300; // 5min
let blackTimeCurrent = 300; // 5min

let timer = null;

/* =====================================================
   DOM CACHE
   ===================================================== */

const whiteButton = document.getElementById("whiteDisplay");
const blackButton = document.getElementById("blackDisplay");

const whiteTimeEl = document.getElementById("whiteTimeRemaining");
const blackTimeEl = document.getElementById("blackTimeRemaining");

const clockSound = document.getElementById("clockSound");
const playPause = document.getElementById("playPause");

playPause.classList.add("fa-play");
playPause.classList.remove("fa-pause");

/* =====================================================
    PLAYING NOW
   ===================================================== */

playPause.addEventListener("click", () => {
  if (playPause.classList.contains("fa-pause")) {
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
  } else {
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
  }
});

/* =====================================================
   DISPLAY
   ===================================================== */

// MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(remainingSeconds).padStart(2, "0");

  return `${mm}:${ss}`;
}

/* =====================================================
    SWITCH PLAYER
   ===================================================== */

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    clearInterval(timer);
    whiteButton.classList.remove("playing--now");
    blackButton.classList.remove("playing--now");

    // white
    if (activePlayer === 0) {
      whiteButton.classList.add("playing--now");

      timer = setInterval(() => {
        whiteTimeCurrent--;
        whiteTimeEl.textContent = formatTime(whiteTimeCurrent);
      }, 1000);

      clockSound.currentTime = 0;
      clockSound.play();

      activePlayer = 1;

      // black
    } else {
      blackButton.classList.add("playing--now");

      timer = setInterval(() => {
        blackTimeCurrent--;
        blackTimeEl.textContent = formatTime(blackTimeCurrent);
      }, 1000);

      clockSound.currentTime = 0;
      clockSound.play();

      activePlayer = 0;
    }
  }
});
