var mysql = require('mysql');
var dotenv = require('dotenv');

dotenv.load();

//connect to database
var connection = mysql.createConnection({
   host: process.env.CLEARDB_HOST,
   user: process.env.CLEARDB_USERNAME,
   password: process.env.CLEARDB_PASSWORD,
   database: process.env.CLEARDB_DATABASE
});
