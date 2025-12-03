chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Aquí va todo el código que creaba los botones (W1 y CONT1)
      // El código que me diste va aquí, sin la parte chrome.tabs.query
      // Solo la parte interna que crea los botones y los agrega
    }
  });
});
