// src\background.js

import { onMessage } from "webext-bridge/background";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "help-ia",
    title: "Help IA",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "help-ia") {
    const selectionText = info.selectionText || "";
    
    await chrome.storage.local.set({
      help_IA_text: selectionText,
      help_IA_mode: "summary"
    });

    chrome.tabs.create({ url: "https://chatgpt.com/" });
  }
});

onMessage("help_IA_text", async ({data}) => {

  await chrome.storage.local.set({ help_IA_text: data });

  chrome.tabs.create({ url: "https://chatgpt.com/" });

  return {};
})
