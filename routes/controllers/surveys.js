
// author Yang Su
const Survey=require('../../models/surveys');
// Find all surveys
exports.findAllSurveys = async (req, res) => {

    const surveys = await Survey.find();
    res.render('users/surveys', {surveys, username: req.user && req.user.username || ""});
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


// Author Tomoya
// Create a new Project
exports.createNewSurvey = async (req, res) => {

  const body = req.body;
  console.log(body)

  // if the survey has multiple questions, save them as array
  if(Array.isArray(req.body.question_title)){
  let questions = []
  for (var i = 0; i < req.body.question_title.length; i++) {
    questions.push({title: req.body.question_title[i], question_type: req.body.question_type[i]});
  }
  body.survey_questions=questions
  }else{
    // if not, save it as array
    body.survey_questions=[{}]
    body.survey_questions[0].title = req.body.question_title
    body.survey_questions[0].question_type = req.body.question_type
  }
  body.username=req.params.username
  const survey = await new Survey(body).save();
  res.redirect(`/users/doSurvey/${survey._id}`);
};

//author Yang and Tomoya
// post the answers of a survey
exports.postAnswer = async (req, res) => {
  const id = req.params.id;
  const body=req.body;
 
  const survey = await Survey.findById(id)
  if(Array.isArray(req.body.answer)){
  for (var i = 0; i < req.body.answer.length; i++) {
    survey.survey_questions[i].answer.push(body.answer[i])
  }
  }else{
    survey.survey_questions[0].answer.push(body.answer)
  }
    await survey.save()
  res.redirect(`/surveys`);
};


