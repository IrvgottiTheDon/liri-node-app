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
    // function spotifySearch(){
    //     spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
    //         if (err) {
    //           return console.log('Error occurred: ' + err);
    //         }
    //        var returnSearch =(data.tracks.items[0]);
    //        var songName = returnSearch.name
    //        var spotifyLink = returnSearch.preview_url
    //        var artistName = returnSearch.artists[0].name
    //        var album = returnSearch.album.name
    //       // console.log(returnSearch); 
    //       console.log(returnSearch.preview_url)
    //       console.log(songName)
    //       console.log(spotifyLink)
    //       console.log(artistName)
    //       console.log(album)
    //       });
    // }
    function spotifySearch() {
        spotify.search({ type: 'track', query: value, limit: 1 }, function (err, data) {
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
     
     