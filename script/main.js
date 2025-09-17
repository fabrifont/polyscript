// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Ejecución del programa principal

// Medidas del canvas
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 550;

// Array para almacenamiento de los Dots
let dots = [];

// Elementos principales del documento
const startBtn = document.querySelector("#start-btn");
const startText = document.querySelector(".main p");
const mainContainer = document.querySelector(".main");

// Canvas del plano
const canvas = document.createElement("canvas");
canvas.setAttribute("width", CANVAS_WIDTH);
canvas.setAttribute("height", CANVAS_HEIGHT);
const context = canvas.getContext("2d");

// Contenedores de los botones
const btnContainer = document.createElement("div");
btnContainer.setAttribute("id", "btnContainer");
const stateBtns = document.createElement("div");
stateBtns.setAttribute("id", "stateBtns");

// Botón para limpiar los puntos del plano
const clearBtn = document.createElement("button");
clearBtn.setAttribute("id", "clear");
clearBtn.innerHTML = "Clear";

// Botones para guardar y cargar una imagen desde
// el almacenamiento local
const saveBtn = document.createElement("button");
saveBtn.setAttribute("id", "saveBtn");
saveBtn.innerHTML = "Save";
const loadBtn = document.createElement("button");
loadBtn.setAttribute("id", "loadBtn");
loadBtn.innerHTML = "Load";

// Asignación de escuchadores de eventos para cada elemento
startBtn.addEventListener("click", () => {
    startBtn.remove();
    startText.innerHTML += " Click anywhere to start placing dots!";
    mainContainer.appendChild(canvas);
    mainContainer.appendChild(btnContainer);
    btnContainer.appendChild(clearBtn);
    btnContainer.appendChild(stateBtns);
    stateBtns.appendChild(saveBtn);
    stateBtns.appendChild(loadBtn);
});
canvas.addEventListener("click", placeDot);
clearBtn.addEventListener("click", clearPlane);
saveBtn.addEventListener("click", saveCanvas);
loadBtn.addEventListener("click", loadCanvas);
