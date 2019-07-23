
// author Yang Su
const Survey=require('../../models/surveys');
// Find all surveys
exports.findAllSurveys = async (req, res) => {

    const surveys = await Survey.find();
    res.render('users/surveys', {surveys});
    console.log(surveys);
  };
 /* // get one survey (GET by it's ID)
exports.getSurveyById = routePath => async (req, res, next) => {
  const id = req.params.id;
  const survey = await Survey.findById(id);
  console.log(survey);
  res.render(routePath, {survey}); 
};  */
 exports.findSurveyById = async (req, res) => {

 const id = req.params.id;
 const survey = await Survey.findById(id);
 console.log(survey);
 res.render('users/doSurvey', { survey });
};


// Projects CRUD
// Creating
// Create a new Project
exports.createNewSurvey = async (req, res) => {

  const body = req.body;
  console.log(body)
  let questions = []
  for (var i = 0; i < req.body.question_title.length; i++) {
    questions.push({title: req.body.question_title[i], type: req.body.question_type[i]});
  }
  body.survey_questions=questions
  const survey = await new Survey(body).save();
  res.redirect(`/users/${survey._id}`);
};


