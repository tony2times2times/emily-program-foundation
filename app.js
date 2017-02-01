var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var router = require('./routes/index.js');
var mongoURI = "mongodb://localhost:27017/EPF";
var MongoDB = mongoose.connect(mongoURI).connection;
var session = require('express-session');
var configs = require('./config/auth');
var passport = require('./config/passport');




//app.use('/public', express.static('public'));  // serve files from public
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

//listen on port 2305
app.listen((process.env.PORT || '3000'), function(){
  console.log("Go ahead I'm listening.");
});


app.use('/', router);

app.use('/private', isLoggedIn, private);
