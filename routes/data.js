var feed = require('../data/feed');
var stops = require('../data/stops');

exports.feed = function(req, res) {
   res.json(feed);
}

exports.stops = function(req, res) {
   res.json(stops);
}
