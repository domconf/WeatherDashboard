const apiKey = "1be45999c07ceb399c10e2e61830deb8";
const citySearchBtn = document.querySelector('#searchbtn');
const cityInput = document.getElementById('cityinput');
const cityNameEl = document.querySelector('#resultcity-text');
const currentDateEl = document.querySelector('#current-date');
const currentTempEl = document.querySelector('#current-temperature');
const currentHumidityEl = document.querySelector('#current-humidity');
const currentWindEl = document.querySelector('#current-wind-speed');
const currentIconEl = document.querySelector('#current-icon');
const forecastContainer = document.querySelector('#forecast-container');
const forecastCards = document.querySelectorAll(".card");
const searchContainer = document.querySelector('#search-container');
const storedCities = document.querySelector('storedCities');



function getCityParams() {
    const searchParamsArr = document.location.search.split('&');

    const cityParam = searchParamsArr[0].split('=').pop();
    console.log(searchParamsArr);

    const locQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityParam}&appid=${apiKey}`;
    console.log(locQueryUrl);
    if (!cityParam) {
        console.log('Please enter a city');
        return;
    }
    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data)
            let cityLat = data[0].lat;

            let cityLon = data[0].lon;

            let cityName = data[0].name;
            cityNameEl.textContent = cityName;
            currentWeather(cityLat, cityLon);
        })
}

function currentWeather(cityLat, cityLon) {
    const currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`;
    fetch(currentQueryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            let currentIcon = data.weather[0].icon

            let currentIconURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;

            let currentTemp = data.main.temp;

            let currentHumid = data.main.humidity;

            let currentWind = data.wind.speed;

            let currentDate = data.dt;

            let currentDateConvert = Intl.DateTimeFormat('en-US').format(currentDate * 1000);
            currentDateEl.textContent = currentDateConvert;
            currentIconEl.innerHTML = '<img src="' + currentIconURL + '"></img>';
            currentTempEl.textContent = currentTemp;
            currentHumidityEl.textContent = currentHumid;
            currentWindEl.textContent = currentWind;
            weatherForecast(cityLat, cityLon);
        })
}
