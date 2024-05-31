chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TEXT_SELECTED') {
      chrome.storage.local.set({ selectedText: message.text, position: message.position });
      chrome.action.openPopup();  // Opens the extension popup
    }
  });
  