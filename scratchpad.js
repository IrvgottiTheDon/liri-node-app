var url = "http://www.omdbapi.com/?apikey=54ab42fb&t=shrek"
var axios = require("axios");
axios

      .get(url)
      .then(function (response) {
          // If the axios was successful...
          // Then log the body from the site!
          console.log(response.data) 
        })