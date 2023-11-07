// Checkbox para mostrar pantalla informativa sobre el juego
const checkbox = document.getElementById("cb-menu")
const infoRules = document.getElementById("intro");
const divCbMenu = document.getElementById("div-menu-exit")
// const nav = document.getElementsByClassName("menu")

checkbox.addEventListener("change", function () {
    if (this.checked) {
        infoRules.style.visibility = "visible";
    }
    else {
        infoRules.style.visibility = "hidden";
    }
})


//Carrusel de imagenes de instrucciones del juego

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}