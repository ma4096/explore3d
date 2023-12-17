// Only cosmetics for the index.html and style.css
// No interactions with main content or server

var navIsOpen = true;
function navOpenClose() {
 	var isSmallScreen = (screen.width < 840);
	var sidebar = document.getElementsByTagName("sidebar")[0];
	var navButton = document.getElementById("navButton");
	sidebar.style.width = navIsOpen ? "0%" : (isSmallScreen ? "90%" : "20%");
	navButton.style.marginLeft = navIsOpen ? "0%" : (isSmallScreen ? "90%" : "20%");
	navButton.innerText = (navIsOpen ? "Open Menu" : "Close Menu");

	//model.style.width = navIsOpen ? "100%" : (isSmallScreen ? "100%" : "80%");

	navIsOpen = !navIsOpen;
}

var anoIsOpen = false;
function anoOpenClose() {
	document.getElementsByClassName("annotation-selector")[0].style.height = anoIsOpen ? "0%" : "20%";
	document.getElementsByTagName("sidebar")[0].style.height = anoIsOpen ? "100%" : "80%";
	document.getElementById("anoButton").style.bottom = anoIsOpen ? "0%" : "20%";
	document.getElementById("anoButton").innerText = (anoIsOpen ? "Open Options" : "Close Options");

	//model.style.height = anoIsOpen ? "100%" : (isSmallScreen ? "100%" : "0%");

	anoIsOpen = !anoIsOpen;
}

var isDarkMode = false;
function switchColorMode() {
	document.body.style.backgroundColor = isDarkMode ? "#fafafa" : "#121212";
	isDarkMode = !isDarkMode;
}