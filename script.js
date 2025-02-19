const defaultGridSettings = 16;
const defaultColor = "#000000";

let currentColor;

const container = document.querySelector(".container");
const gridRange = document.querySelector("#grid-range");
const gridValue = document.querySelector("#gridValue");
const colorPicker = document.querySelector("#colorPicker");

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    const defaultRadio = document.querySelector(
        'input[name="drawing-mode"][value="normal"]'
    );

    if (defaultRadio) {
        defaultRadio.checked = true;
    }

    const defaultOption = document.querySelector(
        'input[name="drawing-mode"]:checked'
    );

    colorPicker.value = defaultColor;

    createGrid(defaultGridSettings);
    addHoverEffect(defaultOption.value, colorPicker.value);

    gridRange.addEventListener("input", () => {
        createGrid(gridRange.value, colorPicker.value);
    });

    colorPicker.addEventListener("input", () => {
        const selectedOption = document.querySelector(
            'input[name="drawing-mode"]:checked'
        );

        addHoverEffect(selectedOption.value, colorPicker.value);
    });

    document.querySelectorAll('input[name="drawing-mode"]').forEach((radio) => {
        radio.addEventListener("input", () => {
            const selectedOption = document.querySelector(
                'input[name="drawing-mode"]:checked'
            );

            addHoverEffect(selectedOption.value, colorPicker.value);
        });
    });
});

function createGrid(gridSize) {
    const fragmentDivs = document.createDocumentFragment();

    gridRange.value = `${gridSize}`;
    gridValue.textContent = `${gridRange.value} x ${gridRange.value}`;

    container.innerHTML = "";

    container.style.border = "1px solid black";
    const fixedWidth = 700; // px
    let boxSize = fixedWidth / gridSize;

    let containerWidth = fixedWidth + 2;
    container.style.width = `${containerWidth}px`;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const div = document.createElement("div");
            div.className = `div-${i}-${j}`;
            div.style.height = `${boxSize}px`;
            div.style.width = `${boxSize}px`;
            div.style.border = "1px solid lightgray";
            div.style.backgroundColor = "white";

            fragmentDivs.appendChild(div);
        }
    }

    container.appendChild(fragmentDivs);
}

let currentHoverEffect = null;

function addHoverEffect(mode, color) {
    if (currentHoverEffect) {
        container.removeEventListener("mouseenter", currentHoverEffect, {
            capture: true,
        });
    }

    function rgbToHex(r, g, b) {
        return `#${r.toString(16).padStart(2, "0")}${g
            .toString(16)
            .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }

    function hoverEffect(event) {
        if (event.target !== container) {
            event.stopPropagation();

            console.log(mode);
            console.log(color);

            if (mode == "normal") {
                event.target.style.backgroundColor = color;
                event.target.style.opacity = 1;
            } else if (mode == "random") {
                let red = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);

                event.target.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
                event.target.style.opacity = 1;

                colorPicker.value = rgbToHex(red, blue, green);
            } else if (mode == "darken") {
                event.target.style.backgroundColor = color;

                let currentOpacity =
                    parseFloat(event.target.style.opacity) || 0;

                currentOpacity = Math.min(currentOpacity + 0.1, 1.0);

                event.target.style.opacity = currentOpacity.toString();
            }
        }
    }

    container.addEventListener("mouseenter", hoverEffect, {
        capture: true,
    });

    currentHoverEffect = hoverEffect;
}
