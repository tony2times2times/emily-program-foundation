var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var emailTemplateSchema = new Schema({

  name: String,
  subject: String,
  body: String

});

module.exports = mongoose.model('EmailTemplates', emailTemplateSchema);
