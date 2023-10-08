// Only cosmetics for the index.html and style.css
// No interactions with main content or server

var navIsOpen = true;
function navOpenClose() {
	var sidebar = document.getElementsByTagName("sidebar")[0];
	var navButton = document.getElementById("navButton");
	sidebar.style.width = navIsOpen ? "0%" : "20%";
	navButton.style.marginLeft = navIsOpen ? "0%" : "20%";
	navButton.innerText = (navIsOpen ? "Open Menu" : "Close Menu");
	navIsOpen = !navIsOpen;
}

var anoIsOpen = false;
function anoOpenClose() {
	document.getElementsByClassName("annotation-selector")[0].style.height = anoIsOpen ? "0%" : "20%";
	document.getElementById("anoButton").style.bottom = anoIsOpen ? "0%" : "20%";
	document.getElementById("anoButton").innerText = (anoIsOpen ? "Open Options" : "Close Options");
	anoIsOpen = !anoIsOpen;
}