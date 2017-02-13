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

// updates the applicant status

router.patch('/status/:id', function(req, res) {
  console.log('hit patch status, req.params.id-> ', req.params.id);
  var newStatus = req.body.status;

  Applicant.update({ _id: req.params.id }, { $set: { appStatus: newStatus }}, function(err){
    if (err) return handleError(err);
    res.sendStatus( 204 );
  }); // end update
}); // end patch status



// updates the applicat about missed orientation
router.patch('/missed/:id', function(req, res) {
  console.log('hit patch missed orientation');
//bellow I used findByIdAndUpdate, I used this to try to keep some consistancy. It should work with findById too
  Applicant.findByIdAndUpdate(req.params.id, function (err, applicant) {
    if (err) return handleError(err);

    applicant.numMissedOrientaion++;
    applicant.save(function (err, updatedApplicant) {
      if (err) return handleError(err);
      res.send(updatedApplicant);
    }); // end save
  }); // end findById
});// end patch numMissedOrientaion


// updates the entire applicant entry
router.put('/:id', function(req, res) {
  console.log('hit the applicant put, req.body-> ', req.body);
  var data = req.body;

  var updatedApplicant = {

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
  }; // end updatedApplicant

/// I really don't know if this will work (or all of the updates for that matter)
// here one source http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
// a second source http://stackoverflow.com/questions/27108177/mongoose-findbyidandupdate-doest-not-work-with-req-body
/// TODO: return when data is in the system and HTTP call is set up
  Applicant.findByIdAndUpdate(req.params.id, {$set: updatedApplicant} , function(err, result){
    if (err) return handleError(err);

    console.log("RESULT: ", result);
    res.send('result')
    });
}); //end put


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
