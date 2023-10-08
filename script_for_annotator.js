var index;
var menuPath = "";
var model;
//var currentIndex;

function loadNewModel(path) {
	modelCollection = document.getElementsByTagName("model-viewer");
	model = modelCollection[0];

	annos = model.getElementsByClassName("hotspot");//Delete previous annotations
	//console.log(annos);
	for (var i = annos.length-1; i >= 0; i--) {
		//console.log(annos[i-n]);
		//console.log(i, annos[i]);
		document.getElementById(annos[i].id).remove();
	}

	model.setAttribute("src", path);
	window.history.pushState("object or string", "3D for ISEM", "/?f=" + path);

	loadAnnotations(path);//Add annos for this model
};

/*function addDel() {
	//This is just a dummy function, which gets reassigned when scripta.js is included in the page
}*/

function loadAnnotations(path) {
	//Get path of annotations.txt of this model
	pathTXT = getAnnoPath(path);
	fetch(pathTXT)
		.then((response)=>{
			//console.log(response);
			return response.json();
		}).then((annoJson)=>{
			for (n in annoJson) {
				model.innerHTML = model.innerHTML + annoJson[n];
			}
			return annoJson;
		}).then((aJ)=>{
			annos = model.getElementsByClassName("hotspot");
			for (n in annos) {
				annos[n].oncontextmenu = function() {
					this.remove();
					document.getElementById("last-status").innerText = " Unsafed changes";
				};
			}
		});

}

function getAnnoPath(path) {
	var pathTXT = "";
	var ar = path.split("/");
	ar[ar.length-1] = "_" + ar[ar.length-1].substr(0, ar[ar.length-1].length-4);
	for (n in ar) {
		pathTXT = pathTXT + (ar[n] + "/");
	}
	pathTXT = pathTXT + "annotations.txt";
	return pathTXT;
}

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
	//var thumb_contain = document.createElement("div");
	var thumb = document.createElement("img");
	var caption = document.createElement("span");
	//console.log(ci[name]["folderPath"]);
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
	//thumb_contain.appendChild(thumb);

	//panel.appendChild(thumb_contain);
	panel.appendChild(thumb);
	panel.appendChild(caption);
	panel.classList.add("clickable");

	document.getElementsByTagName("sidebar")[0].appendChild(panel);
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
	document.getElementById("path").innerText = "ISEM: " + ci.folderPath;
	
	//clear all menu items from sidebar
	sidebar = document.getElementsByTagName("sidebar")[0];
	nav = sidebar.getElementsByTagName("nav")[0];
  	while (sidebar.lastElementChild != nav) {
    	sidebar.removeChild(sidebar.lastElementChild);
  	}

	//console.log(ci);
	for (var el in ci) {
		switch (el) {
			case "folderPath":
			case "isDir":
				break;
			default:
				path = ci[el].cad;
				thumbnail = ci[el].thumbnail;
				//console.log(ci[el].thumbnail);
				if (thumbnail == undefined) {
					thumbnail = "./folderIcon.png"
				}
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