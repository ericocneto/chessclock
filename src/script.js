// "use strict";

/* =====================================================
   APPLICATION STATE
   Fonte única de verdade do jogo
   ===================================================== */

// 0 = white | 1 = black
let activePlayer = 0;

// Tempo restante (em segundos)
let whiteTimeCurrent = 300;
let blackTimeCurrent = 300;

// Intervalo ativo do relógio
let timer = null;


/* =====================================================
   DOM REFERENCES
   Cache de elementos para performance e legibilidade
   ===================================================== */

const whiteButton = document.getElementById("whiteDisplay");
const blackButton = document.getElementById("blackDisplay");

const whiteTimeEl = document.getElementById("whiteTimeRemaining");
const blackTimeEl = document.getElementById("blackTimeRemaining");

const clockSound = document.getElementById("clockSound");
const playPause = document.getElementById("playPause");


/* =====================================================
   UI INITIAL STATE
   ===================================================== */

// Estado visual inicial do botão play/pause
playPause.classList.add("fa-play");
playPause.classList.remove("fa-pause");


/* =====================================================
   UI EVENTS
   Apenas responsabilidade visual (sem regra de jogo)
   ===================================================== */

// Alterna o ícone do botão play/pause
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
   UTILITY FUNCTIONS
   Funções puras (sem efeitos colaterais)
   ===================================================== */

// Converte segundos para formato MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(remainingSeconds).padStart(2, "0");

  return `${mm}:${ss}`;
}


/* =====================================================
   GAME CONTROL
   Regra principal do relógio de xadrez
   ===================================================== */

// Controle da troca de turnos via tecla espaço
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    // Garante apenas um relógio rodando
    clearInterval(timer);

    // Remove destaque visual dos dois jogadores
    whiteButton.classList.remove("playing--now");
    blackButton.classList.remove("playing--now");

    // Turno das brancas
    if (activePlayer === 0) {
      whiteButton.classList.add("playing--now");

      timer = setInterval(() => {
        whiteTimeCurrent--;
        whiteTimeEl.textContent = formatTime(whiteTimeCurrent);
      }, 1000);

      clockSound.currentTime = 0;
      clockSound.play();

      activePlayer = 1;

    // Turno das pretas
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
