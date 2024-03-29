//- File name: surveys.js
//- Author's name: Tomoya Kuroda, Yang su
//- File description: Controller for survey
const Survey=require('../../models/surveys');
// Find all surveys
exports.findAllSurveys = async (req, res) => {

    const surveys = await Survey.find();
    res.render('users/surveys', {surveys, username: req.user && req.user.username || "",title: 'All Surveys'});
    //console.log(surveys);
    //console.log(req.user);
  };
 
// get one survey (GET by it's ID)

 exports.findSurveyById = async (req, res) => {

 const id = req.params.id;
 const survey = await Survey.findById(id);
 //console.log(survey);
 res.render('users/doSurvey', { survey,title: `${survey.survey_title}` });
};


// Author Tomoya
// Create a new Survey
exports.createNewSurvey = async (req, res) => {

  if(!req.user){
    res.redirect('/')
  }
  if(req.user.username != req.params.username){
    res.redirect('/')
  }
  if(req.params.username == req.user.username){
  const body = req.body;

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
  res.redirect(`/users/${req.user.username}/surveys`);
}
};

// Author Tomoya Kuroda
// Delete a Survey
exports.deleteSurvey = async (req, res) => {

  if(!req.user){
    res.redirect('/')
  }
  if(req.user.username != req.params.username){
    res.redirect('/')
  }
  if(req.params.username == req.user.username){
  const survey_id = req.params.id;
  const survey = await Survey.findById(survey_id)
  await survey.delete()
  res.redirect(`/users/${req.user.username}/surveys`);
}
};


//Author Yang and Tomoya
// post the answers of a survey
exports.postAnswer = async (req, res) => {
  const id = req.params.id;
  const body=req.body;
  console.log(id);
  console.log(body);
  
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

// author Yang
//view statistic function 
exports.statistic=async (req, res) => {
  
  if(!req.user){
    res.redirect('/')
  }
  else if(req.user.username != req.params.username){
    res.redirect('/')
  }
  else if(req.params.username == req.user.username){
    const id = req.params.id;
    const survey = await Survey.findById(id);
    let agreeNumber=0;
    let disagreeNumber=0;
    for (const answer of survey.survey_questions[0].answer){
      if (answer==="agree")
      agreeNumber++
      else
      disagreeNumber++
    }

    const respondents = survey.survey_questions[0].answer.length
    let agreeValue=agreeNumber/respondents*100
    res.render('users/statistic', { survey,respondents,disagreeNumber,agreeNumber,agreeValue,title: 'Statistic'});
 }

};



