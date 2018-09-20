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
            let error = chrome.runtime.lastError;
            if(error) {
                console.log("Error occured.", error);
                setIcon("./error.png");
            } else {
                chrome.debugger.detach({tabId: tab.id}, function() {
                    console.log("Attach succeeded")
                    setIcon("./ok.png");
                });
            }
        });
    }
});