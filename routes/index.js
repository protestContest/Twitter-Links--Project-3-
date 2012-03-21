
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.query = function(req, res) {
	var tracker = require('../tracker.js');
	tracker.track(req.params.query);
	console.log('-- Tracking ' + req.params.query);

	res.render('query', { title: req.params.query });
};

