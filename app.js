//Funcion que cambia atributos de CCS cuando se arrastra un elemento
function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
    event
        .currentTarget
        .style
        .opacity = '0.7';
    /* event
     .currentTarget
     .style
     .scale= '1.5'; */
}

function onDragOver(event) {
    event.preventDefault();
}


function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    let currentDivIndex = 0; // Índice del div actual que se debe mostrar

    const binToAdd = document.querySelector('.carga');
    const containers = binToAdd.querySelectorAll('.containerToAdd');
    const draggableElement = document.getElementById(id);

    const dropzone = event.target;

    if (draggableElement && containers[currentDivIndex]) {
        // Eliminar el contenedor actual
        containers[currentDivIndex].remove();

        currentDivIndex++;
        figuresInfoDropped++;

        if (currentDivIndex < containers.length) {
            binToAdd.appendChild(containers[currentDivIndex]);
        }
    }

    dropzone.appendChild(draggableElement);

    event
        .dataTransfer
        .clearData();
}



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
/*
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
*/

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

//Listas para valores de colores y alturas de las figuras
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'cian', 'gray', 'white'];

//Listas de los datos asignados a cada figura
const heights = [];
const colorsAssigned = [];

//Logica para la creacion de figuras con colores y alturas aleatorias


console.log("La cantidad de colores son: " + colors.length);
console.log(heights);


//Logica para la creacion de contenedores y figuras arrastrables que el jugador eligio
const figures = 20//prompt("Ingrese el número de contenedores que desea acomodar: ");
const sizeFigures = parseInt(figures, 10);

if (isNaN(sizeFigures) || sizeFigures <= 0) {
    alert("Ingrese un número válido mayor que cero.");
} else {
    const binToAdd = document.querySelector('.carga');

    for (let i = 1; i <= sizeFigures; i++) {
        /*const newContainer = document.createElement('div');
        newContainer.setAttribute('class', 'containerToAdd');

        binToAdd.appendChild(newContainer);

        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'figure');
        newDiv.setAttribute('draggable', 'true');
        newDiv.setAttribute('ondragstart', 'onDragStart(event);');
        newDiv.setAttribute('id', 'draggable-' + i);
        /*newDiv.textContent = 'Arrastrable ' + i; */

        /* newContainer.appendChild(newDiv);
        console.log(newDiv);  */

        const randomColor = Math.floor(Math.random() * colors.length);
        const randomHeight = Math.floor(Math.random() * 300);

        console.log(randomColor);
        console.log(randomHeight);

        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'figure');
        newDiv.setAttribute('draggable', 'true');
        newDiv.setAttribute('ondragstart', 'onDragStart(event);');
        newDiv.setAttribute('id', 'draggable-' + i);
        newDiv.style.backgroundColor = colors[randomColor];
        newDiv.style.height = randomHeight + 'px';
        newDiv.textContent = randomHeight;

        const binToAdd = document.querySelector('.carga');
        const newContainer = document.createElement('div');
        newContainer.setAttribute('class', 'containerToAdd');

        binToAdd.appendChild(newContainer);
        newContainer.appendChild(newDiv);


        heights.push(randomHeight);
        colorsAssigned.push(randomColor);
    }
}

console.log(heights);
console.log(colorsAssigned);

//Informacion del juego
const divInfoGame = document.querySelector(".info-game");
const figuresCreatedInfo = document.getElementById("figures-created-info");
const figuresInfo = document.getElementById("figures-dropped-info");
const cashInfo = document.getElementById("cash-info");

var figuresInfoDropped = 0;
var cash = 100;

const binsInfo = document.getElementById("used-containers-info");
figuresCreatedInfo.textContent = 'Cantidad de figuras creadas: ' + sizeFigures;
cashInfo.textContent = 'Dinero disponible: $' + cash;
//figuresInfo.textContent = 'Cantidad de figuras acomodadas: ' + figuresInfoDropped;
//binsInfo.textContent = 'Cantidad de contenedores usados: '; 


//Creacion de nuevos contenedores "bin" usando boton
const btnAddBin = document.querySelector(".btnAddBin");
const containerBins = document.querySelector(".binChildToReceive");
var indexBins = 1;


console.log(btnAddBin);

btnAddBin.addEventListener("click", function () {

    if (indexBins > 5) {
        alert("No se pueden agregar más contenedores.");
        return;
    } else {
        const newBin = document.createElement('div');
        newBin.setAttribute('class', 'bin');
        newBin.setAttribute('ondragover', 'onDragOver(event);');
        newBin.setAttribute('ondrop', 'onDrop(event);');

        containerBins.appendChild(newBin);

        console.log(newBin);
        indexBins++;
        cash = cash - 10;
        cashInfo.textContent = 'Dinero disponible: $' + cash;

    }
});