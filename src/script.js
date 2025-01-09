import { onMessage } from "webext-bridge/content-script";

console.log('Hello from content script!');

onMessage("CONTEXT_TEXT", async ({ data }) => {
    console.log("Received text from background:", data.text)
    return {
        
    };
})

