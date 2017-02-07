var mongoose = require('mongoose');

//Schema sources info from users Google profile
var userSchema = mongoose.Schema({
    id: String,
    token: String,
    email: String,
    givenName: String,
    familyName: String,
    picture: String
});
module.exports = mongoose.model('User', userSchema);
