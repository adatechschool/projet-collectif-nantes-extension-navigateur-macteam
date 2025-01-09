import { onMessage } from "webext-bridge/content-script";

console.log('Hello from content script!'); // Envoyer ce commentaire sur le DOM

// Reception du message CONTENT_TEXT depuis le background puis on envoie ce message au DOM (console) 
onMessage("CONTEXT_TEXT", async ({ data }) => {
    console.log("Received text from background:", data.text)
    window.location.href= "https://chatgpt.com/"
    
    return {

    };
})

