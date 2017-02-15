var express = require('express');
var router  = express.Router();
var path = require('path');

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

router.delete('/deleteadmin/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err){
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
  Skill.find({}, function(err, skills){
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

router.put('/switchskill/:id/:used', function(req, res){
  Skill.findByIdAndUpdate(req.params.id, {$set: {used: req.params.used}}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/allinterests', function(req, res) {
  Interest.find({}, function(err, interests){
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

router.put('/switchinterest/:id/:used', function(req, res){
  Interest.findByIdAndUpdate(req.params.id, {$set: {used: req.params.used}}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


router.get('/allessayqs', function(req, res) {
  console.log('Route allEssayQs hit.');
  EssayQ.findOne({}, function(err, essayqs){
    console.log('Found: ', essayqs);
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(essayqs);
    }
  });
});

router.put('/changeessayq/:number', function(req, res){
  var queryObject = {};
  queryObject[req.params.number] = req.body.questionText;
  console.log("Change essay route hit. queryObject: ", queryObject);
  EssayQ.findOneAndUpdate({}, {$set: queryObject}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
