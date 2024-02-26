var seconds = 300; //número de segundos a contar
const audio = new Audio("sound/10s.mp3");
var countdownTimer;

//document.oncontextmenu = function(){return false}

const boton = document.getElementById("empezar");
const div = document.getElementById("inicial");

boton.addEventListener("click", function(){
  div.classList.add("ocultar");
  countdownTimer = setInterval(secondPassed, 1000);
});

function secondPassed() {
  document.getElementById("inicial").style.display = "none";
  var minutes = Math.round((seconds - 30)/60); 
  var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) { 
    remainingSeconds = "0" + remainingSeconds; 
  } 
  document.getElementById('tiempo').innerHTML = minutes + ":" +     remainingSeconds; 
  if (seconds == 0) { 
    clearInterval(countdownTimer);
    printDiv('Poema');
  } else { 
    seconds--; 
    if (seconds==10){
      audio.play();
    }
  } 
} 
