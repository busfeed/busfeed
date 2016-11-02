var name = "";

exports.view = function(req, res) {
   res.render('home', {"username":name});
};

exports.viewWithName = function(req, res) {
   name = req.body.username;
   res.render('home', {"username":name});
};
