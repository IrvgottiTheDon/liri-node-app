require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

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

    var searchString = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
    console.log(searchString);

    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get(searchString)
        .then(function (response) {
            // handle success
            console.log(response);
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
    var url = "http://www.omdbapi.com/?apikey=54ab42fb&t=" + value;
    var axios = require("axios");
    axios

        .get(url)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data)
        })


}

function doWhatItSays() {

    var fs = require("fs");

    // Asynchronous read
    fs.readFile(value, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
    });

    // Synchronous read
    var data = fs.readFileSync(value);
    console.log("Synchronous read: " + data.toString());

    console.log("Program Ended");

}