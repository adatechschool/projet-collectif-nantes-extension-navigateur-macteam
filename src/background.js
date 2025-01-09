import { sendMessage } from "webext-bridge/background";

console.log("Hello from background!");

// Permet de visualiser le bouton "help IA" dans le menu contextuel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "button",
    title: "Help IA",
    contexts: ["all"],
  });
});
// Aprés avoir fait un clique droit, le menu contextuel s'ouvre, on enregistre le texte surligné puis envoyer au content_script
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "button") {
    const selectionText = info.selectionText;

    console.log("Selection text in background:", selectionText);

    await sendMessage("CONTEXT_TEXT", { text: selectionText}, { context: "content-script", tabId: tab.id });
  }
});
