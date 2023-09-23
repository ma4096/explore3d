var index;
var menuPath = "";
//var currentIndex;

function loadNewModel(path) {	
	/*var query = new URLSearchParams(window.location.search);
	console.log(query);*/
	modelCollection = document.getElementsByTagName("model-viewer");
	model = modelCollection[0];
	model.setAttribute("src", path);
	//console.log(path.substr(1));
	//window.history.replaceState( history.state , "3D Port for ISEM", window.location.host + "?f=" + path.substr(1));
};

function loadIndex() {
	fetch("./fileindex")
		.then((response)=>response.json())
		.then((responseJson)=>{
			index = responseJson;
			//console.log(index);
			buildMenu(viewLevel());
		});
};

function getCurrentDir() {
	// Get the current path based on the shown URL
	var query = new URLSearchParams(window.location.search);
	var cpathList = query.get("f").split("/");
	//console.log(cpathList);
	var cpath = "";
	for (var i = 0; i<cpathList.length-1; i++) {
		cpath = cpath + cpathList[i] + "/";
		//console.log("loop ex");
	}
	return cpath;
};

function addPanel(name, path, thumbnail, ci) {
	/* Create a panel from name and Thumbnail */
	/* Hyperlink based on name */
	var panel = document.createElement("div");
	var thumb = document.createElement("img");
	var caption = document.createElement("span");
	console.log(ci[name]["folderPath"]);
	if (ci[name]["folderPath"] != undefined) {
		panel.onclick = () => {
			buildMenu(ci[name]);
		};
	} else {
		panel.onclick = () => {
			loadNewModel(ci[name].cad);
		}
	}
	
	thumb.setAttribute("src", thumbnail);
	caption.innerText = name;

	panel.appendChild(thumb);
	panel.appendChild(caption);

	document.getElementById("menu").appendChild(panel);
}

function viewLevel() {
	/* Get all items in this folder */
	//console.log(index);
	var dir = getCurrentDir();
	var currentIndex = index;
	//console.log(currentIndex);
	dirList = dir.split("/");
	for (var i = 2; i<dirList.length; i++) {
		if (dirList[i] != "") {
			//console.log(dirList[i]);
			currentIndex = currentIndex[dirList[i]];
		}
	}
	return currentIndex;
}

function buildMenu(ci) {
	//Title:
	document.getElementById("path").innerText = "ISEM: " + getCurrentDir();
	document.getElementById("menu").innerHTML = "";

	//console.log(ci);
	for (var el in ci) {
		switch (el) {
			case "folderPath":
			case "isDir":
				break;
			default:
				path = ci[el].cad;
				thumbnail = ci[el].thumbnail;
				addPanel(el, path, thumbnail, ci);
		}
	}

}

function oneUp() {
	var pathL = getCurrentDir().split("/");
	var nci = index;
	//console.log(nci, pathL);
	for (var i = 2; i<pathL.length-2; i++) {
		if (pathL[i] == "") {
			continue;
		}
		//console.log(pathL[i]);
		nci = nci[pathL[i]];
	}
	//console.log(nci);
	buildMenu(nci);
}

//On load
loadIndex();
loadNewModel((new URLSearchParams(window.location.search)).get("f"));