exports.track = function (query) {
	var twitter = require('ntwitter');
	var cred = require('./credentials.js');
	var redis = require('redis');
	var io = require('socket.io');
	var fs = require('fs');

	var client = redis.createClient();
	var t = new twitter({
		consumer_key: cred.consumer_key,
		consumer_secret: cred.consumer_secret,
		access_token_key: cred.access_token_key,
		access_token_secret: cred.access_token_secret
	});
	var afinn = {};

	fs.readFile('AFINN.json', 'ascii', function(err, data) {
		if (err) {
			console.error('File read error: %s', err);
			process.exit(1);
		}

		afinn = JSON.parse(data);
		// console.log(afinn);
	});

	t.verifyCredentials(function (error, data) {
		if (error) {
			console.log(error + '');
			process.exit(1);
		}
	}).stream(
		'statuses/filter',
		{ track: [query] },
		function(stream) {
			if (query==='') return;
			stream.on('data', function(tweet) {
				// console.log(tweet.user.lang);
				if (tweet.user.lang=='en') {
					var sentiment = 0;
					tweet.text.split(' ').forEach(function(word) {
						if (afinn.hasOwnProperty(word)) {
							// console.log(afinn[word]);
							sentiment += afinn[word];
						}
					});
					tweet.sentiment = sentiment;

					client.incr('tweets.count');
					var message = {key:query, text:tweet};
					client.publish('update', JSON.stringify(message));
				}
			}); //stream.on
		} //function(stream)
	); //stream

}
