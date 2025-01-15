// src\javascript\popup.js

import { variables } from "../script.js";

function handleClick(mode) {
    // On enregistre le mode de l'extension IA et le texte sélectionné dans le stockage local
    chrome.storage.local.set({
        help_IA_text: variables.selectionText,
        help_IA_mode: mode
    });
    // On bascule vers la page de chatGPT dans un nouvel onglet
    window.open("https://www.chatgpt.com", "_blank");

    removePopup();
}

function placePopup(e) {

    // On positionne le popup à l'endroit de la souris
    variables.popup.style.position = "absolute";
    variables.popup.style.top = `${e.pageY + 10}px`;
    variables.popup.style.left = `${e.pageX}px`;
}

function createIconPopup() {
    // Création de l’icône du popup
    const icon = document.createElement("img");
    icon.src = "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-macteam/blob/main/public/Icons/icon32.png?raw=true";
    icon.alt = "Help IA icon";

    variables.popup.appendChild(icon);
}

function createButtonPopup() {
    // Création des boutons du popup 
    const summarizeBtn = document.createElement("button");
    summarizeBtn.innerText = "Résumer";
    summarizeBtn.addEventListener("click", () => handleClick("summary"));

    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Expliquer";
    explainBtn.addEventListener("click", () => handleClick("explain"));

    variables.popup.appendChild(summarizeBtn);
    variables.popup.appendChild(explainBtn);

}

function createPopup(e) {
    if (variables.popup) {
        removePopup();
    }

    // On crée le popup
    variables.popup = document.createElement("div");
    variables.popup.classList.add("help-ia-popup");

    placePopup(e);

    createIconPopup()

    createButtonPopup()

    // On ajoute le popup au body de la page
    document.body.appendChild(variables.popup);

    // On crée un effet de transition pour le popup
    setTimeout(() => {
        variables.popup.classList.add('show');
    }, 10);
}

function removePopup() {
    if (variables.popup) {
        variables.popup.classList.remove('show');
        variables.popup.remove();
        variables.popup = null;
    }
}

export { createPopup, removePopup };