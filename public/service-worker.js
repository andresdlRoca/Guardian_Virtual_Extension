const API_URL = 'http://localhost:8000'

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
          phishingAnalysis(results[0].result);
        }
      });
    }
  });

  async function phishingAnalysis(text) {
    try {
      // Should have text and urls separated
      const urls = text.match(/\bhttps?:\/\/\S+/gi);
      if (!urls) {
        console.log('No URLs found in the selected text.');
        return;
      }

      const fqdn = urls.map(url => new URL(url).hostname);

      console.log('URLs:', urls);
      console.log('FQDNs:', fqdn);

      // Check each URL against the whitelist
      const whitelistResults = await Promise.all(fqdn.map(checkWhitelist));
      console.log('Whitelist results:', whitelistResults);

      // Check each URL against the blacklist
      const blacklistResults = await Promise.all(fqdn.map(checkBlacklist));
      console.log('Blacklist results:', blacklistResults);

      // Check each URL against the popularity rank
      const popularityResults = await Promise.all(fqdn.map(checkPopular));
      console.log('Popularity rank results:', popularityResults);
      
      // Have a variable to store text without URLs
      const textWithoutUrls = text.replace(/\bhttps?:\/\/\S+/gi, '');
      console.log('Text without URLs:', textWithoutUrls);

    } catch (error) {
      console.error('Error while analyzing phishing:', error);
    }
  }

  async function fetchData(apiEndpoint, arg) {
    try {
      const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(arg)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error while fetching response from API: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    } catch (error) {
      console.error('Error while fetching data:', error);
      return { error: error.message };
    }
  }

  async function checkWhitelist(url) {
    try {
      const apiEndpoint = `${API_URL}/whitelist`;
      const result = await fetchData(apiEndpoint, url);
      return result;
    } catch (error) {
      console.error('Error while checking whitelist:', error);
    }
  }

  async function checkBlacklist(url) {
    try {
      const apiEndpoint = `${API_URL}/blacklist`;
      const result = await fetchData(apiEndpoint, url);
      return result;
    } catch (error) {
      console.error('Error while checking blacklist:', error);
    }
  }

  async function checkPopular(url) {
    try {
      const apiEndpoint = `${API_URL}/popularityrank`;
      const result = await fetchData(apiEndpoint, url);
      return result;
    } catch (error) {
      console.error('Error while checking popularity rank:', error);
    }
  }
  
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
  