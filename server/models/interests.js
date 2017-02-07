var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Schema sources info from users Google profile
var interestsSchema = new Schema({

  interest: String,
  used: Boolean

});
module.exports = mongoose.model('Interests', interestSchema);
