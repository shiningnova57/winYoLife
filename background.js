// listening for an event / one-time requests
// coming from the popup
// controls the play or work tag under the icon on the nav bar
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "switchMode":
            switchMode();
            break;
        case "alarmToggle":
            toggleAlarm();
            break;
    }

    return true;
});


// ----------------------------   This toggles the play or work tag under the icon on the nav bar --------------------------------------------
var workMode = true;

function switchMode() {
    chrome.tabs.getSelected(null, function(tab){
        if (workMode) {
            chrome.browserAction.setBadgeBackgroundColor({color:"#F44336"});
            chrome.browserAction.setBadgeText({text: "Work!"});   
        }
        else {
            chrome.browserAction.setBadgeBackgroundColor({color:"#03A9F4"});
            chrome.browserAction.setBadgeText({text: "Play!"});
        }
    });   
    workMode = !workMode;
}
// -------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------   This toggles the alarm on or off  -----------------------------------------------------


var alarmOn = false;

function toggleAlarm() {
    if (!alarmOn) {
        startAlarm();
    }
    else {
        endAlarm();
    }
    alarmOn = !alarmOn;
} 

function startAlarm() {
    chrome.alarms.create("testAlarm", {
        periodInMinutes: .1      //when: an actual time or date(Date.now() + 1000), delayInMinutes: is the wait time for ONE alarm   periodInMinutes: is the length of the alarm period
    });   
    // chrome.alarms.create("testAlarm2", {
    //     periodInMinutes: .2  
    // });          
    alert("alarm on!");
}

function endAlarm() {
    chrome.alarms.clear("testAlarm");
    // chrome.alarms.clear("testAlarm2");
    alert("alarm off!");
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    alert("alarm works!");
});


































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// function check(tab) {
//  if (tab.url.indexOf('www.quora') > -1) {        // this checks the tab url
//      alert("hello!")
//      chrome.tabs.executeScript({
//          code: 'document.body.style.backgroundColor="red"'       // this executes script code.
//      });
//  }
// }

//chrome.tabs.onUpdated.addListener(test);      //this listens to the button click thing

// // omnibox
// chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
//     suggest([
//       {content: "color-divs", description: "Make everything red"}
//     ]);
// });
// chrome.omnibox.onInputEntered.addListener(function(text) {
//     if(text == "color-divs") colorDivs();
// });

// // listening for an event / long-lived connections
// // coming from devtools
// chrome.extension.onConnect.addListener(function (port) {
//     port.onMessage.addListener(function (message) {
//         switch(port.name) {
//             case "color-divs-port":
//                 colorDivs();
//             break;
//         }
//     });
// });









