// src\script.js

import { createPopup, removePopup } from "./javascript/popup.js";

// Initialisation du popup et du selectionText(contenu du texte surligné)
export const variables = {
    popup: null,
    selectionText: null,
};

// Gestion du surlignage à l'aide la souris  
document.addEventListener("mouseup", (e) => {
    if (variables.popup && variables.popup.contains(e.target)) {   // Si un popup est deja visible, on bloque l'apparition d'un nouveau popup
        return;
    }

    variables.selectionText = window.getSelection().toString().trim();  // On récupère le texte sélectionné et on le met dans selectionText

    if (!variables.selectionText) {  // Si aucun texte n'est sélectionné, on retire le popup 
        removePopup();
        return;
    }

    createPopup(e); 
});
