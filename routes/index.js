var express = require('express');
var router = express.Router();
var surveys = require('./controllers/surveys');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// List all surveys(GET)
router.get('/surveys', surveys.findAllSurveys);

// List a specific surveys (GET)

router.get('/doSurvey/:id', surveys.findSurveyById);

//post a survey's answer
router.post('/doSurvey/:id',surveys.postAnswer);


module.exports = router;

