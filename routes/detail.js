var dotenv = require('dotenv');
var allstops = require('../data/allstops');
var data = require('../routes/data');
var geos = require('../data/geo');

dotenv.load();

exports.view = function(req, res) {
   var stopId = parseInt(req.params.stopId);
   console.log(geos.locations[stopId].id);
   res.render('detail', {
      "stopId": req.params['stopId'],
      "stopName": allstops.stops[stopId],
      "goBack": req.header('Referer'),
      "tracked": data.feedList.feed.indexOf(req.params.stopId) > -1,
      "loc": geos.locations[stopId].geo,
      "mapsKey": process.env.GOOGLE_API_KEY
   });
};
