// --------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------   starts with the off badge under the icon on the nav bar!   --------------------------------------------

chrome.browserAction.setBadgeBackgroundColor({color:"#FFA500"});
chrome.browserAction.setBadgeText({text: "Off!"});  

// --------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------   controls the play or work tag under the icon on the nav bar   --------------------------------------------

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "alarmToggle":
            toggleAlarm();
            break;
    }

    return true;
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------   This toggles the play or work tag under the icon on the nav bar --------------------------------------------

var workMode = false;

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

// --------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------   Alarm functions to toggle between work and play  -----------------------------------------------

var alarmOn = false;

function toggleAlarm() {
    if (!alarmOn) {
        workTime();
    }
    else {
        workMode = false;
        endAlarm();
        chrome.browserAction.setBadgeBackgroundColor({color:"#FFA500"});
        chrome.browserAction.setBadgeText({text: "Off!"});  
    }
    alarmOn = !alarmOn;
} 

function playTime() {
    switchMode();
    chrome.alarms.create("playTimer", {
        periodInMinutes: 0.1
    });
}

function workTime() {
    switchMode();
    chrome.alarms.create("workTimer", {
        periodInMinutes: 0.3
    })
}

function endAlarm() {
    chrome.alarms.clearAll();
}

// --------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------   Main Timer listener that toggles between work and play  --------------------------------------------

chrome.alarms.onAlarm.addListener(function(alarm) {
    //alarm.name can be used for things
    if (alarm.name === "workTimer") {
        console.log("workTimer fired!", alarm);
        chrome.alarms.clear("workTimer");
        playTime();
    }
    if (alarm.name ==="playTimer") {
        console.log('playTimer fired!', alarm);
        chrome.alarms.clear('playTimer');
        workTime();
    }
});




function findAllTabs () {
    chrome.tabs.query({},function(tabs){     
        tabs.forEach(function(tab){         //this runs through every tab open on your browser
            console.log(tab.url);
        });
    });
}

function findCertainTabs (name) {
    chrome.tabs.query({},function(tabs){     
        tabs.forEach(function(tab){
            if (tab.url.indexOf(name) > -1) {
                console.log(tab.url);
            }         
        });
    });
}









































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









