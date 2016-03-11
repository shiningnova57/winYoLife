//will need a js file for just window.onload

window.onload = function() {

    document.getElementById("alarm-toggle-button").onclick = function() {
        chrome.extension.sendMessage({
            type: "alarmToggle"
        });
    }
}
