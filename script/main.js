// Agregar lógica que pida coordenadas de puntos y muestre un
// mensaje con el nombre del polígono que creaste según los puntos que ingresaste
// (punto, línea, triángulo, cuadrilátero, pentágono, hexágono, heptágono)

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Ejecución del programa principal

// Medidas del canvas
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 550;

// Constantes para ubicar el texto de los ángulos
const ANGLE_DELTA_X = -30;
const ANGLE_DELTA_Y = 25;

// Array para almacenamiento de los Dots
let dots = [[]];

// Flag que indica si el próximo Dot colocado
// creará una nueva figura dentro del canvas
let newFigure = true;
// Contador de figuras dibujadas en el canvas
let lastFigure = 0;
let lastFigureDotCounter = 0;
const defaultDot = new Dot(0, 0);
// Primer Dot de la figura actual
let firstDot;
const minimumDistance = 10;

let examplesData = null;
let choicesDropdown = null;

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
    const dropdown = document.createElement("select");
    dropdown.setAttribute("id", "examplesSelect");
    dropdown.innerHTML = `<option value="">Select an example…</option>`;
    btnContainer.appendChild(dropdown);

    choicesDropdown = new Choices(dropdown, {
        searchEnabled: false,
        itemSelectText: "",
        shouldSort: false,
    });

    fetch("./script/examples.json")
        .then((res) => res.json())
        .then((data) => {
            examplesData = data;

            const choices = data.figures.map((fig, idx) => ({
                value: String(idx),
                label: fig.name || `Figure ${idx + 1}`,
            }));

            choicesDropdown.setChoices(choices, "value", "label", true);
        })
        .catch((err) => {
            console.error("JSON loading error:", err);
            toastError("JSON loading error: (check file route and name).");
        });
    const loadExampleBtn = document.createElement("button");
    loadExampleBtn.setAttribute("id", "loadExampleBtn");
    loadExampleBtn.textContent = "Load Example";
    btnContainer.appendChild(loadExampleBtn);

    loadExampleBtn.addEventListener("click", () => {
        try {
            if (!examplesData || !examplesData.figures?.length) {
                toastError("No loaded examples.");
                return;
            }

            const selected = choicesDropdown.getValue(true); // devuelve el value (índice en string)
            if (selected === "" || selected == null) {
                toastError("Select an example first.");
                return;
            }

            const fig = examplesData.figures[Number(selected)];
            if (!fig || !Array.isArray(fig.dots) || fig.dots.length === 0) {
                toastError("Invalid example.");
                return;
            }

            clearPlane();
            fig.dots
                .map((d) => new Dot(d.x, d.y))
                .forEach((p) => onCanvasClick({ offsetX: p.x, offsetY: p.y }));

            toastNotif(
                `Loaded example: ${
                    fig.name || `Figure ${Number(selected) + 1}`
                }`
            );
        } catch (error) {
            toastError(error);
            console.error(error);
        }
    });
});

canvas.addEventListener("click", (event) => {
    try {
        onCanvasClick(event);
    } catch (error) {
        toastError(error);
        console.error(error);
    }
});
clearBtn.addEventListener("click", () => {
    try {
        clearPlane();
        toastNotif("Cleared canvas.");
    } catch (error) {
        toastError(error);
        console.error(error);
    }
});
saveBtn.addEventListener("click", () => {
    try {
        saveCanvas();
        toastNotif("Saved canvas.");
    } catch (error) {
        toastError(error);
        console.error(error);
    }
});
loadBtn.addEventListener("click", () => {
    try {
        loadCanvas();
        toastNotif("Loaded canvas.");
    } catch (error) {
        toastError(error);
        console.error(error);
    }
});
