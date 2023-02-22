const stateForm = document.querySelector('#stateSearchForm');
const stateInput = document.querySelector('#stateSearchInput');
const searchBTN = document.querySelector('#search-btn');
const lat = '';
const lon = '';
const apiKey = "9d119a7a718ce265750a1d3e48d8c0c2"


const getUserWeather = function () {
    const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${parseInt(lat)}&lon=${parseInt(lon)}&appid=${apiKey}`
    fetch(apiUrl, options)
    .then( function(response) {
        if (response.ok) {
            response.json().then(function (data){
                writeWeatherData(data);
            })
        } else {
            console.log('Error' + response.statusText);
        }
    })
    .catch(err => console.error(err));
}

