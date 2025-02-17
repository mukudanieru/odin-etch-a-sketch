const defaultGridSettings = 16;

const container = document.querySelector(".container");
const gridRange = document.querySelector("#grid-range");
const gridValue = document.querySelector("#grid-value");

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    createGrid(defaultGridSettings);
    addHoverEffect();

    gridRange.addEventListener("input", () => {
        createGrid(gridRange.value);
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
            div.style.border = "1px solid black";
            div.style.backgroundColor = "white";

            fragmentDivs.appendChild(div);
        }
    }

    container.appendChild(fragmentDivs);
}

function addHoverEffect() {
    function hoverEffect(event) {
        if (event.target !== container) {
            event.stopPropagation();
            console.log(event.target.className);
            event.target.style.backgroundColor = "black";
        }
    }

    container.addEventListener("mouseenter", hoverEffect, {
        capture: true,
    });
}
