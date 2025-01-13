// src\script.js 

console.log('Hello from content script!');

let popup = null;
let selectionText = null;

document.addEventListener("mouseup", (e) => {
    if (popup && popup.contains(e.target)) {
        return;
    }

    selectionText = window.getSelection().toString().trim();

    if (!selectionText) {
        removePopup();
        return;
    }

    createPopup(e);
});

function createPopup(e) {
    if (popup) {
        removePopup();
    }

    popup = document.createElement("div");
    popup.classList.add("help-ia-popup");

    popup.style.position = "absolute";
    popup.style.top = `${e.pageY + 10}px`;
    popup.style.left = `${e.pageX}px`;

    const summarizeBtn = document.createElement("button");
    summarizeBtn.innerText = "Résumé";
    summarizeBtn.style.marginRight = "10px";
    summarizeBtn.addEventListener("click", () => handleSummary());

    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Expliquer";
    explainBtn.addEventListener("click", () => handleExplanation());

    popup.appendChild(summarizeBtn);
    popup.appendChild(explainBtn);

    document.body.appendChild(popup);
}

function removePopup() {
    if (popup) {
        popup.remove();
        popup = null;
    }
}

function handleSummary() {
    console.log("handleSummary");
    removePopup();
}

function handleExplanation() {
    console.log("handleExplanation");
    removePopup();
}
