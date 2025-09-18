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

// Angle: Dot Dot Dot -> Object
// Función constructora del objeto Angle.
// Se usa para representar el ángulo que forma un punto en relación
// a otros dos. En particular, el punto considerado vértice es
// el segundo parámetro, el de en medio.
class Angle {
    constructor(previousDot, vertexDot, nextDot) {
        this.value = vertexAngle(previousDot, vertexDot, nextDot);
        this.vertex = vertexDot;
    }
    draw() {
        context.font = "18px Courier";
        context.fillStyle = "blue";
        context.strokeStyle = "";
        context.lineWidth = 2;
        const textPosX = this.vertex.x + ANGLE_DELTA_X;
        const textPosY = this.vertex.y + ANGLE_DELTA_Y;
        const angleText = this.value === 0 ? "0°" : `${this.value.toFixed(2)}°`;
        context.fillText(angleText, textPosX, textPosY);
    }
}

// equalDot: Dot Dot -> Bool
// Recibe dos puntos y devuelve verdadero si son
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

// drawLine: Dot Dot -> Void
// Recibe dos objetos Dot y dibuja una línea en el canvas
// que una dichos puntos
function drawLine(dot1, dot2) {
    context.beginPath();
    context.moveTo(dot1.x, dot1.y);
    context.lineTo(dot2.x, dot2.y);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
}

// drawDotAndAngle: Number -> Void
// Recibe un número entero k y, para el k-ésimo punto,
// lo dibuja y a su respectivo ángulo con su valor correspondiente
function drawDotAndAngle(dotNumber) {
    drawDot(dots[lastFigure][dotNumber]);
    // Dibujado de línea
    if (dotNumber > 0)
        drawLine(dots[lastFigure][dotNumber - 1], dots[lastFigure][dotNumber]);
    // Dibujado de ángulo
    if (dotNumber > 1) {
        const dotAngle = new Angle(
            dots[lastFigure][dotNumber - 2],
            dots[lastFigure][dotNumber - 1],
            dots[lastFigure][dotNumber]
        );
        // Ángulo 0 para puntos coincidentes
        if (
            equalDots(
                dots[lastFigure][dotNumber],
                dots[lastFigure][dotNumber - 1]
            ) ||
            equalDots(
                dots[lastFigure][dotNumber - 1],
                dots[lastFigure][dotNumber - 2]
            )
        ) {
            dotAngle.value = 0;
        }
        // Ángulo menor a 180° acorde (convexo)
        dotAngle.draw();
    }
}

// closeFigure: Void -> Void
// No recibe argumentos. Cierra la última figura y comienza una nueva
function closeFigure() {
    dots[lastFigure].push(firstDot);
    drawLine(dots[lastFigure][lastFigureDotCounter - 1], firstDot);
    context.closePath();
    let secondToLastAngle;
    let lastAngle;
    if (lastFigureDotCounter < 2) {
        secondToLastAngle = new Angle(
            dots[lastFigure][lastFigureDotCounter - 1],
            dots[lastFigure][lastFigureDotCounter - 1],
            dots[lastFigure][lastFigureDotCounter - 1]
        );
        lastAngle = new Angle(
            dots[lastFigure][lastFigureDotCounter],
            dots[lastFigure][lastFigureDotCounter],
            dots[lastFigure][lastFigureDotCounter]
        );
        secondToLastAngle.value = 0;
        lastAngle.value = 0;
    } else {
        secondToLastAngle = new Angle(
            dots[lastFigure][lastFigureDotCounter - 2],
            dots[lastFigure][lastFigureDotCounter - 1],
            dots[lastFigure][lastFigureDotCounter]
        );
        lastAngle = new Angle(
            dots[lastFigure][lastFigureDotCounter - 1],
            dots[lastFigure][lastFigureDotCounter],
            dots[lastFigure][1]
        );
    }
    secondToLastAngle.draw();
    lastAngle.draw();
    lastFigure++;
    dots.push([]);
}

// onCanvasClick: Event -> Void
// Recibe el evento de un click, crea un dot con las coordenadas
// de ese click, lo pushea a la lista de dots, y lo dibuja en el plano.
// Si hay más de 1 punto, dibuja una línea entre el actual y el anterior.
// Si hay más de 2 puntos, calcula y escribe el ángulo que forman el
// último, el penúltimo (vértice), y el antepenúltimo
function onCanvasClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const dot = new Dot(x, y);
    const isFirst = dots[lastFigure].length === 0;
    lastFigureDotCounter = dots[lastFigure].length;
    let closed = false;
    if (isFirst) {
        firstDot = dot;
    }
    // Caso 1: el nuevo punto está cerca del primero
    else if (dist(dot, firstDot) < minimumDistance) {
        closeFigure();
        closed = true;
    }
    // Caso 2: el nuevo punto no está cerca del primero
    if (!closed) {
        dots[lastFigure].push(dot);
        drawDotAndAngle(lastFigureDotCounter);
    }
}

// dist: Dot Dot -> Float
// Recibe dos objetos Dot (puntos) y devuelve la distancia
// entre ellos
function dist(d1, d2) {
    const distX = Math.abs(d1.x - d2.x);
    const distY = Math.abs(d1.y - d2.y);
    return Math.sqrt(distX * distX + distY * distY);
}

// cosineTheorem: Float Float Float -> Float
// Recibe los 3 lados de un triángulo y devuelve el
// valor en grados del ángulo opuesto al segundo lado,
// calculado usando el Teorema del Coseno
function cosineTheorem(side1, side2, side3) {
    const radToDeg = 180 / Math.PI;
    const numerator = side1 * side1 - side2 * side2 + side3 * side3;
    const denominator = 2 * side1 * side3;
    const radAngle = Math.acos(numerator / denominator);
    return radToDeg * radAngle;
}

// vertexAngle: Dot Dot Dot -> Float
// Recibe tres objetos Dot y calcula el ángulo en grados
// formado por los tres, teniendo el segundo como vértice
function vertexAngle(dot1, dot2, dot3) {
    const dot1_oppSide = dist(dot2, dot3);
    const dot2_oppSide = dist(dot1, dot3);
    const dot3_oppSide = dist(dot1, dot2);
    return cosineTheorem(dot1_oppSide, dot2_oppSide, dot3_oppSide);
}

// clearPlane: Void -> Void
// No recibe ningún dato, elimina los puntos del canvas y
// vacía el array de dots
function clearPlane() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots = [[]];
    lastFigure = 0;
    toastNotif("Cleared canvas");
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
    toastNotif("Saved canvas");
}

// loadCanvas: Void -> Void
// No recibe ningún dato, busca en el local storage
// el item "canvasImage" y recrea la imagen correspondiente
// dibujando todos los puntos, líneas y ángulos
// TODO: FALTA CAMBIAR QUE EL ÚLTIMO PUNTO DE LA FIGURA NO LO CARGUE, !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Y QUE CARGUE LA LÍNEA ENTRE EL PENÚLTIMO Y EL PRIMERO (como hace onCanvasClick) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function loadCanvas() {
    canvas.width = canvas.width;
    const newState = JSON.parse(localStorage.getItem("canvasImage"));
    dots = newState === null ? [[]] : newState.dotList;
    const figureCount = dots.length;
    // Por figura
    for (let j = 0; j < figureCount; j++) {
        const dotCount = dots[j].length;
        // Por punto
        for (let i = 0; i < dotCount; i++) {
            drawDot(dots[j][i]);
            if (i > 0) drawLine(dots[j][i - 1], dots[j][i]);
            if (i > 1) {
                if (
                    equalDots(dots[j][i], dots[j][i - 1]) ||
                    equalDots(dots[j][i - 1], dots[j][i - 2])
                )
                    writeAngle(0, dots[j][i - 1]);
                else {
                    const dotAngle = vertexAngle(
                        dots[j][i - 2],
                        dots[j][i - 1],
                        dots[j][i]
                    );
                    writeAngle(dotAngle, dots[j][i - 1]);
                }
            }
        }
    }
    toastNotif("Loaded canvas");
}

// toastNotif: String -> Void
// Recibe un string con el texto que se necesita mostrar
// en la notificación de Toastify. Mantiene el mismo estilo
// para todas las notificaciones
function toastNotif(text) {
    Toastify({
        text: text,
        gravity: "bottom",
        position: "right",
        escapeMarkup: "true",
        style: {
            color: "white",
            background:
                "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
            border: "none",
            "box-shadow": "10px 10px 20px 0px rgba(0,0,0,0.38)",
        },
    }).showToast();
}
