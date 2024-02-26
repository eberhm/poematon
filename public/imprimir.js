function printDiv(div) {
    var contenido= document.getElementById(div).innerHTML;
    document.body.innerHTML = contenido;
    document.getElementById("final").style.display = "block"
    window.print();

    setTimeout(() => {
        document.location.reload();
      }, 5000);
}