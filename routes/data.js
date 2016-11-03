var allstops = require('../data/allstops');
var stops = require('../data/stops');
var feed = require('../data/feed');
var pings = require('../data/pings');

var intervalObj = {};
for (var i=7; i < 24; i++) {
   for (var k=0; k < 2; k++) {
      var key = "" + (i * 100 + k * 30);
      intervalObj[key] = 0;
   }
}

var pingsArr = [];
for (var i=0; i < 7; i++) {
   pingsArr.push(JSON.parse(JSON.stringify(intervalObj)));
}

var allpings = {};
for (var i=0; i < 29; i++) {
   allpings[""+i] = JSON.parse(JSON.stringify(pingsArr));
}

for (var p in pings.pings) {
   var stopId = pings.pings[p].id;
   var date = new Date(pings.pings[p].stamp * 1000);
   var day = date.getDay();
   var hour = date.getHours();
   var minutes = date.getMinutes();
   var key = "" + (hour * 100 + Math.floor(minutes / 30) * 30);
   allpings[stopId][day][key]++;
}

exports.feed = function(req, res) {
   var f = {"feed":[]};
   for (var i in feed.feed) {
      f.feed.push({"id":feed.feed[i], "name":allstops.stops[parseInt(feed.feed[i])]});
   }
   res.json(f);
};

exports.stops = function(req, res) {
   var s = {};
   for (var key in stops) {
      if (stops.hasOwnProperty(key)) {
         s[key] = [];
         for (var i in stops[key]) {
            s[key].push({"id":stops[key][i], "name":allstops.stops[parseInt(stops[key][i])]});
         }
      }
   }
   res.json(s);
};

exports.chart = function(req, res) {
   var day = new Date().getDay();
   var stopId = parseInt(req.params.stopId);
   var obj = {"domain":[], "range":[]};
   var daypings = allpings[stopId][day];
   for (var key in daypings) {
      if (daypings.hasOwnProperty(key)) {
         obj.domain.push(key);
         obj.range.push(daypings[key]);
      }
   }
   res.json(obj);
};

exports.newPing = function(req, res) {
   console.log(req.params.stopId);
   res.send("pinged");
};
