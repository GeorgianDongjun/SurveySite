var express = require('express');
var router = express.Router();
var surveys = require('./controllers/surveys');
const Survey=require('../models/surveys');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'True Survey' });
});

// List all surveys(GET)
router.get('/surveys', surveys.findAllSurveys);

/* // List all surveys(GET)
router.get('/surveys', async function(req,res,next){
  const surveys = await Survey.find();
  console.log(surveys)
  res.render('users/surveys',surveys)
}); */

// List a specific surveys (GET)

router.get('/doSurvey/:id', surveys.findSurveyById);

//post a survey's answer
router.post('/doSurvey/:id',surveys.postAnswer);


module.exports = router;

