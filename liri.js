//initialize required modules
require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
//var fs = require("fs");
//var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

//organize argv arguments
var action = process.argv[2];
var nodeArg = process.argv
var nodeArr = [];
for (var i = 3; i < nodeArg.length; i++) {
    nodeArr.push(nodeArg[i]);
};
var nodeValue = nodeArr.join("+");
var queryUrl = "http://www.omdbapi.com/?t=" + nodeValue + "&y=&plot=short&apikey=trilogy";
var options = {  
    url: queryUrl,
    method: "GET",
};

function tweets() {
    console.log("tweetsDone");
};

function spotifySong() {
    //console.log("spotifyDone");
    spotify.search({ 
        type: "track",
        query: nodeValue
    }, function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
        } else {
            //console.log("*********************************")
            //console.log(JSON.stringify(data, null, 2));
            //console.log("*********************************")
            for (i = 0; i < data.tracks.items.length; i++) {
                console.log("Result # " + (i + 1));
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Track: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("Explicit content: " + data.tracks.items[i].explicit);
                console.log("Link to song: " + data.tracks.items[i].external_urls.spotify);
                console.log("*********************************");
            };
        }; 
    });
};

function movie() {
    request(options, function(err, res, body) {
        if (err){
            console.log("Error occurred: " + err);
        } else {
            var json = JSON.parse(body);
            console.log("Title: " + json.Title);
            console.log("Director: " + json.Director);
            console.log("Release date: " + json.Released);
            console.log("Rating: " + json.Rated);
            console.log("Language: " + json.Language);
            console.log("Plot: " + json.Plot);
            console.log("Cast: " + json.Actors);
            console.log("Ratings: \n  IMDB: " + json.Ratings[0].Value + "\n  Rotten Tomatoes: " + json.Ratings[1].Value + "\n  Metacritic: " + json.Ratings[2].Value);
        };
    });
};

function command() {
    console.log("commandDone");
};

if (action == "my-tweets") {
    console.log("tweets");
    tweets();
} else if (action == "spotify-this-song") {
    //console.log("spotify");
    spotifySong();
} else if (action == "movie-this") {
    console.log("movie");
    movie();
} else if (action == "do-what-it-says") {
    console.log("command");
    command();
} else {
    console.log("Invalid entry");
};