var allstops = require('../data/allstops');
var data = require('../routes/data');

exports.view = function(req, res) {
   res.render('detail', {
      "stopId": req.params['stopId'],
      "stopName": allstops.stops[parseInt(req.params['stopId'])],
      "goBack": req.header('Referer'),
      "tracked": data.feedList.feed.indexOf(req.params.stopId) > -1,
      "loc": {"lat": 32.87715, "long": -117.23571}
   });
};
