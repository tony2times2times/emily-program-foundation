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
  {email: <email address>, firstName: firstName}. */
  var recipientArray = req.body.recipientArray;
  EmailTemplate.findById(req.body.templateID, function(err, template){
    if (err) {
      res.sendStatus(500);
    } else {
      var errorCallback = function(error){
        if (error) {
          console.log(error);
        }
      };
      for (var i = 0; i < recipientArray.length; i++) {
        var emailBody = '<p>' + recipientArray[i].firstName + '</p>' + template.body;
        var mailOptions = {
          from: configs.gmail.username,
          to: recipientArray[i].email,
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
