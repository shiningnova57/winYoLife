// --------------------------------------------------------------------------------------------------------------------------------------------
// --------------------  starts with the off badge under the icon on the nav bar.  define user chosen times ----------------------

function offBadge() {
    chrome.browserAction.setBadgeBackgroundColor({color:"#FFA500"});
    chrome.browserAction.setBadgeText({text: "Off!"});  
}

offBadge();
var userWorkTime;
var userPlayTime;

// --------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------   listener to the popup button, sends the times too   --------------------------------------------

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "alarmToggle":
            userWorkTime = Number(request.workTime);
            userPlayTime = Number(request.playTime);
            toggleAlarm();
            break;
    }
    return true;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(alarmOn) {
        if(workMode) {
            toContent("work");
        }
        else {
            toContent("play");
        }
    }
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {   
    if(alarmOn) {
        if(workMode) {
            toContent("work");
        }
        else {
            toContent("play");
        }
    }      
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    if(alarmOn) {
        if(workMode) {
            toContent("work");
        }
        else {
            toContent("play");
        }
    }
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------   This toggles the play or work badge under the icon on the nav bar --------------------------------------------

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
        console.log(userPlayTime); 
        console.log(userWorkTime);        
        toContent("start");
        workTime();
    }
    else {
        workMode = false;
        endAlarm();
        offBadge();
    }
    alarmOn = !alarmOn;
} 

function playTime() {
    toContent("play");
    switchMode();
    chrome.alarms.create("playTimer", {
        periodInMinutes: userPlayTime
    });
}

function workTime() {
    toContent("work");
    switchMode();
    chrome.alarms.create("workTimer", {
        periodInMinutes: userWorkTime
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
        chrome.notifications.create({
            type: "basic",
            title: "WiN yo life",
            message: "10 minutes to live life!",
            iconUrl: "Icon.png"
        })
        chrome.alarms.clear("workTimer");
        playTime();
    }
    if (alarm.name ==="playTimer") {
        console.log('playTimer fired!', alarm);
        chrome.alarms.clear('playTimer');
        chrome.notifications.create({
            type: "basic",
            title: "WiN yo life",
            message: "Get back to work!",
            iconUrl: "Icon.png"
        })
        workTime();
    }
});

//event emitter to the current page!
function toContent(type) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type, url: tabs[0].url, isOn: alarmOn}, function(response) {
            console.log(response.farewell);
        });
    }); 
}
