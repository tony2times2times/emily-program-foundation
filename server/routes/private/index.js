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
var Skill = require('../../models/skills');
var Interest = require('../../models/interests');
var EssayQ = require('../../models/essayQuestions');
var UserService = require('../../services/user');

router.get('/alladmins', function(req, res) {
  User.find({}, function(err, users){
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

router.get('/allskills', function(req, res) {
  console.log('Route allSkills hit.');
  Skill.find({}, function(err, skills){
    console.log('Found: ', skills);
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(skills);
    }
  });
});

router.get('/allinterests', function(req, res) {
  console.log('Route allInterests hit.');
  Interest.find({}, function(err, interests){
    console.log('Found: ', interests);
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(interests);
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
