var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var EmailTemplate = require( '../../models/emailTemplate' );

// post to create a new emailTemplate
router.post('/', function(req, res) {
  console.log('hit the emailTemplate post, req.body-> ', req.body);
  var data = req.body;

  var newEmail = new EmailTemplate({
      body: data.body,
      name: data.name,
      subject: data.subject
  }); // end newEmail

  newEmail.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
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
  var data = req.body;

  var updatedEmail = {

    body: data.body,
    name: data.name,
    subject: data.subject
  }; // end updatedEmail

/// I really don't know if this will work
// here's one source http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
// a second source http://stackoverflow.com/questions/27108177/mongoose-findbyidandupdate-doest-not-work-with-req-body
/// TODO: return when data is in the system and HTTP call is set up
  EmailTemplate.findByIdAndUpdate(req.params.id, {$set: updatedEmail} , function(err, result){
    if (err) return handleError(err);

    console.log("RESULT: ", result);
    res.send('result');
    });
}); //end put


// delete the individual emailTemplate from DB
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
    });// end findByIdAndRemove
});// end delete

module.exports = router;
