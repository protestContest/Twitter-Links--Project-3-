
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.query = function(req, res) {
	track



	// var redis = require('redis');
	// var twitter = require('ntwitter')
	// var credentials = require('../credentials.js');

	// var client = redis.createClient();
	// var t = new twitter({
	// 	consumer_key: credentials.consumer_key,
	// 	consumer_secret: credentials.consumer_secret,
	// 	access_token_key: credentials.access_token_key,
	// 	access_token_secret: credentials.access_token_secret
	// });

	// t.verifyCredentials(function (error, data) {
	// 	if (error) {
	// 		console.log(error + '');
	// 		process.exit(1);
	// 	}
	// }).stream(
	// 	'statuses/filter',
	// 	{ track: [req.params.query] },
	// 	function(stream) {
	// 		stream.on('data', function(tweet) {
	// 			// res.send(tweet.text);
	// 			// console.log(tweet.text);
	// 			// //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
	// 			// if(tweet.text.match(/awesome/))
	// 			//     client.incr('awesome');
	// 			// if (tweet.text.match(/cool/))
	// 			//     client.incr('cool');
	// 			// if (tweet.text.match(/rad/))
	// 			//     client.incr('rad');
	// 			// if (tweet.text.match(/gnarly/))
	// 			//     client.incr('gnarly');
	// 			// if (tweet.text.match(/groovy/))
	// 			//     client.incr('groovy');
	// 		});
	// 	}
	// );

	// res.send(req.params.query);
};

