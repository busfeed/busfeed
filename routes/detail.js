var allstops = require('../data/allstops');

exports.view = function(req, res) {
   console.log(req.header('Referer'));
   res.render('detail', {
      "stopId": req.params['stopId'],
      "stopName": allstops.stops[parseInt(req.params['stopId'])],
      "goBack": req.header('Referer')
   });
};
