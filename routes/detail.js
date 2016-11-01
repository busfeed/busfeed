var stops = require('../data/stops');

exports.view = function(req, res) {
   console.log(req.header('Referer'));
   res.render('detail', {"stopName": req.params['stopName'], 'goBack': req.header('Referer')});
};
