const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  title: String,
  question_type: String,
  answer:[String]
});


const surveySchema = new Schema({
  survey_title: {
    type: String,
    required: true
  },
  survey_questions: [questionSchema],
  username: String,
  deadline: String
});
  const Survey=mongoose.model('Survey',surveySchema);
  module.exports=Survey;