function printDiv(div) {
    var contenido= document.getElementById(div).innerHTML;
    document.body.innerHTML = contenido;
    var x = document.getElementById("final");
    window.print();

   
}