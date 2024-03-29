
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, io = require('socket.io')
	, redis = require('redis')
	, twitter = require('ntwitter')
	, credentials = require('./credentials.js')
	, tracker = require('./tracker.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
// app.post('/query/', routes.get_query);
app.get('/query/:query', routes.query);

app.listen(3000);

// socket.io

var sio = io.listen(app);
sio.sockets.on('connection', function (socket) {
	var listener = redis.createClient();

	listener.subscribe('update');
	listener.on('message', function(channel, msg) {
		// console.log('io: ' + msg);
		var message = JSON.parse(msg);
		socket.emit('update', { key: message.key, text: message.text });
	});
	
	console.log('A socket connected!');
});
sio.sockets.on('disconnection', function (socket) {
	console.log('Socket disconnected');
});

sio.configure('development', function() {
	sio.set('log level', 1);
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
