/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var path = require('path');

//send authenticated users to index.html
router.get('/', function (req, res) {
  console.log('user logged in redirecting to index.html');
  res.sendFile(path.join(__dirname, '../../../Admin/public/views/index.html'));
});

// Admin tab:
var User = require('../../models/user');
var UserService = require('../../services/user');

router.get('/alladmins', function(req, res) {
  console.log('Route allAdmins hit.');
  User.find({}, function(err, users){
    console.log('Found: ', users);
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(users);
    }
  });
});

router.delete('/deleteadmin/:email', function(req, res){
  User.remove({googleEmail: req.params.email}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/addadmin/:email', function(req, res){
  UserService.createGoogleUser('', '', '', req.params.email, function(err, user){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;


// router.get('/', function (req, res) {
//   if (req.isAuthenticated()) {
//     res.json({ status: true, name: req.user.googleName });
//   } else {
//     res.json({ status: false });
//   }
//
// });
