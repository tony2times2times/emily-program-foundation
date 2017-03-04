var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var configs = require('../auth/authConfig');
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configs.gmail.username,
    pass: configs.gmail.password
  },
});

router.post('/', function(req, res){
  /* Expects to be passed req.body.firstName and
  req.body.lastName, the first and last names of the applicant,
  and req.body.email, the applicant email address. */
  var errorCallback = function(error){
    if (error) {
      console.log(error);
    }
  };
  var applicantEmailBody = '<p>' + req.body.firstName + ',</p>';
  applicantEmailBody += '<p>Thanks for submitting your application to volunteer with The Emily Program Foundation!  Once we review your completed application, we will follow up with you about next steps.</p>';
  applicantEmailBody += '<p>Let us know if you have any questions, by e-mail or phone, at the contact info below.</p>';
  applicantEmailBody += configs.emailSig;
  var mailOptions = {
    from: configs.gmail.username,
    to: req.body.email,
    subject: 'Thank you for applying to volunteer!',
    html: applicantEmailBody
  };
  transport.sendMail(mailOptions, errorCallback);
  var confirmEmailBody = '<p>New volunteer applicant: ' + req.body.firstName + ' ' + req.body.lastName + '</p>';
  mailOptions = {
    from: configs.gmail.username,
    to: configs.gmail.username,
    subject: 'New volunteer applicant',
    html: confirmEmailBody
  };
  transport.sendMail(mailOptions, errorCallback);
  res.sendStatus(200);
});

module.exports = router;
