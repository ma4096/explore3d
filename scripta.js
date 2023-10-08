// Annotation script
// Just for adding annos, display of safed annos is in script.js

//var annotations = {};
//var annoCounter = 0;//only used for unique ids
var model = document.getElementsByTagName("model-viewer")[0];
//document.body.addEventListener("mouseup", (event) => {document.getElementById("anoContent").focus()});

function getCoord() {
	var offsets = model.getBoundingClientRect();
	var y = Math.floor(offsets.bottom*0.5+4);
	var x = Math.floor(offsets.right*0.5);
	return model.positionAndNormalFromPoint(x,y);
}

function postIt(type, content) { //type "thumbnail-img", "annotation-post" or "annotation-img"
	var s = window.location.search;
	var currentPath = s.substr(3, s.length-6);
	//console.log(content);
	switch (type) {
		case "annotation-post":
			annoCol = model.getElementsByClassName("hotspot");
			annos = {};
			//for (n in annoCol) {
			for (var i = 0; i<annoCol.length; i++) {
				annos[annoCol[i].id] = annoCol[i].outerHTML;
				//console.log(annoCol[i]);
			}
			//console.log(annos)
			fetch(window.location, {
				method: "POST",
				body: JSON.stringify(annos),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					"authentication": document.getElementById("postAuth").value
				}
			}).then((res)=>{
				//console.log(res);
				document.getElementById("last-status").innerText = (res.status === 204) ? " Saved" : " Not authenticated";
			});

	}
}

function postAnnotations() {
	postIt("annotation-post", "");
}

//Delete, fired when rightclicking on annotation-point
function del() {
	this.remove();
}

document.getElementsByTagName("body")[0].addEventListener("keydown", (event) => {
	//Create
	if (event.code === "Enter") {
		//Notify user that there are unsafed changes
		document.getElementById("last-status").innerText = " Unsafed changes";

		//Get the selected content-type
		var contentType = document.querySelector('input[name="content"]:checked').value;
		var content = document.getElementById(contentType);
		var result;
		switch (contentType) {
			case "content-text":
				result = content.value;
				content.value = "";
				content.focus();
				break;
			case "content-link":
				var label = document.getElementById("content-link-label");
				result = "<a target='_blank' href='" + content.value + "'>" + label.value + "</a>";
				label.value = "";
				content.value = "";
				break;
			case "content-img": 
				//Send uploaded image to the server and store it, then create an <img> tag
				console.log("image is not yet implemented");
				var imgFile = document.getElementById("content-img").files[0]
				postIt("annotation-img", imgFile)
				break;
		}

		var color = document.getElementById("color").value;
		
		var content = document.createElement("div");
		content.innerHTML = result; 
		content.setAttribute("class", "annotation");
		content.style.backgroundColor = color;

		var coord = getCoord();
		var anno = document.createElement("button");

		//annoCounter = model.getElementsByClassName("hotspot").length;

		//check if id is already occupied
		var i = 0;
		while (document.getElementById("hotspot-" + i) != null) {
			i++;
		}

		anno.setAttribute("class", "hotspot");
		anno.setAttribute("slot", "hotspot-" + i);
		anno.setAttribute("data-position", coord.position.toString());
		anno.setAttribute("data-normal", coord.normal.toString());
		anno.setAttribute("id", "hotspot-" + i);
		anno.style.backgroundColor = color;
		anno.oncontextmenu = del;

		anno.appendChild(content);
		model.appendChild(anno);

		//annoCounter++;
	}
});

//Warning when trying to close with unsaved changes
window.addEventListener('beforeunload', (e)=>{
	console.log(e);
});