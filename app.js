
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , redis = require('redis')
  , twitter = require('ntwitter')
  , credentials = require('./credentials.js');

var client = redis.createClient();
var t = new twitter({
	consumer_key: credentials.consumer_key,
	consumer_secret: credentials.consumer_secret,
	access_token_key: credentials.access_token_key,
	access_token_secret: credentials.access_token_secret
});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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
app.get('/query/:query', routes.query);

app.listen(3000);

var sio = io.listen(app);
sio.sockets.on('connection', function (socket) {
	console.log('A socket connected!');
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
