// src\script.js

console.log('Hello from content script!');

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

                textarea.dispatchEvent(new Event("input", { bubbles: true }));

                await new Promise((resolve) => setTimeout(resolve, 700));

                const sendButton = document.querySelector('div.flex.gap-x-1 > button[aria-label="Send prompt"]');
                console.log("sendButton:", sendButton);
                if (sendButton && !sendButton.disabled) {
                    sendButton.click();
                }

                await chrome.storage.local.remove("help_IA_text");
            }

            clearInterval(intervalId);
        }
    }, 500);

    setTimeout(() => clearInterval(intervalId), 10000);
}

