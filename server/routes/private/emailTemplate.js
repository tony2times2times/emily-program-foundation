var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var EmailTemplate = require( '../../models/emailTemplate' );

// post to create a new emailTemplate
router.post('/', function(req, res) {
  console.log('hit the emailTemplate post, req.body-> ', req.body);
  var newEmail = new EmailTemplate({
      body: req.body.body,
      name: req.body.name,
      subject: req.body.subject
  }); // end newEmail

  newEmail.save(function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('new emailTemplate added');
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post


// gets ALL emailTemplates from DB
router.get('/', function(req, res) {
  console.log('hit the get');
  //find all
  EmailTemplate.find({}, function(err, allEmailTemplates){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(allEmailTemplates); // !!erase later!!
      res.send( allEmailTemplates );
    } //end if else
  });// end find
}); // end get /

// updates the entire email template entry
router.put('/:id', function(req, res) {
  console.log('hit the email template put, req.body-> ', req.body);
  EmailTemplate.findByIdAndUpdate(req.params.id, {$set: {body: req.body.body, subject: req.body.subject}}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}); //end put

// delete the individual emailTemplate from DB
router.delete('/:id', function(req, res) {
  console.log('hit the emailTemplate delete, req.params.id-> ', req.params.id);
    EmailTemplate.findByIdAndRemove(req.params.id, function (err) {
      if (err){
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }// end if/else
    });// end findByIdAndRemove
});// end delete

module.exports = router;
