var APIkey = "ca4d6748746f7b31b9c0e7609d98f397"
var searchForm = document.getElementById("search-form")

function getLatLon (city) {
    console.log (city)
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
    fetch (geoURL).then (response => response.json ()).then (data => {
        var cityname = data[0].name
        var lat = data[0].lat
        var lon = data[0].lon
        var temp = data[0].temp
        getTodayWeather (cityname, lat, lon, temp)
    })
}
 function getTodayWeather (cityname, lat, lon) {
    var weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
    fetch (weatherURL).then (response => response.json ()).then (data => {
        console.log (data)
        var titleEl = document.createElement("div")
        titleEl.textContent = cityname 
        document.getElementById ("current").
        appendChild(titleEl);

        var temperature = document.createElement("div")
        temperature.textContent = temperature 
        document.getElementById ("current").appendChild(temperature);

    })
 }
 
//create element, fill with with value, appened it to page
//traversy media DOM Manipulation
//vanilla js for complete beginners



searchForm.addEventListener("submit",function (event) {
    event.preventDefault()
    var searchTerm = document.getElementById("search-input").value
    getLatLon(searchTerm)
})

