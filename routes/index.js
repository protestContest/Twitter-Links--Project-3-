
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.query = function(req, res) {
	
	// var redis = require('redis');
	// var client = redis.createClient();
	// res.render('query', { title: req.params.query});
};