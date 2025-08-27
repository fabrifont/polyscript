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

// ------------------------------------------------------------------------------

// Ejecución del programa principal

// Flag para frenar el while cuando no se quieran ingresar más puntos
let continueProgram = true;

// Flag para iniciar o no el programa
const start = confirm(startMessage);

// Mensajes de bienvenida y despedida a la app
const startMessage =
    "Bienvenido a PolyScript. ¿Estás listo para comenzar?\n\n(presione Cancelar en cualquier momento para finalizar)";
const exitMessage = "¡Gracias por visitarnos!";

// Variables para almacenamiento de las coordenadas y los puntos
// (FALTA AGREGAR) Interpretación de los polígonos
let x;
let y;
let dots = [];

// Variables para mostrar información acerca de lo que se ingresó
let dotsStrings = [];
let dotsList = "";

if (!start) {
    alert(exitMessage);
} else {
    // CÓDIGO A EJECUTAR
}
