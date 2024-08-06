chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'parent',
        title: 'Analyze Phishing...',
        type: 'normal',
        contexts: ['selection'],

    })
});

// OnClick get the selected text and display it as an alert
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'parent') {
        if(info.selectionText) {
            console.log(info.selectionText)
        } else {
            console.log('No text selected')
        }
    }
})
