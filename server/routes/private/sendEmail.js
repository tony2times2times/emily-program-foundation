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

router.post('/:recipientType', function(req, res){
  var recipientArray = req.body.recipientIDArray;
  if (req.params.recipientType == 'applicants') {

  } else if (req.params.recipientType == 'volunteers') {

  }

  EmailTemplate.find({_id: req.body.templateID}, function(err, template){
    var errorCallback = function(error){
      if (error) {
        console.log(error);
      }
    };
    if (err) {
      res.sendStatus(500);
    } else {
      for (var i = 0; i < recipientArray.length; i++) {
        var mailOptions = {
          from: configs.gmail.username,
          to: recipientArray[i],
          subject: template.subject,
          html: template.body
        };
        transport.sendMail(mailOptions, errorCallback);
      }
      res.sendStatus(200);
    } //end if else
  });// end find
});

module.exports = router;
