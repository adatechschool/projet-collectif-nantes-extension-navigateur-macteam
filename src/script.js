// src\script.js

// import { onMessage } from "webext-bridge/content-script";

console.log('Hello from content script!'); // Envoyer ce commentaire sur le DOM

// // Reception du message CONTENT_TEXT depuis le background puis on envoie ce message au DOM (console) 
// onMessage("CONTEXT_TEXT", async ({ data }) => {
//     console.log("Received text from background:", data.text)
//     window.location.href= "https://chatgpt.com/"
    
//     return {

//     };
// })

if (window.location.hostname.includes("chatgpt.com")) {
    console.log("Running content script logic on chatgpt.com");

    const intervalId = setInterval(async () => {
        const textarea = document.querySelector("#prompt-textarea p");
        console.log("textarea:", textarea);

        if (textarea) {
            const { help_IA_text } = await chrome.storage.local.get("help_IA_text");
            console.log("help_IA_text:", help_IA_text);

            if (help_IA_text) {
                textarea.innerText = help_IA_text;

                // const sendButton = document.querySelector('button[aria-label="Send prompt"]');
                // console.log("sendButton:", sendButton);
                // if (sendButton) {
                //     sendButton.click();
                // }

                await chrome.storage.local.remove("help_IA_text");
            }

            clearInterval(intervalId);
        }
    }, 500);

    setTimeout(() => clearInterval(intervalId), 10000);
}

