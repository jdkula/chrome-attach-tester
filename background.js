let handle = -1;

function setIcon(iconPath) {
    if(handle !== -1) {
        window.clearTimeout(handle);
    }
    
    chrome.browserAction.setIcon({path: iconPath}, function() {
        handle = window.setTimeout(function() {
            chrome.browserAction.setIcon({path: "./check.png"}, function() {});
            handle = -1;
        }, 5000);
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    if(tab.id) {
        chrome.debugger.attach({tabId: tab.id}, "1.2", function() {
            if(chrome.runtime.lastError) {
                setIcon("./error.png");
            } else {
                chrome.debugger.detach({tabId: tab.id}, function() {
                    setIcon("./ok.png");
                });
            }
        });
    }
});