var allstops = require('../data/allstops');

exports.view = function(req, res){
  res.render('findstop', allstops);
};
