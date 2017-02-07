var mongoose = require('mongoose');

//Schema sources info from users Google profile
var userSchema = mongoose.Schema({
<<<<<<< HEAD
    id: String,
    token: String,
    email: String,
    givenName: String,
    familyName: String,
    picture: String
=======
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
>>>>>>> 08442a08b3bda93f997117ab928eca805ee9c5bb
});
module.exports = mongoose.model('User', userSchema);
