var seconds = 300; //número de segundos a contar
function secondPassed() {

  var minutes = Math.round((seconds - 30)/60); 
  var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) { 
    remainingSeconds = "0" + remainingSeconds; 
  } 
  document.getElementById('tiempo').innerHTML = minutes + ":" +     remainingSeconds; 
  if (seconds == 0) { 
    clearInterval(countdownTimer); 
    alert('Se acabó el tiempo'); 
    document.getElementById('tiempo').innerHTML = "Buzz Buzz"; 
  } else { 
    seconds--; 
  } 
} 

var countdownTimer = setInterval(secondPassed, 1000);