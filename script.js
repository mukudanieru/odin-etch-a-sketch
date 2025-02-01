const container = document.querySelector(".container");

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const div = document.createElement("div");
        div.className = `div-${i}-${j}`;
        div.style.height = "50px";
        div.style.width = "50px";
        div.style.border = "1px solid black";

        container.appendChild(div);
    }
}

console.log(container);
