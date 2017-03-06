var init = function () {
  var User = require('../models/user');
  var config = require('../auth/authConfig');
  var UserService = require('../services/user');
  var userCreateCallback = function(err, user) {
  };

  User.find({}, function(err, users){
    if (err) {
      console.log('Error.');
    } else {
      for (var i = 0; i < config.admins.length; i++) {
        var userFound = false;
        for (var j = 0; j < users.length; j++) {
          if (config.admins[i] == users[j].googleEmail) {
            userFound = true;
          }
        }
        if (!(userFound)) {
          UserService.createGoogleUser('', '', '', config.admins[i], userCreateCallback);
        }
      }
    }
  });
};

module.exports = init;
