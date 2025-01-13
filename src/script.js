// src\script.js

console.log('Hello from content script!');

let popup = null

// Fonction pour retirer le popup si aucun texte n'est surligné
function removePopup(){
    if (popup && popup.parentNode) {
        popup.parentNode.removeChild(popup)
        popup = null
    } 
}

function handleSummary() {
    const selectionText = window.getSelection().toString();
    console.log("Summary:", selectionText, "popup:", popup);
    removePopup()

    // if (window.location.hostname.includes("chatgpt.com")) {
    //     console.log("Running content script logic on chatgpt.com");

    //     const intervalId = setInterval(async () => {
    //         const textarea = document.querySelector("#prompt-textarea p");
    //         console.log("textarea:", textarea);

    //         if (textarea) {
    //             const { help_IA_text } = await chrome.storage.local.get("help_IA_text");
    //             console.log("help_IA_text:", help_IA_text);

    //             if (help_IA_text) {
    //                 textarea.innerText = `${help_IA_text}\n\nFais une résumé de ce texte.`;

    //                 textarea.dispatchEvent(new Event("input", { bubbles: true }));

    //                 // temps d'attente pour que le bouton "send" soit actif
    //                 await new Promise((resolve) => setTimeout(resolve, 700));

    //                 const sendButton = document.querySelector('div.flex.gap-x-1 > button');
    //                 console.log("sendButton:", sendButton);
    //                 if (sendButton && !sendButton.disabled) {
    //                     sendButton.click();
    //                 }

    //                 await chrome.storage.local.remove("help_IA_text");
    //             }

    //             clearInterval(intervalId);
    //         }
    //     }, 500);

    //     // Au bout de 10 secondes, si on n'arrive pas à exécuter le script, on l'arrête 
    //     setTimeout(() => clearInterval(intervalId), 10000);
    // }
}

function createPopup(e){
    // Create a small popup at mouse coordinates
    popup = document.createElement("div");
    
    popup.classList.add("help-ia-popup");
    
    popup.style.top = `${e.pageY + 10}px`; // a bit below the selection
    popup.style.left = `${e.pageX}px`;
    
    // Add some actions
    const summarizeBtn = document.createElement("button");
    summarizeBtn.innerText = "Summarize";
    
    const explainBtn = document.createElement("button");
    explainBtn.innerText = "Explain";
    
    // Add event listeners for the buttons
    summarizeBtn.addEventListener("click", () => handleSummary());
    explainBtn.addEventListener("click", () => handleExplanation());
    
    popup.appendChild(summarizeBtn);
    popup.appendChild(explainBtn);
    
    // Add the popup to the document
    document.body.appendChild(popup);
}

// Événement qui se déclenche lorsque le texte est surligné
document.addEventListener("mouseup",(e) => {
    const selectionText = window.getSelection().toString();
    if (selectionText === "") {
        removePopup()
        return
    }
    
    createPopup(e)
})
