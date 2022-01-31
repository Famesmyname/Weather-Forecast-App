// Define all HTML elements

const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('am-pm')
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('current-weather');
const cityEl = document.getElementById('city');
const latitude = document.getElementById('lat')
const longitude = document.getElementById('lon')
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const form = document.querySelector('.form')
const input = document.querySelector('.input');

// Define all variables to be used
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var lat
var lon

// API here
const APIKEY = '280bb0999946126ed42a0811df928435';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=` + cityEl.textContent + `&appid=${APIKEY}&units=metric`;
var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&units=metric&appid=${APIKEY}`

 function getCoord() {
        fetch (apiURL)
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .then((data) => displayCoord(data))  

        function displayCoord(data) {
        var { lat } = data.coord;
        var { lon } = data.coord;
        // lat = { lat }.lat
        // lon = { lon }.lon
        // console.log(lat, lon)
        document.querySelector('.latitude').innerText = lat
        document.querySelector('.longitude').innerText = lon
    }   
 }

function fetchWeather() {
        fetch (onecallURL)
        .then((response) => response.json())
        .then((data) => console.log(data))
}



// All Event listeners here
form.addEventListener("submit", e => {
    e.preventDefault();
    inputVal = input.value;
  });





// Functions here


// Display date and time without using moment
setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var day = time.getDay(); 
    var date = time.getDate();
    var hour = time.getHours();
    var hours12Hr = hour >= 13 ? hour %12: hour
    var minutes = time.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var ampm = hour >= 12 ? 'pm' : 'am';

    var timeNow = hours12Hr + ':' + minutes + ' ' + ampm;

    timeEl.innerHTML = timeNow

    dateEl.innerHTML = days[day] + ', ' + months[month] + ' ' + date

},1000);
