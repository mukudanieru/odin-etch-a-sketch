const container = document.querySelector(".container");
const fragmentDivs = document.createDocumentFragment();

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    createGrid(17);
    addHoverEffect();
});

function createGrid(gridSize) {
    container.style.border = "1px solid black";
    const fixedWidth = 800; // px
    let boxSize = fixedWidth / gridSize;

    let containerWidth = fixedWidth + 2;
    container.style.width = `${containerWidth}px`;
    console.log(container.style.width);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const div = document.createElement("div");
            div.className = `div-${i}-${j}`;
            div.style.height = `${boxSize}px`;
            div.style.width = `${boxSize}px`;
            div.style.border = "1px solid black";

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
            event.target.style.backgroundColor = "#0e0e55";
        }
    }

    container.addEventListener("mouseenter", hoverEffect, {
        capture: true,
    });
}
