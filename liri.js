//initialize required modules
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
var keys = require("./keys");
require("dotenv").config();
var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

//organize argv arguments
var action = process.argv[2];
var nodeArg = process.argv
var nodeArr = [];
for (var i = 3; i < nodeArg.length; i++) {
    nodeArr.push(nodeArg[i]);
};
var nodeValue = nodeArr.join(" ");

function tweets() {
    //content
};

function spotify() {
    spotify.search({ 
        type: 'artist OR album OR track',
        query: nodeValue
    }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
        }
        console.log(data); 
    });
};

function movie() {
    //content
};

function command() {
    //content
};

switch (action) {
    case "my-tweets":
    tweets();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    command();
    break;
};