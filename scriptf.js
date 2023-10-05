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

var aniIsOpen = false;
function aniOpenClose() {
	document.getElementsByClassName("animation-selector")[0].style.height = aniIsOpen ? "0%" : "20%";
	document.getElementById("aniButton").style.bottom = aniIsOpen ? "0%" : "20%";
	document.getElementById("aniButton").innerText = (aniIsOpen ? "Open Animations" : "Close Animations");
	aniIsOpen = !aniIsOpen;
}