chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "button",
    title: "Help IA",
    contexts: ["selection"],
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
          document.addEventListener("selectionchange", () => {
              const selection = window.getSelection()
              const selectionText = selection.toString().trim()
              if (selectionText) {
                  console.log(selectionText)
              }
          })
      },
    });
  }
});
