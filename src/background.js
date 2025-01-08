import { onMessage } from "webext-bridge/background";

console.log('Hello from background!');
onMessage("RECORD_NAME", recordName);
async function recordName({ data }) {
  // Do whatever processing you need here. 
  console.log(data);
  return {
    // Some response here
  };
}

// Permet de visualiser le bouton "help IA" dans le menu contextuel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "button",
    title: "Help IA",
    contexts: ["all"],
  });
});



chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "button") {
    console.log("le bouton click");
    console.log(info.selectionText);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // récupérer le texte en surbrillance
        const selection = window.getSelection()
        const selectionText = selection.toString().trim()
        if (selectionText) {
          console.log(selectionText)
        }
      },
    });
  }
});


