// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// Mensajes de bienvenida y despedida a la app
const startMessage = "Bienvenido a PolyScript. ¿Estás listo para comenzar?";
const exitMessage = "¡Gracias por visitarnos!";

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
    for (j = 0; j < length; j++) {
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
function Dot(x, y) {
    this.x = x;
    this.y = y;
}

// ------------------------------------------------------------------------------

// Ejecución del programa principal

// Flag para frenar el while cuando no se quieran ingresar más puntos
let continueProgram = true;

// Flag para iniciar o no el programa
const start = confirm(startMessage);

// Variables para almacenamiento de las coordenadas y los puntos
// (FALTA AGREGAR) Procesamiento de los puntos e interpretación de los polígonos
let x;
let y;
let dots = [];

// Variables para mostrar información acerca de lo que se ingresó
let dotsStrings = [];
let dotsList = "";

if (!start) {
    alert(exitMessage);
} else {
    for (i = 1; continueProgram; i++) {
        x = askCoordenate("X", i);
        if (x === null) {
            continueProgram = false;
            break;
        }
        y = askCoordenate("Y", i);
        if (y === null) {
            continueProgram = false;
            break;
        }
        dots.push(new Dot(x, y));
        dotsStrings.push(`(${dots[i - 1].x},${dots[i - 1].y})`);
    }
    dotsList = dotsStrings.join(", ");
    alert(`Usted estableció los siguientes puntos:\n${dotsList}`);
    alert(exitMessage);
}
