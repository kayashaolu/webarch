var req = new XMLHttpRequest();
req.onload = function () { 
weather = this.responseText;

json_weather = JSON.parse(weather);

temp = json_weather.main.temp;

localStorage.setItem("tempBerk", temp);

var tempDiv = document.querySelectorAll('#api')[0];
tempDiv.innerHTML = localStorage.getItem("tempBerk");

};
req.open('get', 'http://api.openweathermap.org/data/2.5/weather?id=5327684&appid=40e88d062b04951331c8638fad9cce1a&units=imperial', true);
req.send();