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
let dots = [[]];

// Flag que indica si el próximo Dot colocado
// creará una nueva figura dentro del canvas
let newFigure = true;
let lastFigure = 0;

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

// PRUEBA
const FIGURAS = [
    [
        new Dot(120, 120),
        new Dot(260, 80),
        new Dot(340, 160),
        new Dot(300, 260),
        new Dot(180, 240),
        new Dot(120, 120),
    ],
    [
        new Dot(400, 60),
        new Dot(560, 80),
        new Dot(620, 180),
        new Dot(540, 260),
        new Dot(380, 220),
        new Dot(400, 60),
    ],
    [
        new Dot(80, 320),
        new Dot(200, 280),
        new Dot(300, 320),
        new Dot(320, 420),
        new Dot(220, 500),
        new Dot(100, 440),
        new Dot(80, 320),
    ],
    [
        new Dot(500, 320),
        new Dot(640, 300),
        new Dot(760, 360),
        new Dot(720, 460),
        new Dot(560, 500),
        new Dot(480, 420),
        new Dot(500, 320),
    ],
    [
        new Dot(650, 80),
        new Dot(780, 120),
        new Dot(840, 220),
        new Dot(780, 320),
        new Dot(660, 300),
        new Dot(620, 200),
        new Dot(650, 80),
    ],
    [
        new Dot(340, 340),
        new Dot(460, 320),
        new Dot(540, 360),
        new Dot(520, 460),
        new Dot(420, 520),
        new Dot(320, 460),
        new Dot(340, 340),
    ],
    [
        new Dot(60, 440),
        new Dot(200, 420),
        new Dot(260, 500),
        new Dot(160, 540),
        new Dot(40, 500),
        new Dot(60, 440),
    ],
    [
        new Dot(480, 160),
        new Dot(560, 100),
        new Dot(660, 140),
        new Dot(700, 220),
        new Dot(640, 300),
        new Dot(520, 280),
        new Dot(480, 160),
    ],
    [
        new Dot(220, 60),
        new Dot(340, 40),
        new Dot(420, 100),
        new Dot(400, 200),
        new Dot(280, 220),
        new Dot(200, 140),
        new Dot(220, 60),
    ],
    [
        new Dot(720, 340),
        new Dot(820, 300),
        new Dot(860, 380),
        new Dot(800, 460),
        new Dot(700, 420),
        new Dot(680, 360),
        new Dot(720, 340),
    ],
];
