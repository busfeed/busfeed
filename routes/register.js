
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('register', {layout: "layout-landing"});
};
