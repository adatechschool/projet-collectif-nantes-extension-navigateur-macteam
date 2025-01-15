// public\script_chatgpt.js

function selectMode(mode, promptToInject) {
    if (mode === "explain") {
        promptToInject += "\n\n  Instruction: Fais-moi une explication de ce texte.";
    } else if (mode === "summary") {
        promptToInject += "\n\n  Instruction: Fais-moi le résumé de ce texte.";
    }

    return promptToInject;
}

function injectSelectedText(promptToInject, textarea) {
    textarea.innerText = promptToInject;
    // On déclenche l'événement input pour que le texte soit injecté dans le textarea de chatgpt
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function sendButtonClick() {
    const sendButton = document.querySelector('div.flex.gap-x-1 > button');

    if (sendButton && !sendButton.disabled) {
        setTimeout(() => sendButton.click(), 700);
    }
}
// Une fois arrivé sur chatgpt, on répète de la logique de notre extension pendant un intervalle de temps 
const intervalId = setInterval(async () => {
    const textarea = document.querySelector("#prompt-textarea p");

    if (textarea) {
        // On récupère les données enregistrées dans le stockage local
        const result = await chrome.storage.local.get(["help_IA_text", "help_IA_mode"]);
        const { help_IA_text, help_IA_mode } = result;
        // On injecte le texte sélectionné et l'instruction dans la zone de texte de chatgpt
        if (help_IA_text) {
            let promptToInject = help_IA_text;

            promptToInject = selectMode(help_IA_mode, promptToInject);
            injectSelectedText(promptToInject, textarea);

            // On attend un certain temps pour que le bouton de chatgpt s'active
            await new Promise((resolve) => setTimeout(resolve, 700));
            sendButtonClick()

            // On vide le texte sélectionné de notre stockage local 
            await chrome.storage.local.remove("help_IA_text");
        }

        clearInterval(intervalId);
    }
}, 500);

// Au bout de 10s si l'execution de l'extension est obsolete, on arrête le script
setTimeout(() => clearInterval(intervalId), 10000);
