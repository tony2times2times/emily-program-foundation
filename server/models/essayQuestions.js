var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var essayQuestionsSchema = new Schema({

  question: String,
  used: Boolean

});
module.exports = mongoose.model('EssayQuestions', essayQuestionsSchema);
