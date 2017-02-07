/**
 * A service layer that makes all of our User database queries.
 *
 * @module services/user
 *
 * @function findUserById finds a User by their unique Mongo id
 * @function findUserByGoogleEmail finds a User by their Google email
 * @function create a User that will be authenticated by Google
 */
var User = require('../models/user');

var UserService = {
  findUserById: function (id, callback) {
    User.findById(id, function (err, user) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },

  findUserByGoogleId: function (id, callback) {
    User.findOne({ googleId: id }, function (err, user) {

      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },

  findUserByGoogleEmail: function (email, callback) {
    User.findOne({ googleEmail: email }, function (err, user) {

      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },

  updateNewAdmin: function (id, token, name, email, callback) {
    User.update({ googleEmail: email }, {$set:
      { googleId: id,
        googleToken: token,
        googleName: name  }}, function (err) {

          if (err) {
            return callback(err);
          }

          return callback(null);
    });
  },

  createGoogleUser: function (id, token, name, email, callback) {
    var user = new User();

    user.googleId = id;
    user.googleToken = token;
    user.googleName = name;
    user.googleEmail = email;

    user.save(function (err) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },
};

module.exports = UserService;
