﻿var dimCap = true;
var sl = document.getElementById("bar");
sl.addEventListener("click", sc, false);
var ind = document.getElementById("ind");
var sn = document.getElementById("saveName");
ind.addEventListener("click", indLights, false);
var lm = document.getElementById("lightMem");
lm.addEventListener("click", lightMem, false);
var ld = document.getElementById("lightDim");
ld.addEventListener("click", lightDim, false);
sn.addEventListener("click", saveName, false);


var pot = document.getElementById("pot");
var percOn = document.getElementById("percOn");
function sc(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var perc = Math.round(xPosition / e.currentTarget.offsetWidth * 100);
    if (dimCap == true)
        setLight(perc);
}
function setLight(perc) {
    pot.innerHTML = perc;
    percOn.style.width = perc + "%";
    sendWithoutCaring("setLights.lua?val=" + Math.round(perc / 100 * 1023));
    //alert(Math.round(perc / 100 * 1023)); //the value to send to the light
}
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}
function flipCheck(e) {
    if (e.currentTarget.firstChild.className.indexOf('selected') > -1) {
        e.currentTarget.firstChild.className = 'check';
        return false;
    }
    else {
        e.currentTarget.firstChild.className = 'check selected';
        return true;
    }
}
function indLights(e) {
    if (flipCheck(e) == true)
        sendWithoutCaring("setIndicator.lua?state=on");
    else
        sendWithoutCaring("setIndicator.lua?state=off");
}

function lightDim(e) {
    if (flipCheck(e) == true) {
        sendWithoutCaring("setDim.lua?val=1");
        dimCap = true;
    }
    else {
        sendWithoutCaring("setDim.lua?val=0");
        dimCap = false;
    }
}

function lightMem(e) {
    if (flipCheck(e) == true)
        //sendWithoutCaring("setIndicator.lua?state=on");
        sendWithoutCaring("setACOn.lua?val=1");
    else
        sendWithoutCaring("setACOn.lua?val=0");
}
function saveName(e) {
    sendWithoutCaring("setName.lua?val=" + document.getElementById("name").value);
	document.getElementById("LightName").innerHTML = document.getElementById("name").value;
    e.currentTarget.style.width = e.currentTarget.offsetWidth;
    e.currentTarget.style.color = "#aaa";
    e.currentTarget.innerHTML = "&nbsp; saved &nbsp;";
    setTimeout(function () { sn.innerHTML = "save name"; sn.style.color = "#fff";}, 3000);
	setTimeout(function () { getState("getState.lua"); }, 1000);
}
function sendWithoutCaring(url) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function getState(url) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	xmlhttp.onreadystatechange=function()
	{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	cap=xmlhttp.responseText; 
			parseResp(cap);
	}
	}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
	function parseResp(cap)
	{
//	cap = "1\n1\nGarssage\n133\n192.168.1.36\n255.255.255.0\n192.168.1.1";
			var vals = cap.split("\n");
			if (vals[0] == "1")
				lm.firstChild.className = "check selected";
			else
				lm.firstChild.className = "check";
			if (vals[1] == "1")
				ld.firstChild.className = "check selected";
			else
			{
				ld.firstChild.className = "check";
			}
			document.getElementById("LightName").innerHTML = vals[2];
			document.getElementById("name").value = vals[2];
			var pc = Math.round(vals[3] / 1023 * 100);
			pot.innerHTML = pc;
			percOn.style.width = pc + "%";
			
			document.getElementById("ip").value = vals[4];	
			document.getElementById("sn").value = vals[5];	
			document.getElementById("gw").value = vals[6];	
			for (i = 0; i < vals.length; i++)
			{
			//alert(vals[i] + i);
			}
			}
			
			getState("getState.lua");