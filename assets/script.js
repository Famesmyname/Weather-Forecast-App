// Define all HTML elements
const cityInput = document.querySelector('.city-input');
const cityForm = document.querySelector('.city-form');
const cityList = document.querySelector('.city-list');
const cityBtn = document.querySelector('.city-btn')
const clearBtn = document.querySelector('.clear-btn')
const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('am-pm');
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('current-weather');
const uviEl = document.getElementById('uvi');
const cityEl = document.getElementById('city');
const latitude = document.getElementById('lat')
const longitude = document.getElementById('lon')
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const form = document.querySelector('.form')
const input = document.querySelector('.input');
const weatherIconEl = document.querySelector('.weather-icon')

// Define all variables to be used
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var cities = [];


// API here
const APIKEY = '280bb0999946126ed42a0811df928435';
var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=` + cityEl.textContent + `&appid=${APIKEY}&units=metric`;
var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=` + latitude.innerText + `&lon=` + longitude.innerText + `&exclude=hourly&units=metric&appid=${APIKEY}`

// All Event listeners here
form.addEventListener("submit", e => {
    e.preventDefault();
    inputVal = input.value;
  });
  
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var cityText = cityInput.value.trim();
    if (cityText === "") {
    return;
    }
    cityEl.textContent = cityText
    cities.push(cityText);
    cityInput.value = "";
    storeCities();
    renderCities();
    getCoord();
    setTimeout(fetchWeather, 500);
});

cityList.addEventListener("click", function(event) {
    var element = event.target;
    // console.log(event.target.innerText)
    if (element.matches("button") === true) {
    cityEl.textContent = event.target.innerText
    getCoord();
    setTimeout(fetchWeather, 500);
    }
})

clearBtn.addEventListener("click", function() {
    cities = [];
    storeCities();
    renderCities();
}) 

//Functions Here

//Take recovered local storage city list and create city buttons
function renderCities() {
    cityList.innerHTML = "";
  
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i]
      var button = document.createElement("button");
      button.classList.add('city-btn')
      button.classList.add('btn')
      button.textContent = city;
      cityList.appendChild(button);
    }
  }

//Store entered city onto local storage then render the city button
  function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  //Webpage initialization, show city list then get coordinates for default city and set the weather forecast
  function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
      cities = storedCities;
    }
    renderCities();
    getCoord();
    setTimeout(fetchWeather, 500);
  }

function cityWeather () {
    getCoord()
    fetchWeather()
}

//Function to get coords for use with weather forcast one call
function getCoord() {
        apiURL = `https://api.openweathermap.org/data/2.5/weather?q=` + cityEl.textContent + `&appid=${APIKEY}&units=metric`;
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
        // console.log(onecallURL)
    }   
 }

function fetchWeather() {
         onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=` +  document.querySelector('.latitude').innerText + `&lon=` +  document.querySelector('.longitude').innerText + `&exclude=hourly&units=metric&appid=${APIKEY}`
         console.log(onecallURL)
         fetch (onecallURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            showWeatherData(data);    
        })
}

function showWeatherData (data) {
// TODAY
    let {humidity, wind_speed, temp, uvi} = data.current;
    let {icon} = data.current.weather[0]
    // console.log(humidity, wind_speed, temp, uvi, icon)
    document.querySelector('.wind').innerText = wind_speed + ' kph';
    document.querySelector('.humidity').innerText = humidity + `%`;
    document.querySelector('.uvi').innerText = uvi;
    document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${icon}.png`
    document.querySelector('.temp').innerText = temp + String.fromCharCode(176) + ' C';
    
    // Change color of UV index value based on danger level
    if (uvi <= 2) {
        uviEl.classList.remove('bad-uv')
        uviEl.classList.remove('med-uv')
        uviEl.classList.add('good-uv')
    }
    else if (uvi >= 6) {
        uviEl.classList.remove('good-uv')
        uviEl.classList.remove('med-uv')
        uviEl.classList.add('bad-uv')
    }
    else {
        uviEl.classList.remove('bad-uv')
        uviEl.classList.remove('good-uv')
        uviEl.classList.add('med-uv')
    }

// FORECAST Day1-Day5
    let d1icon = data.daily[0].weather[0].icon
    console.log(d1icon)
    document.querySelector('.d1temp').innerText = data.daily[0].temp.max + String.fromCharCode(176) + ' C'
    document.querySelector('.d1forecast-wind').innerText = 'W: ' + data.daily[0].wind_speed + ' kph'
    document.querySelector('.d1forecast-humidity').innerText = 'H: ' + data.daily[0].humidity + ' %'
    document.querySelector('.d1weather-icon').src = `http://openweathermap.org/img/wn/${d1icon}.png`

    let d2icon = data.daily[1].weather[0].icon
    document.querySelector('.d2temp').innerText = data.daily[1].temp.max + String.fromCharCode(176) + ' C'
    document.querySelector('.d2forecast-wind').innerText = 'W: ' + data.daily[1].wind_speed + ' kph'
    document.querySelector('.d2forecast-humidity').innerText = 'H: ' + data.daily[1].humidity + ' %'
    document.querySelector('.d2weather-icon').src = `http://openweathermap.org/img/wn/${d2icon}.png`

    let d3icon = data.daily[2].weather[0].icon
    document.querySelector('.d3temp').innerText = data.daily[2].temp.max + String.fromCharCode(176) + ' C'
    document.querySelector('.d3forecast-wind').innerText = 'W: ' + data.daily[2].wind_speed + ' kph'
    document.querySelector('.d3forecast-humidity').innerText = 'H: ' + data.daily[2].humidity + ' %'
    document.querySelector('.d3weather-icon').src = `http://openweathermap.org/img/wn/${d3icon}.png`

    let d4icon = data.daily[3].weather[0].icon
    document.querySelector('.d4temp').innerText = data.daily[3].temp.max + String.fromCharCode(176) + ' C'
    document.querySelector('.d4forecast-wind').innerText = 'W: ' + data.daily[3].wind_speed + ' kph'
    document.querySelector('.d4forecast-humidity').innerText = 'H: ' + data.daily[3].humidity + ' %'
    document.querySelector('.d4weather-icon').src = `http://openweathermap.org/img/wn/${d4icon}.png`

    let d5icon = data.daily[4].weather[0].icon
    document.querySelector('.d5temp').innerText = data.daily[4].temp.max + String.fromCharCode(176) + ' C'
    document.querySelector('.d5forecast-wind').innerText = 'W: ' + data.daily[4].wind_speed + ' kph'
    document.querySelector('.d5forecast-humidity').innerText = 'H: ' + data.daily[4].humidity + ' %'
    document.querySelector('.d5weather-icon').src = `http://openweathermap.org/img/wn/${d5icon}.png`

}

// Use moment for forecast dates

function setForecastDates () {
    document.querySelector('.d1date').innerText=(moment().add(1, 'days').format("MM-DD-YYYY"))
    document.querySelector('.d1day').innerText=(moment().add(1, 'days').format("dddd"))
    document.querySelector('.d2date').innerText=(moment().add(2, 'days').format("MM-DD-YYYY"))
    document.querySelector('.d2day').innerText=(moment().add(2, 'days').format("dddd"))
    document.querySelector('.d3date').innerText=(moment().add(3, 'days').format("MM-DD-YYYY"))
    document.querySelector('.d3day').innerText=(moment().add(3, 'days').format("dddd"))
    document.querySelector('.d4date').innerText=(moment().add(4, 'days').format("MM-DD-YYYY"))
    document.querySelector('.d4day').innerText=(moment().add(4, 'days').format("dddd"))
    document.querySelector('.d1date').innerText=(moment().add(5, 'days').format("MM-DD-YYYY"))
    document.querySelector('.d5day').innerText=(moment().add(5, 'days').format("dddd"))
}



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
    setForecastDates()
},1000);

init()

