// global vairables and imported software
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

var Skills = require('../models/skills');
var Interest = require('../models/interests');
var EssayQ = require('../models/essayQuestions');
var Applicant = require('../models/applicant');

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

router.post('/', function(req, res) {
  console.log('hit the applicant post (ouch!), req.body-> ', req.body);
  var data = req.body;

  var newPerson = new Applicant({

    additionalInfo: data.additionalInfo,
    contactInfo: {
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip
      },
      email: data.email,
      phoneNum: data.phoneNum,
    },
    dateOfBirth: data.dateOfBirth,
    emergencyContact: {
      name: data.emergancyName,
      phone: data.emergancyPhone
    },
    employment: data.employment,
    essayOne: { question: data.essayOne.question,
                response: data.essayOne.response
              },
    essayTwo: { question: data.essayTwo.question,
                response: data.essayTwo.response
              },
    essayThree:{ question: data.essayThree.question,
                 response: data.essayThree.response
               },
   essayFour:{ question: data.essayFour.question,
                response: data.essayFour.response
              },
    interests: data.intersts, // should be an array
    name: {
      first_name: data.firstName,
      last_name: data.lastName
    },
    referenceOne: {
      name: data.referenceOne.name,
      email: data.referenceOne.email,
      phone: data.referenceOne.phone
    },
    referenceTwo: {
      name: data.referenceTwo.name,
      email: data.referenceTwo.email,
      phone: data.referenceTwo.phone
    },
    skills: data.skills // should be an array
  }); // end newPerson

  newPerson.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        console.log('new applicant added');
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post /

module.exports = router;
