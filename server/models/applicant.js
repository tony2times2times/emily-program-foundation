var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var applicantSchema = new Schema({

    additionalInfo: String,
    appStatus: {type: String, default: 'applied'},
    contactInfo: {
      address: {
        street: String,
        city: String,
        state: String,
        zip: Number
      },
      email: String,
      phoneNum: Number,
    },
    dateOfBirth: Date,
    emailedWhat: [ String ],  ///NEED A DEFAULT!! MAYBE??
    emergencyContact: {
      name: String,
      phone: Number
    },
    employment: String,
    essayOne: { essayQuestion: String,
                response: String
              },
    essayTwo: { essayQuestion: String,
                response: String
              },
    essayThree:{ essayQuestion: String,
                 response: String
               },
    interests: [ String ],
    name: {
      first_name: {type: String, lowercase: true},
      last_name: {type: String, lowercase: true}
    },
    notes: { type: String, default: '' },
    NumMissedOrientaion: { type: Number, default: 0 },
    referenceOne: {
      name: String,
      email: String,
      phone: Number
    },
    referenceTwo: {
      name: String,
      email: String,
      phone: Number
    },
    skills: [ String ]

});
module.exports = mongoose.model('Applicants', applicantSchema);
