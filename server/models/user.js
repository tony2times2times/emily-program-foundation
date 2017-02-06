var mongoose = require('mongoose');

//Schema sources info from users Google profile
var userSchema = mongoose.Schema({
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
});
module.exports = mongoose.model('User', userSchema);
