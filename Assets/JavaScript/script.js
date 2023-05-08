var APIkey = "ca4d6748746f7b31b9c0e7609d98f397"
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + {lat}&lon={lon} + "&appid=" + {API key}
api.openweathermap.org/data/2.5/forecast?q={Austin}&appid={1801}
 //atlanta: [33.749, -84.388]
 //denver:
 //San Francisco
 //Seattle
 //Orlando:
 //New York:
 //Austin:
 //Chicago:
fetch(queryURL)

var getRepoIssues = function (repo) {
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
  
    fetch(queryUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (weather) {
          displayIssues(weather);
  
          // Since GitHub only returns 30 results at a time, we check to see if there's more than 30 by looking for a next page URL in the response headers.
          if (response.headers.get('Link')) {
            displayWarning(repo);
          }
        });
      } else {
        document.location.replace('./index.html');
      }
    });
  };

  //Questions:
  //How to connect css to my default browser
  //I can't seem to get my api link to work
  //confirm the apikey
  //