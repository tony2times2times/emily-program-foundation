var configs = require('../../../secretSquirrel/secret');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var EmailTemplate = require('../models/emailTemplate');

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configs.gmail.username,
    pass: configs.gmail.password
  },
});

var EmailService = {

  emailToAddressArray: function(addressArray, templateID, callback) {
    EmailTemplate.find({_id: templateID}, function(err, template){
      if (err) {
        return callback(err);
      } else {
        for (var i = 0; i < addressArray.length; i++) {
          var mailOptions = {
            from: configs.gmail.username,
            to: addressArray[i],
            subject: template.subject,
            html: template.body
          };

          transport.sendMail(mailOptions, function (error) {
            if (error) {
              console.log(error);
            }
          });
        }

      } //end if else
    });// end find
  }

};
