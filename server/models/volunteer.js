var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var volunteerSchema = new Schema({

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
  emergencyContact: {
    name: String,
    phone: Number
  },
  employment: String,
  interests: [ {type : mongoose.Schema.ObjectId, ref : 'Interests'} ],
  name{
    first_name: {type: String, lowercase: true},
    last_name: {type: String, lowercase: true}
  },
  notes: { type: String, default: '' },
  skills: [ {type : mongoose.Schema.ObjectId, ref : 'Skills'} ]

});
module.exports = mongoose.model('Volunteers', volunteerSchema);
