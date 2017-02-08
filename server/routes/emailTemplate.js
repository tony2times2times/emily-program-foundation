var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var EmailTemplate = require( '../models/emailTemplate' );

// post to create a new emailTemplate
router.post('/', function(req, res) {
  console.log('hit the emailTemplate post, req.body-> ', req.body);
  var data = req.body;

  var newEmail = new EmailTemplate({
      body: data.body,
      name: data.name,
      subject: data.subject
  }); // end newEmail

  EmailTemplate.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        console.log('new emailTemplate added')
        res.sendStatus(201);
      } // end if else
  }); // end save
}); //end post /


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

// updates the entire emailTemplate entry

// delete to delete the individual emailTemplate from DB
router.delete('/:id', function(req, res) {
  console.log('hit the emailTemplate delete, req.params.id-> ', req.params.id);

    EmailTemplate.findByIdAndRemove(req.params.id, function (err) {
      if (err){
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('emailTemplate deleted');
        res.sendStatus(200);
      }// end if/else
    });// end save
})// end delete

module.exports = router;
