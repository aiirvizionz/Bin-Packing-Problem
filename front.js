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

//Creacion de nuevos contenedores "bin" usando boton
const btnReset = document.querySelector(".btnReset");

btnReset.addEventListener("click", function () {
    // Establecer un valor en el almacenamiento local para indicar que se deben aplicar propiedades
    localStorage.setItem("aplicarPropiedades", "true");
    location.reload();
});

window.addEventListener("load", function () {
    // Verificar si se debe aplicar propiedades según el valor en el almacenamiento local
    const aplicar = localStorage.getItem("aplicarPropiedades");
    if (aplicar === "true") {
        // Código para aplicar propiedades después de la recarga
        infoRules.style.visibility = "hidden";
        checkbox.checked = false;
        // Restablecer el valor en el almacenamiento local
        localStorage.setItem("aplicarPropiedades", "false");
    }
});

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