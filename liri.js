require("dotenv").config();

var keys = require('./keys.js');
var fs = require('fs')
var Twitter = require('twitter');
var request = require('request');
var imdb = require('imdb-api');
var Spotify = require('node-spotify-api');
var client = new Twitter(keys.twitter);
var params = {
	screen_name: "mohawk502", count: 2
}
var command = process.argv[2];
var action = process.argv[3];

switch (command) {
	case "my-tweets":
		result = myTweets();
		break;
	case "spotify-this-song":
		result = spotifySong(action);
		break;
	case "movie-this":
		result = movieThis();
		break;
	case "do-what-it-says":
		result = whatItSays();
		break;
}

function myTweets() {
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error && response.statusCode == 200) {
			console.log(('=============== LOG ENTRY BEGIN ===============\r\n'));
			for (var index = 0; index < tweets.length; index++) {
				var number = index + 1
				console.log((number + '. Tweet: ' + tweets[index].text + '\r\nCreated at: ' + tweets[index].created_at + ' \r\n'));
			}
			console.log(('=============== LOG ENTRY END ===============\r\n \r\n'))
		} else { console.log(error) };
	}
	)
};


function movieThis() {
	request("http://www.omdbapi.com/?&t=" + action + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

		//  the body output from the api request is a string that will be returned from the api in a JSON format. the code on line 50 is grabbing the string and 'parseing' it to the body object so that we can view it in the correct format.
		if (!error && response.statusCode === 200) {
			console.log(('=============== LOG ENTRY BEGIN ===============\r\n'));
			var jsonBody = JSON.parse(body);
			console.log(error);
			console.log("\r\n Title: " + jsonBody.Title);
			console.log("\r\n Year: " + jsonBody.Year);
			console.log("\r\n Rating: " + jsonBody.imdbRating);
			console.log("\r\n Rotten Tomatoes Rating: " + jsonBody.Ratings[1].Value);
			console.log("\r\n Country: " + jsonBody.Country);
			console.log("\r\n Language: " + jsonBody.Language);
			console.log("\r\n Plot: " + jsonBody.Plot);
			console.log("\r\n Starring: " + jsonBody.Actors);
			console.log(('=============== LOG ENTRY END ===============\r\n \r\n'))
		}
	});


}

function spotifySong(action) {
	if (action == null) {
		action = 'somewhere over the rainbow';
	}
	var spotify = new Spotify({
		id: keys.spotify.id,
		secret: keys.spotify.secret
	});

	spotify.search({ type: 'track', query: action }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var song = data.tracks.items[0];

		var printsong = {
			'Artist(s)': song.artists[0].name,
			'Name': song.name,
			'Preview Link': song.preview_url,
			'Album': song.album.name
		}
		console.log(('=============== LOG ENTRY BEGIN ===============\r\n'));
		console.log(JSON.stringify(printsong, null, 2));
		console.log(('=============== LOG ENTRY END ===============\r\n \r\n'))
	});
}

function whatItSays() {
	fs.readFile('random.txt', 'utf8', function (error, data) {
		if (error) {
			console.log(error);
		} else {
			var dataArr = data.split(',');
			if (dataArr[0] === 'spotify') {
				spotifySong(dataArr[1]);
			}
			if (dataArr[0] === 'omdb') {
				movieThis(dataArr[1]);
			}
		}
	});
} 