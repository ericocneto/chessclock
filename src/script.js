"use strict";

/* =====================================================
   INITIAL PRESETS
   ===================================================== */

let activePlayer = 0; // 0 === white, 1 === black
let started = false

const DEFAULT_TIME = 300; // 5min
let whiteTimeCurrent = DEFAULT_TIME;
let blackTimeCurrent = DEFAULT_TIME;

let timer = null;

const fiveminOption = document.getElementById('fiveminOption')

/* =====================================================
   DOM CACHE
   ===================================================== */

const settingsModal = document.getElementById("settingsModal");
settingsModal.classList.add("hidden");
const settingsIcon = document.getElementById("settingsIcon");
const exitSettingsIco = document.getElementById("exitSettingsIco");


const whiteButton = document.getElementById("whiteDisplay");
const blackButton = document.getElementById("blackDisplay");

const whiteTimeEl = document.getElementById("whiteTimeRemaining");
const blackTimeEl = document.getElementById("blackTimeRemaining");

const clockSound = document.getElementById("clockSound");
const playPause = document.getElementById("playPause");
const resetIcon = document.getElementById("resetIcon");

playPause.classList.add("fa-play");
playPause.classList.remove("fa-pause");

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

function startTimerForActivePlayer() {
  clearInterval(timer);
  whiteButton.classList.remove("playing--now");
  blackButton.classList.remove("playing--now");

  if (activePlayer === 0) {
    whiteButton.classList.add("playing--now");

    timer = setInterval(() => {
      if (whiteTimeCurrent === 10) {
        whiteButton.style.backgroundColor = "red";
      }
      if (blackTimeCurrent === 10) {
        blackButton.style.backgroundColor = "red";
      }
      whiteTimeCurrent--;
      if (whiteTimeCurrent <= 0) {
        whiteTimeCurrent = 0;
        whiteTimeEl.textContent = formatTime(0);
        clearInterval(timer);
        whiteButton.classList.remove("playing--now");
        blackButton.classList.remove("playing--now");
        clockSound.pause();
        clockSound.currentTime = 0;
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        alert("Time out — Black wins");
        return;
      }

      whiteTimeEl.textContent = formatTime(whiteTimeCurrent);
    }, 1000);

    clockSound.currentTime = 0;
    clockSound.play();
  } else {
    blackButton.classList.add("playing--now");

    timer = setInterval(() => {
      if (whiteTimeCurrent === 10) {
        whiteButton.style.backgroundColor = "red";
      }
      if (blackTimeCurrent === 10) {
        blackButton.style.backgroundColor = "red";
      }
      blackTimeCurrent--;
      if (blackTimeCurrent <= 0) {
        blackTimeCurrent = 0;
        blackTimeEl.textContent = formatTime(0);
        clearInterval(timer);
        whiteButton.classList.remove("playing--now");
        blackButton.classList.remove("playing--now");
        clockSound.pause();
        clockSound.currentTime = 0;
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        alert("Time out - White wins");
        return;
      }

      blackTimeEl.textContent = formatTime(blackTimeCurrent);
    }, 1000);

    clockSound.currentTime = 0;
    clockSound.play();
  }
}

function switchPlayerTurn() {
  // Only switch if timer was running; this toggles active player then starts their timer
  clearInterval(timer);
  timer = null;
  activePlayer = activePlayer === 0 ? 1 : 0;
  startTimerForActivePlayer();
}

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    // If timer running, space switches player. If paused, resume same player.
    if (timer) {
      switchPlayerTurn();
    } else {
      started = true;
      if (playPause.classList.contains("fa-play")) {
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
      }
      startTimerForActivePlayer();
    }
  }
});

/* =====================================================
    SETTINGS
   ===================================================== */
settingsIcon.addEventListener("click", () => {
  if (settingsModal.classList.contains("hidden")) {
    settingsModal.classList.remove("hidden");
  }
});

//exit
exitSettingsIco.addEventListener("click", () => {
  settingsModal.classList.toggle("hidden");
});
exitSettingsIco.addEventListener("keydown", e=> {
  if(e.key === "Escape") {
    settingsModel.classList.toggle('hidden')
  }
})

/* =====================================================
   PLAY/PAUSE FEATURE
   ===================================================== */

playPause.addEventListener("click", () => {
  if (playPause.classList.contains("fa-pause")) {
    // Pause
    clearInterval(timer);
    timer = null;
    whiteButton.classList.remove("playing--now");
    blackButton.classList.remove("playing--now");
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
  } else {
    // Play (resume current player's turn)
    started = true;
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
    startTimerForActivePlayer();
  }
});

function resetClock() {
  clearInterval(timer);
  timer = null;
  // reset times
  whiteTimeCurrent = DEFAULT_TIME;
  blackTimeCurrent = DEFAULT_TIME;
  // update displays
  whiteTimeEl.textContent = formatTime(whiteTimeCurrent);
  blackTimeEl.textContent = formatTime(blackTimeCurrent);
  // reset visuals
  whiteButton.classList.remove("playing--now");
  blackButton.classList.remove("playing--now");
  whiteButton.style.backgroundColor = "";
  blackButton.style.backgroundColor = "";
  // reset sound and controls
  clockSound.pause();
  clockSound.currentTime = 0;
  playPause.classList.remove("fa-pause");
  playPause.classList.add("fa-play");
  // reset state
  activePlayer = 0;
  started = false;
}

if (resetIcon) {
  resetIcon.addEventListener("click", resetClock);
}



/* =====================================================
   TOAST
   ===================================================== */
// function showToast(message, duration = 3000) {
//   const toast = document.getElementById("toast")

//   toast.textContent = message

//   // show
//   toast.classList.remove("hidden")
//   requestAnimationFrame(() => {
//     toast.classList.remove("opacity-0", "translate-y-4")
//     toast.classList.add("opacity-100", "translate-y-0")
//   })

//   // hide
//   setTimeout(() => {
//     toast.classList.remove("opacity-100", "translate-y-0")
//     toast.classList.add("opacity-0", "translate-y-4")

//     setTimeout(() => {
//       toast.classList.add("hidden")
//     }, 300)
//   }, duration)
// }

// showToast('hello world!')