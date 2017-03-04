var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EmailTemplate = require('../../models/emailTemplate');
var configs = require('../../auth/authConfig');
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configs.gmail.username,
    pass: configs.gmail.password
  },
});

router.post('/', function(req, res){
  /* Expects to be passed req.body.templateID, the
  MongoDB _id of the email template, and
  req.body.recipientArray, an array of objects
  [
    {name:        {
                    first_name: <name>,
                    last_name: <name>
                  },
    contactInfo:  {
                    email: <email address>
                  }
    }, {<name/email 2>}, etc.
  ]
  */
  var recipientArray = req.body.recipientArray;
  console.log('recipientArray: ', recipientArray);
  EmailTemplate.findById(req.body.templateID, function(err, template){
    console.log('Template ID: ', template._id);
    if (err) {
      res.sendStatus(500);
    } else {
      var errorCallback = function(error){
        if (error) {
          console.log(error);
        }
      };
      for (var i = 0; i < recipientArray.length; i++) {
        var unsubscribeNote = '<p style="font-size: small;">Would you like to stop receiving emails about volunteer opportunities at the Emily Program Foundation? <a href="mailto:' + configs.gmail.username + '?subject=Please%20unsubscribe%20me&body=I%20would%20like%20to%20stop%20receiving%20notifications%20of%20volunteer%20opportunities.%20Please%20remove%20me%20from%20the%20list%20of%20Emily%20Program%20Foundation%20volunteers.">Click here to email your request to unsubscribe.</a></p>';
        var emailBody = '<p>' + recipientArray[i].name.first_name + ',</p>' + template.body + unsubscribeNote;
        var mailOptions = {
          from: configs.gmail.username,
          to: recipientArray[i].contactInfo.email,
          subject: template.subject,
          html: emailBody
        };
        transport.sendMail(mailOptions, errorCallback);
      }
      res.sendStatus(200);
    } //end if else
  });// end find
});

module.exports = router;
