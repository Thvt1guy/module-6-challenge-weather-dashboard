const stateForm = document.querySelector('#stateSearchForm');
let stateInput = document.querySelector('#stateSearchInput');
const searchBTN = document.querySelector('#search-btn');
let lat;
let lon;
const currentApiKey = "41153eb82921b7286bc36c30be065bae";
const geoKey = "0c85ef26bc5bd14af59105e2ef286d21";
const apiKey = "9d119a7a718ce265750a1d3e48d8c0c2";
const weatherDataEl = document.querySelector('.weather');


// console.log(searchBTN);

const sumbitHandler = function (event) {
    event.preventDefault();
    // console.log('sumbit is working');
    let state = stateInput.value.trim();
    getCords(state);
}

const getCords = function (stateSearched) {
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${stateSearched}&limit=1&appid=${geoKey}`
    fetch(geoApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getLatnLon(data);
                })
            } else {
                console.log('Error' + response.statusText);
            }
        })
        .catch(err => console.error(err));
}

function getLatnLon(data) {
    // console.log(data);
    lat = data[0].lat;
    lon = data[0].lon;
    //    console.log(lat, lon);
    getCurrentWeather();
    getUserWeather();
}

const getUserWeather = function () {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    writeWeatherData(data);
                })
            } else {
                console.log('Error' + response.statusText);
            }
        })
        .catch(err => console.error(err));
}

const getCurrentWeather = function () {
    const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${currentApiKey}&units=imperial`
    fetch(currentApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    writeCurrentData(data);
                })
            } else {
                console.log('Error' + response.statusText);
            }
        })
        .catch(err => console.error(err));
}

const currentDayEl = document.querySelector('.currentDay');
const day1El = document.querySelector('.day1');
const day2El = document.querySelector('.day2');
const day3El = document.querySelector('.day3');
const day4El = document.querySelector('.day4');
const day5El = document.querySelector('.day5')

const writeCurrentData = function (data) {
    console.log(data);
    // console.log(data.weather[0].icon);
    currentDay = data;
    currentDayEl.innerHTML = `<h1 class= "font-bold text-center">${currentDay.name}<h1> <h1>${dayjs(currentDay.coord.dt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png> <h3>${Math.round(currentDay.main.temp)} <span class= "degree">\u00B0F<span></h3>  <h3>Humidity: ${currentDay.main.humidity}</h3> <h3>Wind: ${currentDay.wind.speed} mph</h3>`
}

const writeWeatherData = function (data) {

    console.log(data);

    // console.log(data.list[0].main.temp);
    // console.log(data.list[0].main.feels_like);

    firstDay = data.list[4];
    secDay = data.list[12];
    thirdDay = data.list[20];
    fourthDay = data.list[28];
    fifthDay = data.list[36];

    
    day1El.innerHTML = `<h1 class= "font-bold text-center" >${data.city.name}<h1> <h1>${dayjs(firstDay.dt_txt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@2x.png> <h3>${Math.round(firstDay.main.temp)} <span class= "degree">\u00B0F<span></h3> <h3>Humidity: ${firstDay.main.humidity}</h3> <h3>Wind: ${firstDay.wind.speed} mph</h3>`
    day2El.innerHTML = `<h1 class= "font-bold text-center">${data.city.name}<h1> <h1>${dayjs(secDay.dt_txt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${secDay.weather[0].icon}@2x.png> <h3>${Math.round(secDay.main.temp)} <span class= "degree">\u00B0F<span></h3> <h3>Humidity: ${secDay.main.humidity}</h3> <h3>Wind: ${secDay.wind.speed} mph</h3>`
    day3El.innerHTML = `<h1 class= "font-bold text-center">${data.city.name}<h1> <h1>${dayjs(thirdDay.dt_txt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${thirdDay.weather[0].icon}@2x.png> <h3>${Math.round(thirdDay.main.temp)} <span class= "degree">\u00B0F<span></h3> <h3>Humidity: ${thirdDay.main.humidity}</h3> <h3>Wind: ${thirdDay.wind.speed} mph</h3>`
    day4El.innerHTML = `<h1 class= "font-bold text-center">${data.city.name}<h1> <h1>${dayjs(fourthDay.dt_txt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${fourthDay.weather[0].icon}@2x.png> <h3>${Math.round(fourthDay.main.temp)} <span class= "degree">\u00B0F<span></h3> <h3>Humidity: ${fourthDay.main.humidity}</h3> <h3>Wind: ${fourthDay.wind.speed} mph</h3>`
    day5El.innerHTML = `<h1 class= "font-bold text-center">${data.city.name}<h1> <h1>${dayjs(fifthDay.dt_txt).format('MMMM D, YYYY')}<h1> <img src=http://openweathermap.org/img/wn/${fifthDay.weather[0].icon}@2x.png> <h3>${Math.round(fifthDay.main.temp)} <span class= "degree">\u00B0F<span></h3> <h3>Humidity: ${fifthDay.main.humidity}</h3> <h3>Wind: ${fifthDay.wind.speed} mph</h3>`

    const panel1 = document.body.children[1].children[0];
    const panel2 = document.body.children[1].children[1];
    const panel3 = document.body.children[1].children[2];
    const panel4 = document.body.children[1].children[3];
    const panel5 = document.body.children[1].children[4];
    const panel6 = document.body.children[1].children[5];
    console.log(panel1, panel2, panel3, panel4, panel5);
    panel1.classList.add("p-6","rounded-lg", "mt-12");
    panel2.classList.add("p-6","rounded-lg", "mt-12");
    panel3.classList.add("p-6","rounded-lg", "mt-12");
    panel4.classList.add("p-6","rounded-lg", "mt-12");
    panel5.classList.add("p-6","rounded-lg", "mt-12");
    panel6.classList.add("p-6","rounded-lg", "mt-12");
}

searchBTN.addEventListener("click", sumbitHandler);