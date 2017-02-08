var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Applicant = require( '../models/applicant' );

// post to create a new applicant
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

  Applicant.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        console.log('new applicant added')
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post /


// gets ALL applicants from DB
router.get('/', function(req, res) {
  console.log('hit the get');
  //find all
  Applicant.find({}, function(err, allApplicants){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(allApplicants); // !!erase later!!
      res.send( allApplicants );
    } //end if else
  });// end find
}); // end get /

// updates the applicant sendStatus

// updates the entire applicant entry

// delete to delete the whole applicant from DB
router.delete('/:id', function(req, res) {
  console.log('hit the delete, req.params.id-> ', req.params.id);

    Applicant.findByIdAndRemove(req.params.id, function (err) {
      if (err){
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('applicant deleted');
        res.sendStatus(200);
      }// end if/else
    });// end save
})// end delete

module.exports = router;
