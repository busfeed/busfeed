var dotenv = require('dotenv');
var allstops = require('../data/allstops');
var data = require('../routes/data');
var geos = require('../data/geo');

dotenv.load();

exports.view = function(req, res) {
   var stopId = parseInt((req.query.id) ? req.query.id : 0);
   console.log(geos.locations[stopId].id);
   res.render('detail', {
      "stopId": stopId,
      "stopName": allstops.stops[stopId],
      "goBack": req.header('Referer'),
      "tracked": data.feedList.feed.indexOf(stopId) > -1,
      "loc": geos.locations[stopId].geo,
      "mapsKey": process.env.GOOGLE_API_KEY,
      "top": true,
      "layout": "layout-testing"
   });
};

exports.view2 = function(req, res) {
   var stopId = parseInt((req.query.id) ? req.query.id : 0);
   console.log(geos.locations[stopId].id);
   res.render('detail', {
      "stopId": stopId,
      "stopName": allstops.stops[stopId],
      "goBack": req.header('Referer'),
      "tracked": data.feedList.feed.indexOf(stopId) > -1,
      "loc": geos.locations[stopId].geo,
      "mapsKey": process.env.GOOGLE_API_KEY,
      "top": false
   });
};
