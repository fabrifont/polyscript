// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// Dot: Number Number -> Object
// Función constructora del objeto Dot.
// Se usa para representar un punto en un plano cartesiano
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // toString: (empty) -> String
    // Devuelve las coordenadas del Dot en un string de la forma "(x, y)"
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

// equalDot: Dot Dot -> Bool
// recibe dos puntos y devuelve verdadero si son
// coincidentes, falso en caso contrario
function equalDots(a, b) {
    const equalX = a.x === b.x;
    const equalY = a.y === b.y;
    return equalX && equalY;
}

// drawDot: Dot -> Void
// Recibe un Dot y dibuja el mismo en el canvas
function drawDot(toDraw) {
    context.beginPath();
    context.arc(toDraw.x, toDraw.y, 5, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
}

// placeDot: Event -> Void
// recibe el evento de un click, crea un dot con las coordenadas
// de ese click, lo pushea a la lista de dots, y lo dibuja en el plano.
// Si hay más de 1 punto, dibuja una línea entre el actual y el anterior.
// Si hay más de 2 puntos, calcula y escribe el ángulo que forman el
// último, el penúltimo (vértice), y el antepenúltimo
function placeDot(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dot = new Dot(x, y);
    dots.push(dot);
    const n = dots.length - 1;
    drawDot(dot);
    if (n > 0) drawLine(dots[n - 1], dots[n]);
    if (n > 1) {
        if (
            equalDots(dots[n], dots[n - 1]) ||
            equalDots(dots[n - 1], dots[n - 2])
        )
            writeAngle(0, dots[n - 1]);
        else {
            const dotAngle = vertexAngle(dots[n - 2], dots[n - 1], dots[n]);
            writeAngle(dotAngle, dots[n - 1]);
        }
    }
}

// drawLine: Dot Dot -> Void
// recibe dos objetos Dot y dibuja una línea en el canvas
// que una dichos puntos
function drawLine(dot1, dot2) {
    context.beginPath();
    context.moveTo(dot1.x, dot1.y);
    context.lineTo(dot2.x, dot2.y);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
}

// dist: Dot Dot -> Float
// recibe dos objetos Dot (puntos) y devuelve la distancia
// entre ellos
function dist(d1, d2) {
    const distX = Math.abs(d1.x - d2.x);
    const distY = Math.abs(d1.y - d2.y);
    return Math.sqrt(distX * distX + distY * distY);
}

// cosineTheorem: Float Float Float -> Float
// recibe los 3 lados de un triángulo y devuelve el
// valor en grados del ángulo opuesto al segundo lado,
// calculado usando el Teorema del Coseno
function cosineTheorem(side1, side2, side3) {
    const radToDeg = 180 / Math.PI;
    const numerator = side1 * side1 - side2 * side2 + side3 * side3;
    const denominator = 2 * side1 * side3;
    const radAngle = Math.acos(numerator / denominator);
    return radToDeg * radAngle;
}

// TODO: TERMINAR ESTA FUNCION Y AGREGAR FUNCIONALIDADES DE TERMINAR
// POLIGONO, Y CREAR OTRO (VARIOS), ARRAY DE ARRAYS DOTS
// vertexAngle: Dot Dot Dot -> Float
// recibe tres objetos Dot y calcula el ángulo en grados
// formado por los tres, teniendo el segundo como vértice
function vertexAngle(dot1, dot2, dot3) {
    const dot1_oppSide = dist(dot2, dot3);
    const dot2_oppSide = dist(dot1, dot3);
    const dot3_oppSide = dist(dot1, dot2);
    return cosineTheorem(dot1_oppSide, dot2_oppSide, dot3_oppSide);
}

// writeAngle: Float Dot -> Void
// recibe el valor de un ángulo en grados, y lo dibuja
// un poco debajo del Dot correspondiente
function writeAngle(angle, vertex) {
    context.font = "18px Courier";
    context.fillStyle = "blue";
    context.strokeStyle = "";
    context.lineWidth = 2;
    const textPosX = vertex.x - 30;
    const textPosY = vertex.y + 25;
    const angleText = angle === 0 ? "0°" : `${angle.toFixed(2)}°`;
    context.fillText(angleText, textPosX, textPosY);
}
// clearPlane: Void -> Void
// no recibe ningún dato, elimina los puntos del canvas y
// vacía el array de dots
function clearPlane() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots = [];
}

// saveCanvas: Void -> Void
// No recibe ningún dato, guarda en el local storage el
// estado actual del canvas
function saveCanvas() {
    const state = {
        dotList: dots,
    };
    localStorage.setItem("canvasImage", JSON.stringify(state));
    console.log("Imagen guardada.");
}

// loadCanvas: Void -> Void
// No recibe ningún dato, busca en el local storage
// el iteam "canvasImage" y recrea la imagen correspondiente
// dibujando todos los puntos, líneas y ángulos
function loadCanvas() {
    canvas.width = canvas.width;
    const newState = JSON.parse(localStorage.getItem("canvasImage"));
    dots = newState.dotList;
    const l = dots.length;
    for (let i = 0; i < l; i++) {
        drawDot(dots[i]);
        if (i > 0) drawLine(dots[i - 1], dots[i]);
        if (i > 1) {
            if (
                equalDots(dots[i], dots[i - 1]) ||
                equalDots(dots[i - 1], dots[i - 2])
            )
                writeAngle(0, dots[i - 1]);
            else {
                const dotAngle = vertexAngle(dots[i - 2], dots[i - 1], dots[i]);
                writeAngle(dotAngle, dots[i - 1]);
            }
        }
    }
    console.log("Imagen cargada.");
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Ejecución del programa principal
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 550;

// Variables para almacenamiento de las coordenadas y los puntos
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

// Contenedor de los botones
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

// Asignación de escuchadores de eventos para cada botón
startBtn.addEventListener("click", () => {
    startBtn.remove();
    startText.innerHTML += " Click anywhere to start drawing dots!";
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
