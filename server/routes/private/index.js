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

router.post('/addskill/:skill', function(req, res){
  var skill = new Skill();
  skill.skill = decodeURIComponent(req.params.skill);
  skill.used = true;
  skill.save(function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/switchskill/:skillname/:used', function(req, res){
  console.log("Skill switch, req.params: ", req.params);
  Skill.update({skill: decodeURIComponent(req.params.skillname)}, {used: req.params.used}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
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

router.post('/addinterest/:interest', function(req, res){
  var interest = new Interest();
  interest.interest = decodeURIComponent(req.params.interest);
  interest.used = true;
  interest.save(function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/switchinterest/:interestname/:used', function(req, res){
  Interest.update({interest: decodeURIComponent(req.params.interestname)}, {used: req.params.used}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


router.get('/allessayqs', function(req, res) {
  console.log('Route allEssayQs hit.');
  EssayQ.find({}, function(err, essayqs){
    console.log('Found: ', essayqs);
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(essayqs);
    }
  });
});

router.post('/addessayq/:essayq', function(req, res){
  var essayq = new EssayQ();
  essayq.question = decodeURIComponent(req.params.interest);
  interest.used = true;
  interest.save(function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/addessayq/:essayq', function(req, res){
  EssayQ.insert({question: decodeURIComponent(req.params.essayq), used: true}, function(err, user){
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
