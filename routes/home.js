var dotenv = require('dotenv');
dotenv.load();

var name = "";

exports.view = function(req, res) {
   res.render('home', {"username":name, "mapsKey": process.env.GOOGLE_API_KEY});
};

exports.viewWithName = function(req, res) {
   name = req.body.username;
   res.render('home', {"username":name, "mapsKey": process.env.GOOGLE_API_KEY});
};
