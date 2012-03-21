
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.query = function(req, res) {
	var tracker = require('../tracker.js');
	tracker.track(req.params.query);

	var response = '<script src="socket.io/socket.io.js"></script>';
	response += '<script>var socket = io.connect("localhost");';
    response += 'socket.on("update", function(data) {';
    response += ' $("#cool").append(data.text);';
    response += '});</script>';
    response += '<b>Hello from my http server!!</b> <br/>';
    response += '<p>Total awesome: <span id="awesome"></span></p>';
    response += '<p>Total cool: <span id="cool"></span></p>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(response);

	// res.send(req.params.query);

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

