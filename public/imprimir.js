function printDiv(div) {

  //document.getElementById("final").style.display = "block";
    /*var contenido= document.getElementById(div).innerHTML;
    document.body.innerHTML = contenido;*/
    window.print();
    document.getElementById("final").style.display = "block";

    setTimeout(() => {
        document.location.reload();
      }, 10000);
}