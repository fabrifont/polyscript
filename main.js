// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// Mensajes de bienvenida y despedida a la app
const startMessage = "Bienvenido a PolyScript. ¿Estás listo para comenzar?";
const exitMessage = "¡Gracias por visitarnos!";

// (FALTA AGREGAR) flag para frenar el while cuando no se quieran ingresar más puntos
let continueProgram = true;
// flag para iniciar o no el programa
const start = confirm(startMessage);

// AGREGAR: función que maneje la validación del tipo de dato ingresado
// en el prompt, así no queda todo manejado repetidamente en askCoordenate()
// askCoordenate: Char -> Number
// Recibe la letra de la coordenada a solicitar y pregunta al usuario
// el número que quiere ingresar para la misma. Devuelve el número.
function askCoordenate(c) {
    let coordenate = prompt(`Escriba la coordenada ${c} del punto:`);
    if (coordenate === null) return null;

    let isEmpty = coordenate.length === 0;
    let isText = typeof Number(coordenate) != "number";

    while (isText || isEmpty) {
        alert("Ese no es un número. Intente de nuevo.");

        coordenate = prompt(`Escriba la coordenada ${c} del punto:`);
        if (coordenate === null) return null;
        isEmpty = coordenate.length === 0;
        isText = typeof Number(coordenate) != "number";
    }
    coordenate = Number(coordenate);

    return coordenate;
}

// (FALTA AGREGAR) Variables para manejo del ingreso de datos de puntos.
// Buscar si se puede decidir si declarar las variables o no en función
// de si el usuario decide iniciar el programa.
let x;
let y;
let dots = [];

// ------------------------------------------------------------------------------

// Ejecución del programa principal
if (!start) {
    alert(exitMessage);
} else {
    while (continueProgram) {
        x = askCoordenate("X");
        if (x == null) break;
        y = askCoordenate("Y");
        if (y == null) break;
    }
    alert(exitMessage);
}
