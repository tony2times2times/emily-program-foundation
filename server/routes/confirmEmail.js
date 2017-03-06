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
  if (!configs.emailSig) configs.emailSig = '<p>Emily Monson, LSW <br>Outreach and Program Manager <br>The Emily Program Foundation | 1295 Bandana Blvd W, Ste 210 | St. Paul, MN 55108 <br>emily.monson@emilyprogramfoundation.org | (651)-379-6122 ext. 1605 | <br>emilyprogramfoundation.org</p>'
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
