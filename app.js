//module dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();

//query route
var query = require('./routes/query');

//json route
var data = require('./routes/data');

//routes
var index = require('./routes/index');
var home = require('./routes/home');
var mytrips = require('./routes/mytrips');
var newtrip = require('./routes/newtrip');
var pickroute = require('./routes/pickroute');
var setalert = require('./routes/setalert');
var edittrip = require('./routes/edittrip');
var findstop = require('./routes/findstop');
var detail = require('./routes/detail');

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/home', home.view);
app.get('/mytrips', mytrips.view);
app.get('/newtrip', newtrip.view);
app.get('/pickroute', pickroute.view);
app.get('/setalert', setalert.view);
app.get('/edittrip', edittrip.view);
app.get('/findstop', findstop.view);
app.get('/detail/:stopId', detail.view);

//json routes
app.get('/data/feed', data.feed);
app.get('/data/stops', data.stops);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
