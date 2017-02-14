var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Applicant = require( '../models/applicant' );

// gets ALL applicants from DB
router.get('/', function(req, res) {
  console.log('hit the get');
  //find all
  Applicant.find({}, function(err, allApplicants){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send( allApplicants );
    } //end if else
  });// end find
}); // end get /

// updates the applicant status
router.patch('/status/:id', function(req, res) {
  console.log('hit patch status, req.params.id-> ', req.params.id);
  var newStatus = req.body.status;

  Applicant.update({ _id: req.params.id }, { $set: { appStatus: newStatus }}, function(err){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus( 204 );
    } // end if/else
  }); // end update
}); // end patch status



// updates the applicat about missed orientation
router.patch('/missed/:id', function(req, res) {
  console.log('hit patch missed orientation');
//bellow I used findByIdAndUpdate, I used this to try to keep some consistancy. It should work with findById too
  Applicant.findByIdAndUpdate(req.params.id, function (err, applicant) {
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      applicant.numMissedOrientaion++;
      applicant.save(function (err, updatedApplicant) {
        if (err){
          console.log(err);
          res.sendStatus(500);
        } else {
          res.send(updatedApplicant);
        }// end nested if/else
      }); // end save
    }// end if/else
  }); // end findById
});// end patch numMissedOrientaion


// updates the entire applicant entry
router.put('/:id', function(req, res) {
  console.log('hit the applicant put, req.body-> ', req.body);
  var data = req.body;

  var updatedApplicant = {
    // additionalInfo: 'na, nothing else,  I am a simple person',
    // dateOfBirth: '1985-01-15T06:00:00.000Z',
    // employment: 'Prime',
    // __v: 0,
    // skills:
    //  [ 'Project Management',
    //    'Layout/Graphic Design',
    //    'Artwork/Photography',
    //    'Public Speaking' ],
    // referenceTwo:
    //  { name: 'My Dad',
    //    email: 'husbandofjamesmom@gmail.com',
    //    phone: 9525559876 },
    // referenceOne:
    //  { name: 'My Mom',
    //    email: 'jamesmom@yahoo.com',
    //    phone: 9525551234 },
    // numMissedOrientaion: 0,
    // notes: '',
    // name: { first_name: 'jimmy', last_name: 'ericson' },
    // interests: [ 'Special Events - Volunteering for at least one special event per year' ],
    // essayFour: { response: '' },
    // essayThree: { response: 'Warm Feelings' },
    // essayTwo: { response: 'I want to be a big help, AND improve my sweet computer skills' },
    // essayOne: { response: 'I was told about because I was making this app.. and Joey told me about them too.' },
    // emergencyContact: { name: 'Bro Bro', phone: 6125551234 },
    // emailedWhat: [],
    // contactInfo:
    //  { email: 'jamesericson@gmail.com',
    //    phoneNum: 9522886862,
    //    address:
    //     { street: '3438 1st Ave S',
    //       city: 'Minneapolis',
    //       state: 'MN',
    //       zip: 55408
    //     }
    //   },
    // appStatus: 'applied',
    // edit: false }


    additionalInfo: data.additionalInfo,
    contactInfo: {
      address: {
        street: data.contactInfo.address.street,
        city: data.contactInfo.address.city,
        state: data.contactInfo.address.state,
        zip: data.contactInfo.address.zip
      },
      email: data.contactInfo.email,
      phoneNum: data.contactInfo.phoneNum,
    },
    dateOfBirth: data.dateOfBirth,
    emergencyContact: {
      name: data.emergencyContact.name,
      phone: data.emergencyContact.phone
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
      first_name: data.name.first_name,
      last_name: data.name.last_name
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
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('applicant successfully updated');
      res.send('result');
    }
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
});// end delete

module.exports = router;
