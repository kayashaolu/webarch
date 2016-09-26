/* Populate with current location */
var locationDiv = document.querySelectorAll("#locationList")[0];
locationDiv.innerHTML = localStorage.curLocation;

/* Run code on submit button push */
var locationForm = document.querySelectorAll("#locationForm")[0];
locationForm.addEventListener("submit", function(event) {
	var name = locationForm.elements.namedItem("name").value;
	var state = locationForm.elements.namedItem("state").value;

	localStorage.curLocation = name + ": " + state;

	var locationDiv = document.querySelectorAll("#locationList")[0];
	locationDiv.innerHTML = localStorage.curLocation;
	locationDiv.classList.add("highlight");

	/* This stops the usual function of "submit" which is to send data
	to another server */
	event.preventDefault();
})