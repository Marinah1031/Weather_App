var APIkey = "1801"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//1801 is the api key
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
api.openweathermap.org/data/2.5/forecast?q={Austin}&appid={1801}

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