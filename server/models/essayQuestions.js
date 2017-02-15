var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema sources info from users Google profile
var essayQuestionsSchema = new Schema({

  1: String,
  2: String,
  3: String,
  4: String

});
module.exports = mongoose.model('EssayQuestions', essayQuestionsSchema);
