var theList = ["facebook","twitter","tumblr"];
var popUp = false;
var match = false;

// --------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------  Listener for the icon's toggle on/off button ----------------------------------

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {	
		
		theList.forEach(function(eachThing) {
			if (request.url.indexOf(eachThing) > -1) {
				match = true;
			}
		})

    	if (request.type == "start") {
      		sendResponse({farewell: "content says that it started"});
    	}
    	if (request.type == "finish") {
    		reject();
    		popUp = false;
    		match = false;
    		sendResponse({farewell: "content says that it finished"});
    	}
    	if (request.type == "play") {
    		if (popUp) {
    			reject();
    			popUp = !popUp;
    		}
    		
    		if (!match) {
    			inject("It's time to play!")
    			popUp = true;
    			console.log("you can NOT use this site");
    		}
    		sendResponse({farewell: "content says that it playing"});
    	}
    	if (request.type == "work") {
    		if (popUp) {
    			reject();
    			popUp = !popUp;
    		}
    		if (match) {
    			inject("It's time to work!")
    			popUp = true;
    			console.log("you can NOT use this site");
    		}
    		
    		sendResponse({farewell: "content says that it working"});
    	}
	}
);

// --------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Functions that run when things happen --------------------------------------

function inject(message) {
	wrapperDiv = document.createElement("div");
	wrapperDiv.setAttribute("style","position: fixed; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
	wrapperDiv.setAttribute("class","stopperStopper");

	iframeElement = document.createElement("iframe");
	iframeElement.setAttribute("style","width: 100%; height: 100%;");

	wrapperDiv.appendChild(iframeElement);

	modalDialogParentDiv = document.createElement("div");
	modalDialogParentDiv.setAttribute("style","position: fixed; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");
	modalDialogParentDiv.setAttribute("class","stopperStopper2")

	modalDialogSiblingDiv = document.createElement("div");

	modalDialogTextDiv = document.createElement("div"); 
	modalDialogTextDiv.setAttribute("style" , "text-align:center");

	modalDialogTextSpan = document.createElement("span"); 
	modalDialogText = document.createElement("strong"); 
	modalDialogText.innerHTML = message;

	breakElement = document.createElement("br"); 

	modalDialogTextSpan.appendChild(modalDialogText);
	modalDialogTextDiv.appendChild(modalDialogTextSpan);
	modalDialogTextDiv.appendChild(breakElement);
	modalDialogTextDiv.appendChild(breakElement);

	modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
	modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

	document.body.appendChild(wrapperDiv);
	document.body.appendChild(modalDialogParentDiv);
}

function reject() {
	var needRemoved = document.getElementsByClassName("stopperStopper");
	var needRemoved2 = document.getElementsByClassName("stopperStopper2");
	document.body.removeChild(needRemoved[0]);
	document.body.removeChild(needRemoved2[0]);
}
