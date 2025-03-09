var seconds = (3 * 60); //número de segundos a contar (3 mins)
const audio = new Audio("./sound/20s.mp3");
audio.volume = 0.4;

const music = new Audio("./sound/music.mp3");
var countdownTimer;

const boton = document.getElementById("empezar");
const div = document.getElementById("inicial");

const params = new URLSearchParams(window.location.search);
const videoServer = params.get('videoServer') || '';

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

  sendToRemote();

  setTimeout(() => {
    document.location.reload();
  }, 10000);
}


function sendToRemote() {
  if (!videoServer || !window.poem) {
    console.log('Video server URL not provided or poem not found');
    return;
  }

  try {
    fetch(videoServer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(window.poem)
    })
    .then(response => {
      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Data sent successfully to video server');
    })
    .catch(error => {
      console.error('Error sending data to video server:', error);
    });
  } catch (error) {
    console.error('Failed to send data:', error);
  }
}
