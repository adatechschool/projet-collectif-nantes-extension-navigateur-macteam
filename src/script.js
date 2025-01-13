console.log('Hello from content script!');

let popup = null;

// Événement déclenché lorsqu'un texte est surligné
document.addEventListener("mouseup", (e) => {
    const selectionText = window.getSelection().toString().trim();

    // Supprime le popup si aucun texte n'est sélectionné
    if (!selectionText) {
        removePopup();
        return;
    }

    // Crée un popup si du texte est sélectionné
    createPopup(e);
});

function createPopup(e) {
    // Supprime un ancien popup avant d'en créer un nouveau
    removePopup();

    // Crée le conteneur du popup
    popup = document.createElement("div");
    popup.classList.add("help-ia-popup");

    // Style positionné en fonction des coordonnées du curseur
    popup.style.position = "absolute";
    popup.style.top = `${e.pageY + 10}px`;
    popup.style.left = `${e.pageX}px`;
    popup.style.padding = "10px";
    popup.style.border = "1px solid #ccc";
    popup.style.backgroundColor = "#fff";
    popup.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    popup.style.zIndex = "1000";

    // Bouton "Résumé"
    const summarizeBtn = document.createElement("button");
    summarizeBtn.innerText = "Résumé";
    summarizeBtn.style.marginRight = "10px";
    summarizeBtn.addEventListener("click", () => handleSummary());

    // Bouton "Explication"
    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Expliquer";
    explainBtn.addEventListener("click", () => handleExplanation());

    popup.appendChild(summarizeBtn);
    popup.appendChild(explainBtn);

    // Ajoute le popup au document
    document.body.appendChild(popup);
}

function removePopup() {
    if (popup) {
        popup.remove();
        popup = null;
    }
}

function handleSummary() {
    const selectionText = window.getSelection().toString().trim();
    if (selectionText) {
        // Navigue vers ChatGPT avec le texte sélectionné
        window.open(`https://chat.openai.com/?text=${encodeURIComponent(selectionText)}`, '_blank');
    }
    removePopup();
}

function handleExplanation() {
    const selectionText = window.getSelection().toString().trim();
    if (selectionText) {
        // Navigue vers ChatGPT avec une demande d'explication
        window.open(`https://chat.openai.com/?text=Explain:${encodeURIComponent(selectionText)}`, '_blank');
    }
    removePopup();
}





