var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EmailTemplate = require('../../models/emailTemplate');
var configs = require('../../../../secretSquirrel/secret');
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
        var emailBody = '<p>' + recipientArray[i].name.first_name + '</p>' + template.body;
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
