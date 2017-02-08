var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var skillsSchema = new Schema({

  skill: String,
  used: Boolean

});
module.exports = mongoose.model('Skills', skillsSchema);
