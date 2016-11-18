var allstops = require('../data/allstops');
var stops = require('../data/stops');
var feed = require('../data/feed');
var pings = require('../data/pings');
var geos = require('../data/geo');
var accounts = require('../data/accounts');

exports.feedList = feed;

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

var todaypings = {};
for (var i=0; i < 29; i++) {
   todaypings[""+i] = JSON.parse(JSON.stringify(intervalObj));
}

exports.feed = function(req, res) {
   var date = new Date();
   var hour = date.getHours();
   var minutes = date.getMinutes();
   var key = "" + (hour * 100 + Math.floor(minutes / 30) * 30);
   var f = {"feed":[]};
   for (var i in feed.feed) {
      console.log(key);
      f.feed.push({"id":feed.feed[i], "name":allstops.stops[parseInt(feed.feed[i])], "pings":todaypings[feed.feed[i]][key]});
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
   var day = parseInt(req.params.day);
   var stopId = parseInt(req.params.stopId);

   var p_obj = {"domain":[], "range":[]};
   var daypings = allpings[stopId][day];
   for (var key in daypings) {
      if (daypings.hasOwnProperty(key)) {
         p_obj.domain.push(key);
         p_obj.range.push(daypings[key]);
      }
   }

   var t_obj = {"domain":[], "range":[]};
   var today = todaypings[stopId];
   for (var key in today) {
      if (today.hasOwnProperty(key)) {
         t_obj.domain.push(key);
         t_obj.range.push(today[key]);
      }
   }
   res.json({"past": p_obj, "curr": t_obj});
};

exports.newPing = function(req, res) {
   var date = new Date();
   var hour = date.getHours();
   var minutes = date.getMinutes();
   var key = ""+(hour * 100 + Math.floor(minutes / 30) * 30);
   todaypings[req.params.stopId][key]++;
   console.log(req.params.stopId, key);
   res.send("pinged");
};

exports.trackStop = function(req, res) {
   feed.feed.push(req.params.stopId);
   res.send("tracked");
}

exports.untrackStop = function(req, res) {
   feed.feed.splice(feed.feed.indexOf(req.params.stopId), 1);
   res.send("untracked");
}

exports.getGeos = function(req, res) {
   res.send(geos);
}

exports.newUser = function(req, res) {
   var user = req.params.user;
   var pw = req.params.pw;
   accounts[user] = pw;
   res.send("valid");
}

exports.verify = function(req, res) {
   var user = req.params.user;
   var pw = req.params.pw;
   console.log(user, pw);
   if (accounts[user]) {
      if (accounts[user] == pw) {
         console.log("match");
         res.send("valid");
      }
      else {
         console.log("wrong pw");
         res.send("invalid");
      }
   }
   else {
      console.log("wrong user");
      res.send("invalid");
   }
}
