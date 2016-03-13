//will need a js file for just window.onload

window.onload = function() {

    document.getElementById("alarm-toggle-button").onclick = function() {
        chrome.extension.sendMessage({
            type: "alarmToggle",
            playTime: document.getElementById("playTime").value || 0.1,
            workTime: document.getElementById("workTime").value || 0.3
        });
    }
}
