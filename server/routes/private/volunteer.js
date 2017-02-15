var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Volunteer = require( '../../models/volunteer' );

// post to create a new applicant
router.post('/', function(req, res) {
  console.log('hit the volunteer post, req.body-> ', req.body);
  var data = req.body;

  var newPerson = new Volunteer({

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
    dateBegan: data.dateBegan,
    dateOfBirth: data.dateOfBirth,
    emergencyContact: {
      name: data.emergancyName,
      phone: data.emergancyPhone
    },
    employment: data.employment,
    interests: data.interests,
    name: {
      first_name: data.firstName,
      last_name: data.lastName
    },
    notes: data.notes,
    skills: data.skills
  }); // end newPerson

  newPerson.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        console.log('new volunteer added');
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post /

//promotes applicant to volunteer creates new volunteer AND updates thier data
router.post('/applicant', function(req, res) {
  console.log('hit the volunteer post, req.body-> ', req.body);
  var data = req.body;

  var newPerson = new Volunteer({

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
    dateBegan: data.dateBegan,
    dateOfBirth: data.dateOfBirth,
    emergencyContact: {
      name: data.emergencyContact.name,
      phone: data.emergencyContact.phone
    },
    employment: data.employment,
    interests: data.interests,
    name: {
      first_name: data.name.first_name,
      last_name: data.name.last_name
    },
    notes: data.notes,
    skills: data.skills
  }); // end newPerson

  newPerson.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('new volunteer added');
      //Updates volunteer with additional info
      var updatedVolunteer = {

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
        dateBegan: data.dateBegan,
        dateOfBirth: data.dateOfBirth,
        emergencyContact: {
          name: data.emergencyContact.name,
          phone: data.emergencyContact.phone
        },
        employment: data.employment,
        interests: data.interests,
        name: {
          first_name: data.name.first_name,
          last_name: data.name.last_name
        },
        notes: data.notes,
        skills: data.skills
      }; // end updatedVolunteer

      Volunteer.findByIdAndUpdate(req.params.id, {$set: updatedVolunteer} , function(err, result){
        if (err) return handleError(err);
        console.log("RESULT: ", result);
        res.send('result');
      });
    } // end if else
  }); // end save
}); //end post /


// gets ALL applicants from DB
router.get('/', function(req, res) {
  console.log('hit the volunteer get');
  //find all
  Volunteer.find({}, function(err, allVolunteers){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send( allVolunteers );
    } //end if else
  });// end find
}); // end get /


// updates the entire applicant entry
router.put('/:id', function(req, res) {
  console.log('hit the volunteer put, req.body-> ', req.body);
  var data = req.body;

  var updatedVolunteer = {

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
    dateBegan: data.dateBegan,
    dateOfBirth: data.dateOfBirth,
    emergencyContact: {
      name: data.emergancyName,
      phone: data.emergancyPhone
    },
    employment: data.employment,
    interests: data.interests,
    name: {
      first_name: data.firstName,
      last_name: data.lastName
    },
    notes: data.notes,
    skills: data.skills
  }; // end updatedVolunteer

  /// I really don't know if this will work (or all of the updates for that matter)
  // here one source http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // a second source http://stackoverflow.com/questions/27108177/mongoose-findbyidandupdate-doest-not-work-with-req-body
  /// TODO: return when data is in the system and HTTP call is set up
  Volunteer.findByIdAndUpdate(req.params.id, {$set: updatedVolunteer} , function(err, result){
    if (err) return handleError(err);

    console.log("RESULT: ", result);
    res.send('result');
  });
}); //end put


// delete to delete the whole applicant from DB
router.delete('/:id', function(req, res) {
  console.log('hit the delete, req.params.id-> ', req.params.id);

  Volunteer.findByIdAndRemove(req.params.id, function (err) {
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('volunteer deleted');
      res.sendStatus(200);
    }// end if/else
  });// end save
});// end delete

module.exports = router;
