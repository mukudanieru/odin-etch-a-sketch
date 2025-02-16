const container = document.querySelector(".container");
// const gridSettings = document.querySelector(".grid-settings");

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    createGrid(16);
    addHoverEffect();
    // changeGrid();
});

function createGrid(gridSize) {
    const fragmentDivs = document.createDocumentFragment();

    container.innerHTML = "";

    container.style.border = "1px solid black";
    const fixedWidth = 700; // px
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

// function changeGrid() {
//     gridSettings.addEventListener("click", () => {
//         let number = prompt("Enter the new number of grid:");

//         if (number !== null && number !== "" && !isNaN(number)) {
//             number = Number(number);

//             if (number > 0 && number < 101) {
//                 createGrid(number);
//             } else {
//                 alert("Please enter a number from 1 to 100 only.");
//             }
//         } else {
//             alert("Please enter a valid number.");
//         }
//     });
// }
