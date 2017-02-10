var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./server/auth/passport');
var configs = require('../secretSquirrel/secret');
//routes folder
var private = require('./server/routes/private/index');
var form = require('./server/routes/form.js');
var auth = require('./server/routes/auth.js');
var applicantRouter = require('./server/routes/applicant.js');
var emailTemplateRouter = require('./server/routes/emailTemplate.js');
var isLoggedIn = require('./server/utils/auth');
//USE THIS DATA FOR ROBO MONGO CONNECTION TO SHARED DB **NOT PRODUCTION**
//USERNAME:EPFG
//PASSWORD:96Y3ohjxVDdCse0b16kB
//address:ds159507.mlab.com
//PORT: 59507
//DATABSE NAME: heroku_6d86ggqz
var mongoURI = "mongodb://EPFG:96Y3ohjxVDdCse0b16kB@ds159507.mlab.com:59507/heroku_6d86ggqz";
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
app.use('/auth', auth);
app.use('/', form);
app.use('/private', isLoggedIn, private);
app.use('/applicant', applicantRouter);
app.use('/emailTemplate', emailTemplateRouter);


//listen on port 3000
app.listen((process.env.PORT || '3000'), function(){
  console.log("listening on port 3000");
});

// Temporary code to make all Prime group members admins.
// Remove in production code, maybe.

var init = require('./server/utils/init');
init();
