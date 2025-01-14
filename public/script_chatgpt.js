// public\script_chatgpt.js

const intervalId = setInterval(async () => {
    const textarea = document.querySelector("#prompt-textarea p");

    if (textarea) {
        const result = await chrome.storage.local.get(["help_IA_text", "help_IA_mode"]);
        const { help_IA_text, help_IA_mode } = result;

        if (help_IA_text) {
            let promptToInject = help_IA_text;

            if (help_IA_mode === "explain") {
                promptToInject += " Fais-moi une explication de ce texte.";
            } else if (help_IA_mode === "summary") {
                promptToInject += " Fais-moi le résumé de ce texte.";
            }

            textarea.innerText = promptToInject;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));

            await new Promise((resolve) => setTimeout(resolve, 700));

            const sendButton = document.querySelector('div.flex.gap-x-1 > button');
            if (sendButton && !sendButton.disabled) {
                setTimeout(() => sendButton.click(), 1000);
                // sendButton.click();
            }

            await chrome.storage.local.remove("help_IA_text");
        }

        clearInterval(intervalId);
    }
}, 500);

setTimeout(() => clearInterval(intervalId), 10000);
