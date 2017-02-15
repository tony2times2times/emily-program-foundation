var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var extraVolunteerInfoSchema = new Schema({

    additionalInfo: String,
    emailedWhat: [ String ], //not sure if this should be kept
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
    volunteerId: {type: mongoose.Schema.ObjectId, ref: 'Volunteers'}
});

module.exports = mongoose.model('ExtraVolunteerInfos', extraVolunteerInfoSchema);
