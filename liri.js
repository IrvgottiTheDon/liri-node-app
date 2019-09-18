require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
var childProcess = require('child_process');

switch (action) {
    case "spotify-this-song":
        spotifySearch()
        break;

    case "concert-this":
        concertThis()
        break;

    case "movie-this":
        movieThis()
        break;

    case "do-what-it-says":
        doWhatItSays()
        break;

    default:
        console.log('error');
        break;
}

function spotifySearch() {
    // IF NO SONG IS PROVIDED
    if (value == '') {
        value = 'The Sign';
    }
    spotify.search({
        type: 'track',
        query: value,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var returnSearch = data.tracks.items[0]
        var songName = returnSearch.name
        var spotifyLink = returnSearch.preview_url
        var album = returnSearch.album.name
        var artistName = returnSearch.artists[0].name
        //   console.log(returnSearch);
        console.log(artistName)
        console.log(songName)
        console.log(spotifyLink)
        console.log(album)
    });
}

function concertThis() {
    // IF NO ARTIST IS PROVIDED
    if (value == '') {
        value = '50 Cent';
    }
    var searchString = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
    //console.log(searchString);

    const axios = require('axios');
    const moment = require('moment');

    // Make a request for a user with a given ID
    axios.get(searchString)
        .then(function (response) {
            // handle success
            //console.log(response);

            var nameOfVenue = response.data[0].venue.name;
            var venueCity = response.data[0].venue.city;
            var venueCountry = response.data[0].venue.country;
            var dateOfEvent = new Date(response.data[0].datetime);

            var monthOfEvent = dateOfEvent.getMonth();
            var dayOfEvent = dateOfEvent.getDate();
            var yearOfEvent = dateOfEvent.getFullYear();

            console.log(value);
            console.log(nameOfVenue)
            console.log(venueCity + ', ' + venueCountry);
            console.log(monthOfEvent + '/' + dayOfEvent + '/' + yearOfEvent);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function movieThis() {

    // IF NO MOVIE IS PROVIDED
    if (value == '') {
        value = 'Mr Nobody';
    }

    var url = "http://www.omdbapi.com/?apikey=54ab42fb&t=" + value;
    var axios = require("axios");
    axios

        .get(url)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!

            var Title = response.data.Title;
            var ReleaseYear = response.data.Year;
            var IMDBRating = response.data.Ratings[0].Value;
            var RottenTomatoesRating = response.data.Ratings[1].Value;
            var countryProduced = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;


            console.log(Title);
            console.log(ReleaseYear);
            console.log(IMDBRating);
            console.log(RottenTomatoesRating);
            console.log(countryProduced);
            console.log(language);
            console.log(plot);
            console.log(actors);
        })


}

function doWhatItSays() {

    var fs = require("fs");

    // Asynchronous read
    fs.readFile('random.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }

        var array = data.toString().split(',');

        function runScript(scriptPath, callback) {

            // keep track of whether callback has been invoked to prevent multiple invocations
            var invoked = false;
        
            var process = childProcess.fork(scriptPath,[array[0],array[1]]);
        
            // listen for errors as they may prevent the exit event from firing
            process.on('error', function (err) {
                if (invoked) return;
                invoked = true;
                callback(err);
            });
        
            // execute the callback once the process has finished running
            process.on('exit', function (code) {
                if (invoked) return;
                invoked = true;
                var err = code === 0 ? null : new Error('exit code ' + code);
                callback(err);
            });
        
        }

        runScript('./liri.js', function (err) {
            if (err) throw err;
        });
    });
}
