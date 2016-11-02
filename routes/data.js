var allstops = require('../data/allstops');
var stops = require('../data/stops');
var feed = require('../data/feed');
var pings = require('../data/pings');

exports.feed = function(req, res) {
   var f = {"feed":[]};
   for (var i in feed.feed) {
      f.feed.push({"id":feed.feed[i], "name":allstops.stops[parseInt(feed.feed[i])]});
   }
   res.json(f);
}

exports.stops = function(req, res) {
   var s = {};
   for (var key in stops) {
      if (stops.hasOwnProperty(key)) {
         s[key] = [];
         for (var i in stops[key]) {
            s[key].push({"id":stops[key][i], "name":allstops.stops[parseInt(stops[key][i])]});
         }
      }
   }
   res.json(s);
}
