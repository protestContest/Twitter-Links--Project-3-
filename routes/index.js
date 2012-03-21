
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.query = function(req, res) {
	var tracker = require('../tracker.js');
	tracker.track(req.params.query);

	res.render('query', { title: req.params.query });
	// var response = '<script src="/socket.io/socket.io.js"></script>';
	// response += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>';
	// response += '<script>var socket = io.connect("localhost");';
 //    response += 'socket.on("update", function(data) {';
 //    response += ' $("#title").html("Query: " + data.key);';
 //    response += ' $("#tweets").append("<div class=tweet style=\'border-top: 1px solid black; margin-top: 10px; border-top: 10px;\'>" + data.text + "</div>");';
 //    response += '});</script>';
 //    response += '<div id=title></div>';
 //    response += '<div id=tweets></div>';
 //    res.writeHead(200, {'Content-Type': 'text/html'});
 //    res.end(response);
};

