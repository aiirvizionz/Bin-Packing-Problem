//Listas para valores de colores y alturas de las figuras

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'cian', 'gray'];



//Listas de los datos asignados a cada figura

const heights = [];
const colorsAssigned = [];



//Logica para la creacion de contenedores y figuras arrastrables que el jugador eligio

const inputFigures = document.getElementById("inputFigures");
const btnFigures = document.getElementById("btnFigures");
const binToAdd = document.querySelector('.carga');
const containerBins = document.querySelector(".containerBins");


btnFigures.addEventListener("click", function () {

    if (isNaN(inputFigures.value) || inputFigures.value <= 0) {
        alertsDiv.style.visibility = "visible";
        alertMsg.textContent = "Ingrese un número válido mayor que cero.";
    } else {
        binToAdd.innerHTML = '';
        for (let i = 1; i <= inputFigures.value; i++) {
            const randomColor = Math.floor((Math.random() * colors.length) + 1);
            const randomHeight = Math.floor(Math.random() * 300);

            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'figure');
            newDiv.setAttribute('draggable', 'true');
            newDiv.setAttribute('ondragstart', 'onDragStart(event);');
            newDiv.setAttribute('id', 'draggable-' + i);
            newDiv.style.backgroundColor = colors[randomColor];
            newDiv.style.height = randomHeight + 'px';
            newDiv.textContent = randomHeight;


            binToAdd.appendChild(newDiv);

            heights.push(randomHeight);
            colorsAssigned.push(randomColor);

            const figuresCreated = binToAdd.childElementCount;
            figuresCreatedInfo.textContent = 'N° paquetes: ' + figuresCreated;
        }
    }

    if (binToAdd.childElementCount > 0) {
        btnFigures.disabled = true;
        btnFigures.style.cursor = 'not-allowed';
        inputBins.disabled = false;
        inputFigures.disabled = true;
    }

    //console.log(colorsAssigned);
    console.log(heights);

});

var bins = [];
const inputBins = document.getElementById("inputBins");
const btnBins = document.getElementById("btnBins");

btnBins.addEventListener("click", function () {

    if (isNaN(inputBins.value) || inputBins.value <= 0) {
        alertsDiv.style.visibility = "visible";
        alertMsg.textContent = "Ingrese un número válido mayor que cero.";
    }

    if (cash >= 10 && inputBins.value <= 10) {
        for (let i = 0; i < inputBins.value; i++) {
            const newBin = document.createElement('div');
            newBin.setAttribute('class', 'bin');
            newBin.setAttribute('ondragover', 'onDragOver(event);');
            newBin.setAttribute('ondrop', 'onDrop(event);');
            newBin.setAttribute('id', 'bin');

            containerBins.appendChild(newBin);

            cash = cash - 10;
            cashInfo.textContent = '$ disponible: $' + cash;

            const binsCreated = containerBins.childElementCount;
            binsInfo.textContent = 'N° contenedores: ' + binsCreated;

            bins.push(newBin);
        }
    }
    else {
        alertsDiv.style.visibility = "visible";
        alertMsg.textContent = "Excede el limite de dinero disponible.";
    }

    if (containerBins.childElementCount > 1) {
        btnBins.disabled = true;
        btnBins.style.cursor = 'not-allowed';
        inputBins.disabled = true;
        btnExtraBin.disabled = false;
        btnExtraBin.style.cursor = 'pointer';
    }

});

//Informacion del juego
const divInfoGame = document.querySelector(".info-game");
const figuresCreatedInfo = document.getElementById("figures-created-info");
const figuresInfo = document.getElementById("figures-dropped-info");
const cashInfo = document.getElementById("cash-info");

var cash = 100;

const binsInfo = document.getElementById("used-containers-info");
figuresCreatedInfo.textContent = 'N° paquetes: ';
cashInfo.textContent = '$ disponible: $' + cash + ' (cada contenedor cuesta $10)'
figuresInfo.textContent = 'Capacidad por contenedor: 500';
binsInfo.textContent = 'N° contenedores: ';


// Boton para agregar contenedor extra (A DOBLE DE PRECIO)
const btnExtraBin = document.querySelector('.btnExtraBin')

btnExtraBin.disabled = true;
btnExtraBin.style.cursor = 'not-allowed';

btnExtraBin.addEventListener('click', function () {
    if (cash >= 20) {
        const newBin = document.createElement('div');
        newBin.setAttribute('class', 'bin');
        newBin.setAttribute('ondragover', 'onDragOver(event);');
        newBin.setAttribute('ondrop', 'onDrop(event);');
        newBin.setAttribute('id', 'bin');

        containerBins.appendChild(newBin);

        cash = cash - 20;
        cashInfo.textContent = '$ disponible: $' + cash;

        const binsCreated = containerBins.childElementCount;
        binsInfo.textContent = 'N° contenedores: ' + binsCreated;

        bins.push(newBin);
    }
    else {
        alertsDiv.style.visibility = "visible";
        alertMsg.textContent = "Excede el limite de dinero disponible.";
    }
});


//Funcion que cambia atributos de CCS cuando se arrastra un elemento
function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
    event
        .currentTarget
        .style
        .opacity = '0.7';
    event
        .currentTarget
        .style
        .border = 'none';
}

function onDragOver(event) {
    event.preventDefault();
}

let limiteBin = 500;
const containers = document.querySelectorAll('.bin');


function onDrop(event) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    const currentContainer = dropzone.closest('.bin');
    const currentBinLimit = limiteBin;

    const figuresInsideBin = currentContainer.querySelectorAll('.figure');
    let currentBinUsedSpace = 0;

    figuresInsideBin.forEach((figure) => {
        currentBinUsedSpace += parseInt(figure.textContent, 10);
    });

    if (currentBinUsedSpace + parseInt(draggableElement.textContent, 10) <= currentBinLimit) {
        dropzone.appendChild(draggableElement);
        event.dataTransfer.clearData();
    } else {
        alertsDiv.style.visibility = "visible";
        alertMsg.textContent = "Excede el límite de espacio en el contenedor.";
    }
}

//Permitir cambiar el orden de los productos dentro del contenedor
const carga = document.querySelector('.carga');
let draggedElement = null;

carga.addEventListener('dragstart', (event) => {
    draggedElement = event.target;
});

carga.addEventListener('dragover', (event) => {
    event.preventDefault();
});

carga.addEventListener('drop', handleDrop);

function handleDrop(event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('figure')) {
        carga.insertBefore(draggedElement, target);
    } else {
        carga.appendChild(draggedElement);
    }
}


function allowDrop(event) {
    event.preventDefault();
}

// Restaura la capacidad total del contenedor cuando todas las figuras se eliminan
containers.forEach((container) => {
    container.addEventListener('DOMNodeRemoved', () => {
        limiteBin = 500;
    });
});

//Alertas de juego
const alertsDiv = document.getElementById("alertsDiv");
const alertMsg = document.getElementById("alertMsg");
const btnAlertAccept = document.getElementById("btnAlertAccept");

btnAlertAccept.addEventListener("click", function () {
    alertsDiv.style.visibility = "hidden";
});


// Quicksort para ordenar las figuras de mayor a menor
function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // Elegir un pivote (puede ser el primer elemento)
    const pivot = arr[0];

    // Dividir el array en dos sub-arrays: elementos menores que el pivote y elementos mayores que el pivote
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursivamente ordenar los sub-arrays
    return quicksort(left).concat(pivot, quicksort(right));
}


let emptyBinsCount = 0;

function eliminarContenedoresVacios(bins) {
    let emptyBinsCount = 0;
    const binsToRemove = [];

    // Encuentra y marca los contenedores vacíos para eliminarlos
    bins.forEach((bin, index) => {
        if (bin.childElementCount === 0) {
            emptyBinsCount++;
            binsToRemove.push(index);
        }
    });

    // Elimina los contenedores vacíos comenzando desde el final para evitar problemas con los índices
    for (let i = binsToRemove.length - 1; i >= 0; i--) {
        const indexToRemove = binsToRemove[i];
        containerBins.removeChild(bins[indexToRemove]);
        bins.splice(indexToRemove, 1);
    }

    return emptyBinsCount;
}


// Boton para la funcion de solucion
const btnSolution = document.querySelector('.btnSolution');

btnSolution.addEventListener('click', function () {
    const sortedArray = quicksort(heights);
    console.log(sortedArray);

    // Ordenar las figuras de mayor a menor dentro del div de carga
    const figures = document.querySelectorAll('.figure');
    const figuresArray = Array.from(figures);

    figuresArray.sort(function (a, b) {
        return b.textContent - a.textContent;
    });

    figuresArray.forEach((figure) => {
        carga.appendChild(figure);
    });

    // Asignar las figuras en orden de mayor a menor dentro de los contenedores que tengan espacio suficiente para cada una

    // Limpiar los contenedores y devolver las figuras dentro de los contenedores a la seccion de carga
    bins.forEach((bin) => {
        bin.innerHTML = '';
    });


    // Asignar las figuras a los contenedores en orden de primero a último
    let currentBinIndex = 0;
    figuresArray.forEach((figure) => {
        while (currentBinIndex < bins.length) {
            const bin = bins[currentBinIndex];
            const figuresInsideBin = bin.querySelectorAll('.figure');
            let currentBinUsedSpace = 0;

            figuresInsideBin.forEach((figure) => {
                currentBinUsedSpace += parseInt(figure.textContent, 10);
            });

            if (currentBinUsedSpace + parseInt(figure.textContent, 10) <= limiteBin) {
                bin.appendChild(figure);
                break;
            }
            currentBinIndex++;
        }
    });
    
    // Eliminar los contenedores vacíos al momento de acomodar las figuras
    const emptyBinsRemoved = eliminarContenedoresVacios(bins);

    // Mostrar mensaje de alerta final con el contador de contenedores vacíos eliminados
    alertsDiv.style.visibility = "visible";
    alertMsg.textContent = `Se aplicó la mejor solución. Se eliminaron ${emptyBinsRemoved} contenedor(es) vacío(s).`;

    btnExtraBin.disabled = true;
    btnExtraBin.style.cursor = 'not-allowed';
});
