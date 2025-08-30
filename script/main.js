// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// validCoordenate: String -> Bool
// Recibe un string y valida si el mismo es un número o no.
// Revisa primero si el string es vacío y luego si todos los caracteres
// del mismo son dígitos (o un punto, para el caso de flotantes).
// Devuelve verdadero si el input es efectivamente un número entero o flotante,
// falso en caso contrario.
function validCoordenate(input) {
    const digits = "0123456789.";
    const length = input.length;
    const isEmpty = length === 0;
    let isText = false;
    let hasMinus = Number(input[0] === "-");
    for (j = hasMinus ? 1 : 0; j < length; j++) {
        if (!digits.includes(input[j])) {
            isText = true;
            break;
        }
    }

    return !isEmpty && !isText;
}

// askCoordenate: Char -> Number
// Recibe la letra de la coordenada a solicitar y pregunta al usuario
// el número que quiere ingresar para la misma. Devuelve el número.
function askCoordenate(c, n) {
    let coordenate = prompt(`Escriba la coordenada ${c} del punto n°${n}:`);
    if (coordenate === null) return null;
    while (!validCoordenate(coordenate)) {
        alert("Ese no es un número. Intente de nuevo.");
        coordenate = prompt(`Escriba la coordenada ${c} del punto n°${n}:`);
        if (coordenate === null) return null;
    }
    return parseFloat(coordenate);
}

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

// filterHighest: Array Filter -> Array
// Recibe un array y una función filtro y devuelve
// los elementos para los cuales el filtro devuelve el valor más alto
// (array porque puede haber más de uno con el valor más alto, teniendo
// ambos el mismo valor)
function filterHighest(array, filter) {
    const length = array.length;
    let filtered = [array[0]];
    let filteredValue = [filter(array[0])];
    for (k = 0; k < length; k++) {
        if (
            filter(array[k]) == filteredValue[0] &&
            !filtered.includes(array[k])
        ) {
            filtered.push(array[k]);
        } else if (filter(array[k]) > filteredValue[0]) {
            filtered = [array[k]];
            filteredValue = [filter(array[k])];
        }
    }
    return filtered;
}

// quantifyDotArrayToString: ArrayOfDot String String -> String
// Recibe un array de Dot, un texto por si hay más de un Dot y un texto por si hay
// sólo un Dot. Devuelve un string con el texto y los dots correspondientes
function quantifyDotArrayToString(dotArray, singular, plural) {
    if (dotArray.length > 1) {
        const StringList = dotArray
            .map((dot) => {
                return dot.toString();
            })
            .join(", ");
        return plural + StringList;
    } else {
        return singular + dotArray[0].toString();
    }
}

// placeDot: Event -> Void
// recibe el evento de un click, crea un dot con las coordenadas
// de ese click, lo pushea a la lista de dots, y lo dibuja en el plano
function placeDot(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dot = new Dot(x, y);
    dots.push(dot);
    const n = dots.length - 1;
    console.log(`puntos definidos: ${dots}`);
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
    console.log(n);
    console.log(dots[n]);
    if (n > 0) drawLine(dots[n - 1], dots[n]);
    if (n > 1) {
        const dotAngle = vertexAngle(dots[n - 2], dots[n - 1], dots[n]);
        writeAngle(dotAngle, dots[n - 1]);
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
    context.font = "18px Arial";
    context.fillStyle = "blue";
    context.strokeStyle = "";
    context.lineWidth = 2;
    const angleText = `${angle.toFixed(2)}°`;
    const textPosX = vertex.x - 20;
    const textPosY = vertex.y + 25;
    context.fillText(angleText, textPosX, textPosY);
}
// clearPlane: Void -> Void
// no recibe ningún dato, elimina los puntos del canvas y
// vacía el array de dots
function clearPlane() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots = [];
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Ejecución del programa principal

// Variables para almacenamiento de las coordenadas y los puntos
// (FALTA AGREGAR) Interpretación de los polígonos
let dots = [];

// Elementos principales del documento
const startBtn = document.querySelector("#start-btn");
const startText = document.querySelector(".main > p");
const mainContainer = document.querySelector(".main");

startBtn.addEventListener("click", () => {
    startBtn.remove();
    mainContainer.appendChild(canvas);
    mainContainer.appendChild(clearBtn);
});

// Canvas del plano
const canvas = document.createElement("canvas");
canvas.setAttribute("width", 900);
canvas.setAttribute("height", 550);
const context = canvas.getContext("2d");

// Botón para limpiar los puntos del plano
const clearBtn = document.createElement("button");
clearBtn.setAttribute("id", "clear");
clearBtn.innerHTML = "Clear";

canvas.addEventListener("click", placeDot);
clearBtn.addEventListener("click", clearPlane);
