function helloWorld(first_name, last_name) {
	var message = "Hello World " + first_name + " " + last_name;
	return message;
}

/*
var first = prompt("Enter your first name");
var last = prompt("Enter your last name");
var output = helloWorld(first, last);
alert(output);
*/

function getGenerationalCohort(yearBorn) {

	var generationalCohort = ""
	
	if (yearBorn > 1900 && yearBorn <= 1926) {
		generationCohort = "GI Generation";
	}
	else if (yearBorn > 1926 && yearBorn <= 1945) {
		generationalCohort = "Silent Generation";
	}
	else if (yearBorn > 1945 && yearBorn <= 1964) {
		generationalCohort = "Baby Boomers";
	} 
	else if(yearBorn > 1964 && yearBorn <= 1980) {
		generationalCohort = "Generation X";
	}
	else if(yearBorn > 1980 && yearBorn <= 2001) {
		generationalCohort = "Millennium";
	}
	else if(yearBorn > 2001 && yearBorn < 2020) {
		generationalCohort = "Generation Z";
	}
	else {
		generationalCohort = "Outside of our named generations";
	}

	return generationalCohort;
}
/*
var year = parseInt(prompt("Enter your year of birth"));
var cohort = getGenerationalCohort(year);
alert("The generational cohort of someone born in " + 
	year + " is: " + cohort + ".");
*/

function countToX(x) {
	
	var message = "";
	for(var i = 0; i < x; i = i+1) {
		message = message + i + " ";
	}

	return message;
}

/*
var limit = parseInt(prompt("Enter a number"));
var output = countToX(limit);
alert(output);
*/

var student = {};

student.name = prompt("Enter your name");
student.attempts2 = [];

answer = false
while(answer != true) {
	value = prompt("What is 8+8?");
	student.attempts.push(value);

	if(value == "16") {
		answer = true;
	}
	else {
		answer = false;
	}
}

alert(student.name + " answers: " + student.attempts);