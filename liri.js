require("dotenv").config();
const Twitter = require("Twitter");
// const Spotify = require("node-Spotify-api");
const config = require("./keys.js");
// var spotify = new Spotify('keys.spotify');
var twitter = new Twitter('keys.Twitter');
console.log("config")

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  });

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token:process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})
  

T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
    console.log(data)
  })
  T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
    console.log(data)
  })
