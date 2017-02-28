var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Volunteer = require( '../../models/volunteer' );
var ExtraInfo = require( '../../models/extraVolunteerInfo' );

// post to create a new applicant
router.post('/', function(req, res) {
  console.log('hit the volunteer post, req.body-> ', req.body);
  var data = req.body;

  // if not given a begin date, sets to current date
  var dateBegan = data.dateBegan;
  if (!dateBegan){
    dateBegan = new Date()
    // sets time to central time zone
    dateBegan.setHours( dateBegan.getHours() - 6);
  }
  //if volunteer is being added from applicat tab checks for appStatus and so it can add extraInfo
  var fromApplication = false;
  if (data.appStatus)fromApplication = true;


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
    dateBegan: dateBegan,
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

  if (fromApplication){
    newPerson.extraInfo = true;

    var newPersonExtraInfo = new ExtraInfo({

      additionalInfo: data.additionalInfo,
      essayOne: { essayQuestion: data.essayOne.essayQuestion,
                  response: data.essayOne.response
                },
      essayTwo: { essayQuestion: data.essayTwo.essayQuestion,
                  response: data.essayTwo.response
                },
      essayThree:{ essayQuestion: data.essayThree.essayQuestion,
                   response: data.essayThree.response
                 },
      essayFour:{ essayQuestion: data.essayFour.essayQuestion,
                  response: data.essayFour.response
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
      volunteerId: newPerson._id
    });
  }

  newPerson.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        console.log('new volunteer added');
        if(fromApplication){
          newPersonExtraInfo.save(function(err){
            if(err) {
              console.log(err);
              return res.sendStatus(500);
            } // end err if
            console.log('added extraInfo for new volunteer');
          }); // end save newPersonExtraInfo
        } // end if fromApplication
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post /




// //promotes applicant to volunteer creates new volunteer AND updates thier data
// router.post('/applicant', function(req, res) {
//   console.log('hit the volunteer post, req.body-> ', req.body);
//   var data = req.body;
//
//   var newPerson = new Volunteer({
//
//     contactInfo: {
//       address: {
//         street: data.contactInfo.address.street,
//         city: data.contactInfo.address.city,
//         state: data.contactInfo.address.state,
//         zip: data.contactInfo.address.zip
//       },
//       email: data.contactInfo.email,
//       phoneNum: data.contactInfo.phoneNum,
//     },
//     dateBegan: new date(),
//     dateOfBirth: data.dateOfBirth,
//     emergencyContact: {
//       name: data.emergencyContact.name,
//       phone: data.emergencyContact.phone
//     },
//     employment: data.employment,
//     interests: data.interests,
//     name: {
//       first_name: data.name.first_name,
//       last_name: data.name.last_name
//     },
//     notes: data.notes,
//     skills: data.skills
//   }); // end newPerson
//
//   var
//
//
//   newPerson.save(function(err) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else {
//       console.log('new volunteer added');
//       //Updates volunteer with additional info
//       var updatedVolunteer = {
//
//         contactInfo: {
//           address: {
//             street: data.contactInfo.address.street,
//             city: data.contactInfo.address.city,
//             state: data.contactInfo.address.state,
//             zip: data.contactInfo.address.zip
//           },
//           email: data.contactInfo.email,
//           phoneNum: data.contactInfo.phoneNum,
//         },
//         dateBegan: data.dateBegan,
//         dateOfBirth: data.dateOfBirth,
//         emergencyContact: {
//           name: data.emergencyContact.name,
//           phone: data.emergencyContact.phone
//         },
//         employment: data.employment,
//         interests: data.interests,
//         name: {
//           first_name: data.name.first_name,
//           last_name: data.name.last_name
//         },
//         notes: data.notes,
//         skills: data.skills
//       }; // end updatedVolunteer
//
//       Volunteer.findByIdAndUpdate(req.params.id, {$set: updatedVolunteer} , function(err, result){
//         if (err) return handleError(err);
//         console.log("RESULT: ", result);
//         res.send('result');
//       });
//     } // end if else
//   }); // end save
// }); //end post /


// gets ALL volunteers from DB
router.get('/', function(req, res) {
  console.log('hit the volunteer get');
  //find all
  Volunteer.find({}).sort({ 'name.last_name' : 1 }).exec( function(err, allVolunteers){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send( allVolunteers );
    } //end if else
  });// end find
}); // end get /

// gets particular extra info for a volunteer from DB
router.get('/extraInfo/:id', function(req, res) {
  console.log('hit the extraInfo get | req.params.id -> ', req.params.id);

  ExtraInfo.findOne({ 'volunteerId' : req.params.id }, function(err, result){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send( result );
    } //end if else
  });// end find
}); // end get extraInfo


// updates the entire volunteer entry
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
