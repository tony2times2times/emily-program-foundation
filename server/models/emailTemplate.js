var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var emailTemplateSchema = new Schema({

  body: String,
  name: String,
  subject: String

});

module.exports = mongoose.model('EmailTemplates', emailTemplateSchema);
