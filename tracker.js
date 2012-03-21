exports.track = function (query) {
	var twitter = require('ntwitter');
	var cred = require('./credentials.js');
	var redis = require('redis');
	var io = require('socket.io');

	var client = redis.createClient();
	var t = new twitter({
		consumer_key: cred.consumer_key,
		consumer_secret: cred.consumer_secret,
		access_token_key: cred.access_token_key,
		access_token_secret: cred.access_token_secret
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
				client.incr('tweets.count');
				var message = {key:query, text:tweet};
				client.publish('update', JSON.stringify(message));
			}); //stream.on
		} //function(stream)
	); //stream

}
