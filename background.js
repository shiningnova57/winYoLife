// function check(tab) {
// 	if (tab.url.indexOf('www.quora') > -1) {		// this checks the tab url
// 		alert("hello!")
// 		chrome.tabs.executeScript({
// 			code: 'document.body.style.backgroundColor="red"'		// this executes script code.
// 		});
// 	}
// }

//chrome.tabs.onUpdated.addListener(test);		//this listens to the button click thing


// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: "color-divs", description: "Make everything red"}
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    if(text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
    }
    return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        switch(port.name) {
            case "color-divs-port":
                colorDivs();
            break;
        }
    });
});

// send a message to the content script
var colorDivs = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
        // setting a badge
        chrome.browserAction.setBadgeText({text: "red!"});
    });
}