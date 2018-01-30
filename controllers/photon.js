'use strict'
var setMode = "setMode";

function setModeVumeter(newValue){
	var requestURL = config.photonURL + config.photonID + "/" + setMode + "/";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", requestURL, false);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send("params="+newValue+"&access_token="+config.photonAccessToken);
	return xmlHttp.responseText;
}

module.exports = {
  setModeVumeter
}
