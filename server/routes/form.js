// global vairables and imported software
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

var Skills = require('../models/skills');
var Interest = require('../models/interests');
var EssayQ = require('../models/essayQuestions');

// base url returns index.html from public foulder
router.get('/', function(req, res) {
  console.log('Base URL reached. Returning index.html');
  res.sendFile(path.resolve('Volunteer/public/views/form.html'));
});

router.get('/formFields', function(req, res){
  console.log('hit formFields get');
  var fields = {};

  Skills.find({ used: true})
  .select({ skill: 1 })
  .exec(function(err, allSkills){
      if (err) return handleError(err);

      Interest.find({ used: true})
      .select({ interest: 1 })
      .exec(function(err, allInterests){
          if (err) return handleError(err);

          EssayQ.find({ used: true})
          .select({ question: 1 })
          .exec(function(err, allQuestions){
              if (err) return handleError(err);

              res.send({
                skills: allSkills,
                interests: allInterests,
                essayQuestions: allQuestions
              }); // end res.send
          }); // end essayQ find
      }); // end interests find
  });// end skills find
});// end get


module.exports = router;
