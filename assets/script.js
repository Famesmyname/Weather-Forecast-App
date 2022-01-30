// Define all HTML elements

const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('am-pm')
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('current-weather');
const timeZoneEl = document.getElementById('time-zone');
const cityEl = document.getElementById('city');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Define all variables to be used
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']



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
