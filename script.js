const container = document.querySelector(".container");
const fragmentDivs = document.createDocumentFragment();

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const div = document.createElement("div");
        div.className = `div-${i}-${j}`;
        div.style.height = "25px";
        div.style.width = "25px";
        div.style.border = "1px solid black";

        fragmentDivs.appendChild(div);
    }
}

container.appendChild(fragmentDivs);

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
