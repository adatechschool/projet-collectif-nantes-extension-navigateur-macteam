// src\script.js

// Initialisation du popup et du selectionText(contenu du texte surligné)
let popup = null;
let selectionText;

// Gestion du surlignage à l'aide la souris  
document.addEventListener("mouseup", (e) => {
    if (popup && popup.contains(e.target)) {   // Si un popup est deja visible, on bloque l'apparition d'un nouveau popup
        return;
    }

    selectionText = window.getSelection().toString().trim();  // On récupère le texte sélectionné et on le met dans selectionText

    if (!selectionText) {  // Si aucun texte n'est sélectionné, on retire le popup 
        removePopup();
        return;
    }

    createPopup(e);    
});

function createPopup(e) {
    if (popup) {
        removePopup();
    }

    // On crée le popup
    popup = document.createElement("div");
    popup.classList.add("help-ia-popup");
    
    // On positionne le popup à l'endroit de la souris
    popup.style.position = "absolute";
    popup.style.top = `${e.pageY + 10}px`;
    popup.style.left = `${e.pageX}px`;
   // Création de l'icone du popup
    const icon = document.createElement("img");
    icon.src = "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-macteam/blob/feature/popDisplay/public/Icons/icon128.png?raw=true";
    icon.alt = "Help IA icon";

    popup.appendChild(icon);
// Création des boutons du popup 
    const summarizeBtn = document.createElement("button");
    summarizeBtn.innerText = "Résumer";
    summarizeBtn.addEventListener("click", () => handleClick("summary"));

    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Expliquer";
    explainBtn.addEventListener("click", () => handleClick("explain"));

    popup.appendChild(summarizeBtn);
    popup.appendChild(explainBtn);
// On ajoute le popup au body de la page
    document.body.appendChild(popup);

    // On crée un effet de transition pour le popup
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

function removePopup() {
    if (popup) {
        popup.classList.remove('show');
            popup.remove();
            popup = null;
    }
}

function handleClick(mode) {
    // On enregistre le mode de l'extension IA et le texte sélectionné dans le stockage local
    chrome.storage.local.set({
        help_IA_text: selectionText,
        help_IA_mode: mode
    });
// On bascule vers la page de chatGPT dans un nouvel onglet
    window.open("https://www.chatgpt.com", "_blank");

    removePopup();
}
