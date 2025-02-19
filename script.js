const defaultGridSettings = 16;
const defaultColor = "#000000";

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

    const defaultGridColor = "#ffffff";

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const div = document.createElement("div");
            div.className = `div-${i}-${j}`;
            div.style.height = `${boxSize}px`;
            div.style.width = `${boxSize}px`;
            div.style.border = "1px solid lightgray";
            div.style.backgroundColor = defaultGridColor;
            div.setAttribute("data-color", defaultGridColor);

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

    function resetOpacity(square) {
        const currentColor = colorPicker.value;
        if (
            square.getAttribute("data-color") !== currentColor ||
            square.getAttribute("changed-by") !== "darken"
        ) {
            square.setAttribute("data-opacity", "0");
            square.setAttribute("changed-by", "darken");

            square.style.opacity = 0;
        }
    }

    function opacityEffect(square, color) {
        resetOpacity(square);

        let currentOpacity =
            parseFloat(square.getAttribute("data-opacity")) + 0.1;

        currentOpacity = Math.min(currentOpacity, 1.0);

        square.style.backgroundColor = color;
        square.style.opacity = currentOpacity.toString();
        square.setAttribute("data-opacity", currentOpacity.toString());
        square.setAttribute("data-color", color);
    }

    function hoverEffect(event) {
        if (event.target !== container) {
            event.stopPropagation();

            if (mode == "normal") {
                event.target.style.backgroundColor = color;
                event.target.style.opacity = 1;
                event.target.setAttribute("data-color", color);
                event.target.setAttribute("changed-by", "normal");
            } else if (mode == "random") {
                let red = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);

                event.target.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
                event.target.style.opacity = 1;

                let hexColor = rgbToHex(red, blue, green);

                colorPicker.value = hexColor;
                event.target.setAttribute("data-color", hexColor);
                event.target.setAttribute("changed-by", "random");
            } else if (mode == "darken") {
                opacityEffect(event.target, color);
            }
        }

        // console.log(mode);
        // console.log(color);
        // console.log(event.target);
    }

    container.addEventListener("mouseenter", hoverEffect, {
        capture: true,
    });

    currentHoverEffect = hoverEffect;
}
