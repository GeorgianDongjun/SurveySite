var express = require('express');
var router = express.Router();
var surveys = require('./controllers/surveys');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// List all surveys(GET)
router.get('/users/surveys', surveys.findAllSurveys);

// List a specific surveys (GET)
router.get('/users/doSurvey/:id', surveys.findSurveyById);
module.exports = router;
