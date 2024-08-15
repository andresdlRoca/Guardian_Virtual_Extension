chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "analyze_phish",
      title: "Analyze phishing...",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyze_phish") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: grabAndParseSelectedTextWithLinks
      }, (results) => {
        if (results && results[0]) {
          console.log(results[0].result);  // Handle the parsed text with links here.
        }
      });
    }
  });
  
  function grabAndParseSelectedTextWithLinks() {
    let selection = window.getSelection();
    if (!selection.rangeCount) return null;
  
    let container = document.createElement("div");
    for (let i = 0; i < selection.rangeCount; i++) {
      container.appendChild(selection.getRangeAt(i).cloneContents());
    }
  
    // Extract HTML content
    let htmlContent = container.innerHTML;
  
    // Parse HTML content to plain text with embedded hyperlinks
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');
  
    // Convert the document to plain text with URLs
    function parseNode(node) {
      let text = '';
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          text += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.tagName === 'A' && child.href) {
            text += child.textContent + ' ' + child.href;
          } else {
            text += parseNode(child);
          }
        }
      });
      return text;
    }
  
    return parseNode(doc.body);
  }
  