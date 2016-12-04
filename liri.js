var command = process.argv[2];
var lookup = process.argv[3];

var tKeys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require("fs");

switch(command) {
	case 'my-tweets': 
		getTwitter();
		break;
	
	case 'spotify-this-song':
		getSpotify(lookup);
		break;

	case 'movie-this':
		getOMDB(lookup);
		break;
	
	case 'do-what-it-says':
		fs.readFile("random.txt", "utf8", function(err, data) {
    		data = data.split(",");
    		randomCommand = data[0];
    		randomLookup = data[1];
    		
    		if(randomCommand === 'my-tweets')
    			getTwitter();

    		else if(randomCommand === 'spotify-this-song')
    			getSpotify(randomLookup);   

    		else if(randomCommand === 'movie-this')
    			getOMDB(randomLookup); 			
  		});
		break;
}

function getTwitter() {
	var client = new Twitter({
		consumer_key: tKeys.twitterKeys.consumer_key,
 		consumer_secret: tKeys.twitterKeys.consumer_secret,
 		access_token_key: tKeys.twitterKeys.access_token_key,
 		access_token_secret: tKeys.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'mockingjaylyft'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for(var i = 0; i < 20; i++)
    			console.log(tweets[i].created_at + " " + tweets[i].text);
  		}
	});
}

function getSpotify(argvLookup) {

	var trackTitle = argvLookup;

	if(trackTitle === undefined) {
		spotify.search({ type: 'track', query: 'ace of base the sign' }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	}

 		console.log("Artist: " + data.tracks.items[0].artists[0].name + "\n" + 
 			        "Song Name: " + data.tracks.items[0].name + "\n" + 
   				    "Preview Link: "+ data.tracks.items[0].preview_url + "\n" + 
   				    "Album: " + data.tracks.items[0].album.name);
		});
	}

	else {
		spotify.search({ type: 'track', query: trackTitle }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
	
   		console.log("Artist: " + data.tracks.items[0].artists[0].name + "\n" + 
 			        "Song Name: " + data.tracks.items[0].name + "\n" + 
   				    "Preview Link: "+ data.tracks.items[0].preview_url + "\n" + 
   				    "Album: " + data.tracks.items[0].album.name);
   		});
	}
}

function getOMDB(argvLookup) {

	var movieTitle = argvLookup;
	var omdbQuery;

	if(movieTitle === undefined) {
		omdbQuery = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&r=json&tomatoes=true";
		request(omdbQuery, function(error, response, body) {
  			if (!error && response.statusCode == 200) {
    			console.log("Title: " + JSON.parse(body).Title + "\n" + 
    						"Year: " + JSON.parse(body).Year + "\n" + 
    						"IMDB: " + JSON.parse(body).imdbRating + "\n" + 
    						"Country: " + JSON.parse(body).Country + "\n" + 
    						"Language: " + JSON.parse(body).Language + "\n" + 
    						"Plot: " + JSON.parse(body).Plot + "\n" + 
    						"Actors: " + JSON.parse(body).Actors + "\n" + 
    						"Rotten Tomatos Rating: " + JSON.parse(body).tomatoRating + "\n" + 
    						"Rotten Tomatos URL: " + JSON.parse(body).tomatoURL);
  			}
		});
	}

	else {
		var omdbQuery = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true";
		request(omdbQuery, function(error, response, body) {
  			if (!error && response.statusCode == 200) {
    			console.log("Title: " + JSON.parse(body).Title + "\n" + 
    						"Year: " + JSON.parse(body).Year + "\n" + 
    						"IMDB: " + JSON.parse(body).imdbRating + "\n" + 
    						"Country: " + JSON.parse(body).Country + "\n" + 
    						"Language: " + JSON.parse(body).Language + "\n" + 
    						"Plot: " + JSON.parse(body).Plot + "\n" + 
    						"Actors: " + JSON.parse(body).Actors + "\n" + 
    						"Rotten Tomatos Rating: " + JSON.parse(body).tomatoRating + "\n" + 
    						"Rotten Tomatos URL: " + JSON.parse(body).tomatoURL);
  			}
		});
	}
}