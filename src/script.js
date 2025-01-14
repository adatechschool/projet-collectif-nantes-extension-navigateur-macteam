// src\script.js

let popup = null;
let selectionText;

document.addEventListener("mouseup", (e) => {
    if (popup && popup.contains(e.target)) {
        return;
    }

    selectionText = window.getSelection().toString();

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
    summarizeBtn.addEventListener("click", () => handleClick("summary"));

    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Expliquer";
    explainBtn.addEventListener("click", () => handleClick("explain"));

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

function handleClick(mode) {
    chrome.storage.local.set({
        help_IA_text: selectionText,
        help_IA_mode: mode
    });

    window.open("https://www.chatgpt.com", "_blank");

    removePopup();
}
