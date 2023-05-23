var APIkey = "ca4d6748746f7b31b9c0e7609d98f397"  //Weather api 
var searchForm = document.getElementById("search-form")


function saveCity(city) {
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []; // Get the search history list from Local Storage or create a new array if it doesn't exist
    console.log(cityHistory);
    if (!cityHistory.includes(city)) { // Check if the city is already in the search history
      cityHistory.push(city); // Add the city to the search history
      localStorage.setItem("cityHistory", JSON.stringify(cityHistory)); // Save the updated search history to Local Storage
    }
  }

  function displayLocalStorage() {
    var localStorageKeys = Object.keys(localStorage);
    for (var i = 0; i < localStorageKeys.length; i++) {
      var key = localStorageKeys[i];
      var value = localStorage.getItem(key);
      console.log(key + " = " + value);
    }
  }
  
  displayLocalStorage();
  
  
  function getLatLon(city) {
    console.log(city)
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
    fetch(geoURL)
      .then(response => response.json())
      .then(data => {
        var cityname = data[0].name
        console.log(data[0])
        var lat = data[0].lat
        var lon = data[0].lon
        saveCity(cityname); // Save the city to local storage
        getTodayWeather(cityname, lat, lon);
      })
  }
  
function getTodayWeather(cityname, lat, lon) {
    
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
    fetch(weatherURL).then(response => response.json()).then(data => {
        var currentDiv = document.getElementById("current")
        console.log(data)
        currentDiv.textContent = ""

        var titleDiv = document.createElement("div")
        titleDiv.textContent = "Today's Weather"
        currentDiv.appendChild(titleDiv)

        var titleEl = document.createElement("div")
        titleEl.textContent = "City: " + cityname;
        currentDiv.appendChild(titleEl);

        var temperature = document.createElement("div")
        temperature.textContent = "Temperature: " + data.list[0].main.temp;
        currentDiv.appendChild(temperature);

        var humidity = document.createElement("div")
        humidity.textContent = "Humidity: " + data.list[0].main.humidity;
        currentDiv.appendChild(humidity);

        var icon = document.createElement("img");
        icon.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
        currentDiv.appendChild(icon);

        fiveDayForecast(data);
    })
}

function fiveDayForecast(forecastData) {
    console.log(forecastData);
    var list = forecastData.list;
    var city = forecastData.city.name;
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var forecastDiv = document.getElementById("forecast");
     forecastDiv.innerHTML = "";
    for (var i = 0; i < list.length; i += 8) {
        var forecastDay = document.createElement("div"); // create a container for each day's forecast
        forecastDay.classList.add("forecast-day"); // add a class to the container for styling purposes

        forecastDiv.appendChild(forecastDay); // append the container to the forecastDiv

        // Get the date and convert it to a day of the week
        var date = new Date(list[i].dt * 1000); // convert UNIX timestamp to milliseconds
        var weekday = daysOfWeek[date.getDay()];
        var weekdayEl = document.createElement("div");
        weekdayEl.textContent = weekday;
        forecastDay.appendChild(weekdayEl);
    

        var titleEl = document.createElement("div");
        titleEl.textContent = "City: " + city
        forecastDay.appendChild(titleEl); // append the title to the container

        var temperature = document.createElement("div");
        temperature.textContent = "Temperature: " + list[i].main.temp;
        forecastDay.appendChild(temperature);

        var humidity = document.createElement("div");
        humidity.textContent = "Humidity: " + list[i].main.humidity;
        forecastDay.appendChild(humidity);

        var icon = document.createElement("img");
        icon.src =
            "https://openweathermap.org/img/wn/" +
            list[i].weather[0].icon +
            "@2x.png";
        forecastDay.appendChild(icon); // append the icon to the container
        forecastDiv.appendChild(forecastDay);
    }
}


  
//create another container and append it to each one to that container, append that container to the forecastDiv instead of appending each item to forecastDiv
//*utilize loop
//create element, fill with with value, appened it to page
//traversy media DOM Manipulation
//vanilla js for complete beginners



searchForm.addEventListener("submit", function (event) {
    event.preventDefault()
    var searchTerm = document.getElementById("search-input").value
    getLatLon(searchTerm)
})

