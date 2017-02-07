var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var applicantSchema = new Schema({

    additionalInfo: String,
    appStatus: String,
    contactInfo {
      address: {
        street: String,
        city: String,
        state: String,
        zip: Number
      },
      email: String,
      phoneNum: Number,
    },
    dateBegan: Date,
    dateOfBirth: Date,
    emailedWhat: [ {type : mongoose.Schema.ObjectId, ref : 'emailTemplates'} ],
    emergencyContact: {
      name: String,
      phone: Number
    },
    employment: String,
    essayOne: { essayQuestion: {type : mongoose.Schema.ObjectId, ref : 'essayQuestions'},
                response: String
              },
    essayTwo: { essayQuestion: {type : mongoose.Schema.ObjectId, ref : 'essayQuestions'},
                response: String
              },
    essayThree:{ essayQuestion: {type : mongoose.Schema.ObjectId, ref : 'essayQuestions'},
                 response: String
               },
    interests: [ {type : mongoose.Schema.ObjectId, ref : 'Interests'} ],
    name{
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
    skills: [ {type : mongoose.Schema.ObjectId, ref : 'Skills'} ]

});
module.exports = mongoose.model('Applicants', applicantSchema);
