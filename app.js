var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./server/auth/passport');
var configs = require('../secretSquirrel/secret');
var private = require('./server/routes/private/index');
var form = require('./server/routes/form.js');
var auth = require('./server/routes/auth.js');
var index = require('./server/routes/index.js');
var isLoggedIn = require('./server/utils/auth');
var mongoURI = "mongodb://localhost:27017/EPF";
var session = require('express-session');
var MongoDB = mongoose.connect(mongoURI).connection;

//app.use('/public', express.static('public'));  // serve files from public
app.use(express.static('Volunteer/public'));
app.use(express.static('Admin/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

/**
 * Creates session that will be stored in memory.
 * @todo Before deploying to production,
 * configure session store to save to DB instead of memory (default).
 * @see {@link https://www.npmjs.com/package/express-session}
 */
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());

/** ---------- ROUTES ---------- **/
app.use('/', index);
app.use('/auth', auth);
app.use('/form', form);
app.use('/private', isLoggedIn, private);

//listen on port 3000
app.listen((process.env.PORT || '3000'), function(){
  console.log("listening on port 3000");
});
