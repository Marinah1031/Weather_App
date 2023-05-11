var APIkey = "ca4d6748746f7b31b9c0e7609d98f397"
var searchForm = document.getElementById("search-form")

function getLatLon (city) {
    console.log (city)
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
    fetch (geoURL).then (response => response.json ()).then (data => {
        var cityname = data[0].name
        console.log (data[0])
        var lat = data[0].lat
        var lon = data[0].lon
        getTodayWeather (cityname, lat, lon)
    })
}
 function getTodayWeather (cityname, lat, lon) {
    var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
    fetch (weatherURL).then (response => response.json ()).then (data => {
        var currentDiv = document.getElementById("current")
        console.log (data)
        currentDiv.textContent = ""
        var titleEl = document.createElement("div")
        titleEl.textContent = "City: " + cityname 
        currentDiv.appendChild(titleEl);

        var temperature = document.createElement("div")
        temperature.textContent = "Temperature: " + data.list[0].main.temp
        currentDiv.appendChild(temperature);
     
        var humidity = document.createElement("div")
        humidity.textContent =  "Humidity: " + data.list[0].main.humidity
        currentDiv.appendChild(humidity);

        var icon = document.createElement("img") 
        icon.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
        currentDiv.appendChild(icon)

        fiveDayForecast (data)
    })
 }

 function fiveDayForecast (forecastData) {
    console.log (forecastData)
    var list = forecastData.list //returning the 40 items in the list

    for (var i = 0; i<list.length; i+=8) {
        var forecastDiv = document.getElementById("forecast")
    

        var titleEl = document.createElement("div")
        titleEl.textContent = "City: " 
        forecastDiv.appendChild(titleEl);

        var temperature = document.createElement("div")
        temperature.textContent = "Temperature: " + list[i].main.temp
        forecastDiv.appendChild(temperature);
     
        var humidity = document.createElement("div")
        humidity.textContent =  "Humidity: " + list[i].main.humidity
        forecastDiv.appendChild(humidity);

        var icon = document.createElement("img") 
        icon.src = "https://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png"
        forecastDiv.appendChild(icon)

    }
 }

 //create another container and append it to each one to that container, append that container to the forecastDiv instead of appending each item to forecastDiv
//*utilize loop
//create element, fill with with value, appened it to page
//traversy media DOM Manipulation
//vanilla js for complete beginners



searchForm.addEventListener("submit",function (event) {
    event.preventDefault()
    var searchTerm = document.getElementById("search-input").value
    getLatLon(searchTerm)
})

