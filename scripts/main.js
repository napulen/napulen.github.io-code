
var contentFrame = document.getElementById("maincontent");

document.getElementById("about").onclick = 
function() {
	contentFrame.src = "about/about.html";
	return false;
};

document.getElementById("cv").onclick = 
function() {
	contentFrame.src = "cv/cv.html";
	return false;
};

document.getElementById("msc").onclick = 
function() {
	contentFrame.src = "msc/msc.html";
	return false;
};

document.getElementById("projects").onclick = 
function() {
	contentFrame.src = "projects/projects.html";
	return false;
};
