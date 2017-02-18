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
    essayFour:{ essayQuestion: String,
                response: String
              },
    interests: {type: [String], default: '[]'},
    name: {
      first_name: {type: String},
      last_name: {type: String}
    },
    notes: { type: String, default: '' },
    numMissedOrientaion: { type: Number, default: 0 },
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
    skills:  {type: [String], default: '[]'}

});
module.exports = mongoose.model('Applicants', applicantSchema);
