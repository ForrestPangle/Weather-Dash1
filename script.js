let today = moment().format("MMMM Do")
let tomorrow = moment().add(24, 'hours').format('ddd'); 
let dayTwo = moment().add(48, 'hours').format('ddd');
let dayThree = moment().add(72, 'hours').format('ddd');
let dayFour = moment().add(96, 'hours').format('ddd');
let dayFive = moment().add(120, 'hours').format('ddd');
let daySix = moment().add(144, 'hours').format('ddd');
let daySeven = moment().add(168, 'hours').format('ddd');

let dateTomorrow = moment().add(24, 'hours').format('MMM DD'); 
let dateTwo = moment().add(48, 'hours').format('MMM DD');
let dateThree = moment().add(72, 'hours').format('MMM DD');
let dateFour = moment().add(96, 'hours').format('MMM DD');
let dateFive = moment().add(120, 'hours').format('MMM DD');
let dateSix = moment().add(144, 'hours').format('MMM DD');
let dateSeven = moment().add(168, 'hours').format('MMM DD');


// On page load check for saved city in local storage. If none is found, display Whitsett weather.
window.onload = function displayLastSearch() {
    if (localStorage.getItem('lastCity') === null) {
        let city = 'Whitsett'
        getWeather(city)
    }
    else {
        let city = localStorage.getItem('lastCity') 
        getWeather(city)
    }
}

//When search button is pressed display that city's weather & store the value to load storage.
document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        let city = document.getElementById('city').value
        let savedCities = document.getElementById('savedCities')
        getWeather(city)
        savedCities.insertAdjacentHTML("afterbegin", `<button type="button" class="button is-fullwidth mb-1" cityName="${city}" onclick="pushCity(this)">${city}</button>`)
        localStorage.setItem('lastCity', city)
        document.getElementById('searchError').textContent = ""
    })

// When a saved city button is pressed, display weather for that city.
function pushCity(button) {
    let city = button.getAttribute('cityName')
    getWeather(city)
}

function getWeather (city) {
    let longlatURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial=1&appid=b3c62af16abb18a1048d422ba97123c9`
    return fetch(longlatURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (longlatResults) {
            console.log(longlatResults)
            let lon = longlatResults.city.coord.lon
            let lat = longlatResults.city.coord.lat

            let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=b3c62af16abb18a1048d422ba97123c9`

            return fetch(weatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherResults) {
            console.log(weatherResults)

            // Today's weather.
            document.getElementById('cityName').innerHTML = `
            ${city} <img src="images/${weatherResults.current.weather[0].icon}.svg" style="width:50px;height50px;" class="has-image-centered" alt="${weatherResults.current.weather[0].description} weather icon.">`

            document.getElementById('date').innerHTML = `${today}`

            document.getElementById('currentTemp').innerHTML = `
            <text class="title is-0">${Math.round(weatherResults.current.temp)} F</text>`

            document.getElementById('currentHumidity').innerHTML = `
            <text class="title is-0">${weatherResults.current.humidity}%</text>`

            document.getElementById('currentWind').innerHTML = `
            <text class="title is-0">${weatherResults.current.wind_speed}</text><text class="title is-3">mp/h</text>`

            if (weatherResults.current.uvi < 3) {
                document.getElementById('currentUV').innerHTML = `
                <text class="title is-0 has-text-success">${weatherResults.current.uvi}</text>`
            }
            else if (weatherResults.current.uvi >= 3 && weatherResults.current.uvi <= 6 ){
                document.getElementById('currentUV').innerHTML = `
                <text class="title is-0 has-text-warning">${weatherResults.current.uvi}</text>`
            }
            else {
                document.getElementById('currentUV').innerHTML = `
                <text class="title is-0 has-text-danger">${weatherResults.current.uvi}</text>`
            }

            // 7 Day Forecast Cards
            //Tomorrow's weather
            document.getElementById('tomorrowIcon').innerHTML = `
            <img src="images/${weatherResults.daily[0].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[0].weather[0].description} weather icon.">`

            document.getElementById('tomorrow').innerHTML = `<strong>${tomorrow}</strong>`

            document.getElementById('dateTomorrow').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateTomorrow}</p>`

            document.getElementById('tomorrowTemp').innerHTML = `
            ${Math.round(weatherResults.daily[0].temp.max)} / ${Math.round(weatherResults.daily[0].temp.min)} F`

            document.getElementById('tomorrowHumidity').innerHTML = `
            H: ${weatherResults.daily[0].humidity}%`

            // Day 2's weather
            document.getElementById('dayTwoIcon').innerHTML = `
            <img src="images/${weatherResults.daily[1].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[1].weather[0].description} weather icon.">`

            document.getElementById('dayTwo').innerHTML = `<strong>${dayTwo}</strong>`

            document.getElementById('dateTwo').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateTwo}</p>`

            document.getElementById('dayTwoTemp').innerHTML = `
            ${Math.round(weatherResults.daily[1].temp.max)} / ${Math.round(weatherResults.daily[1].temp.min)} F`

            document.getElementById('dayTwoHumidity').innerHTML = `
            H: ${weatherResults.daily[1].humidity}%`

            // Day 3's weather
            document.getElementById('dayThreeIcon').innerHTML = `
            <img src="images/${weatherResults.daily[2].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[2].weather[0].description} weather icon.">`
            
            document.getElementById('dayThree').innerHTML = `<strong>${dayThree}</strong>`

            document.getElementById('dateThree').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateThree}</p>`

            document.getElementById('dayThreeTemp').innerHTML = `
            ${Math.round(weatherResults.daily[2].temp.max)} / ${Math.round(weatherResults.daily[2].temp.min)} F`

            document.getElementById('dayThreeHumidity').innerHTML = `
            H: ${weatherResults.daily[2].humidity}%`

            // Day 4's weather
            document.getElementById('dayFourIcon').innerHTML = `
            <img src="images/${weatherResults.daily[3].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[3].weather[0].description} weather icon.">`

            document.getElementById('dayFour').innerHTML = `<strong>${dayFour}</strong>`

            document.getElementById('dateFour').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateFour}</p>`

            document.getElementById('dayFourTemp').innerHTML = `
            ${Math.round(weatherResults.daily[3].temp.max)} / ${Math.round(weatherResults.daily[3].temp.min)} F`

            document.getElementById('dayFourHumidity').innerHTML = `
            H: ${weatherResults.daily[3].humidity}%`

            // Day 5's weather
            document.getElementById('dayFiveIcon').innerHTML = `
            <img src="images/${weatherResults.daily[4].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[4].weather[0].description} weather icon.">`

            document.getElementById('dayFive').innerHTML = `<strong>${dayFive}</strong>`

            document.getElementById('dateFive').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateFive}</p>`

            document.getElementById('dayFiveTemp').innerHTML = `
            ${Math.round(weatherResults.daily[4].temp.max)} / ${Math.round(weatherResults.daily[4].temp.day)} F`

            document.getElementById('dayFiveHumidity').innerHTML = `
            H: ${weatherResults.daily[4].humidity}%`

            // Day 6's weather
            document.getElementById('daySixIcon').innerHTML = `
            <img src="images/${weatherResults.daily[5].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[5].weather[0].description} weather icon.">`

            document.getElementById('daySix').innerHTML = `<strong>${daySix}</strong>`

            document.getElementById('dateSix').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateSix}</p>`

            document.getElementById('daySixTemp').innerHTML = `
            ${Math.round(weatherResults.daily[5].temp.max)} / ${Math.round(weatherResults.daily[5].temp.min)} F`

            document.getElementById('daySixHumidity').innerHTML = `
            H: ${weatherResults.daily[5].humidity}%`

            // Day 7's weather
            document.getElementById('daySevenIcon').innerHTML = `
            <img src="images/${weatherResults.daily[6].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[6].weather[0].description} weather icon.">`

            document.getElementById('daySeven').innerHTML = `<strong>${daySeven}</strong>`

            document.getElementById('dateSeven').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateSeven}</p>`

            document.getElementById('daySevenTemp').innerHTML = `
            ${Math.round(weatherResults.daily[6].temp.max)} / ${Math.round(weatherResults.daily[6].temp.min)} F`

            document.getElementById('daySevenHumidity').innerHTML = `
            H: ${weatherResults.daily[6].humidity}%`

            })

        })
        .catch (function (error) {
            document.getElementById('searchError').textContent = "Invalid city name."
            localStorage.clear();
        })
    }