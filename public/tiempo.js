var seconds = 60 * 2.5; //número de segundos a contar
const audio = new Audio("./sound/20s.mp3");
audio.volume = 0.4;

const music = new Audio("./sound/music.mp3");
var countdownTimer;

const boton = document.getElementById("empezar");
const div = document.getElementById("inicial");

boton.addEventListener("click", function () {
  music.play();
  div.classList.add("ocultar");
  document.documentElement.requestFullscreen();
  countdownTimer = setInterval(secondPassed, 1000);
});

function secondPassed() {
  document.getElementById("inicial").style.display = "none";
  var minutes = Math.round((seconds - 30) / 60);
  var remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  document.getElementById("tiempo").innerHTML =
    minutes + ":" + remainingSeconds;
  if (seconds === 0) {
    clearInterval(countdownTimer);
    printDiv("Poema");
  } else {
    seconds--;
    if (seconds === 20) {
      audio.play();
    }
  }
}

function printDiv(div) {
  clearInterval(countdownTimer);
  audio.pause();
  music.pause();

  document.documentElement.requestFullscreen();
  window.print();
  document.getElementById("final").style.display = "block";

  setTimeout(() => {
    document.location.reload();
  }, 10000);
}
