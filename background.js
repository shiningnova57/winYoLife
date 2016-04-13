var userWorkTime;
var userPlayTime;
var workMode = false;
var alarmOn = false;

function offBadge() {
    chrome.browserAction.setBadgeBackgroundColor({color:"#FFA500"});
    chrome.browserAction.setBadgeText({text: "Off!"});  
}

function toContent(type) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type, url: tabs[0].url, isOn: alarmOn}, function(response) {
            console.log(response.farewell);
        });
    }); 
}

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
        toContent("finish");
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

function tabActions() {
    if(alarmOn) {
        if(workMode) {
            toContent("work");
        }
        else {
            toContent("play");
        }
    }
    else {
        toContent("finish");
    }
}

offBadge();

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
    tabActions();
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {   
    tabActions();      
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    tabActions();
});

//what happens when the alarm rings!
chrome.alarms.onAlarm.addListener(function(alarm) {
    
    //alarm.name can be used for things
    
    if (alarm.name === "workTimer") {
        chrome.notifications.create({
            type: "basic",
            title: "WiN yo life",
            message: userPlayTime + " minutes to live life!",
            iconUrl: "Icon.png"
        })
        chrome.alarms.clear("workTimer");
        playTime();
    }
    if (alarm.name ==="playTimer") {
        chrome.notifications.create({
            type: "basic",
            title: "WiN yo life",
            message: "Get back to work!",
            iconUrl: "Icon.png"
        })
        chrome.alarms.clear('playTimer');
        workTime();
    }
});
