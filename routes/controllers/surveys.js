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