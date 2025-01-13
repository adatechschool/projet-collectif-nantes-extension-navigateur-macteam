// src\background.js

console.log("Hello from background!");

// Permet de visualiser le bouton "help IA" dans le menu contextuel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "help-ia",
    title: "Help IA",
    contexts: ["selection"],
  });
});

// Après avoir fait un clique droit, le menu contextuel s'ouvre, on enregistre le texte surligné puis envoyer au content_script
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "help-ia") {
    const selectionText = info.selectionText || "";

    console.log("Background script got selection text:", selectionText);
    
    await chrome.storage.local.set({ help_IA_text: selectionText });

    chrome.tabs.create({ url: "https://chatgpt.com/" });
  }
});
