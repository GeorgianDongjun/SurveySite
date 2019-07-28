var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();



// Get surveys for registered account
router.get('/:username/surveys', surveys.findAllSurveys); 


router.post('/:username/create', surveys.createNewSurvey);

/* GET new survey page */
router.get('/:username/create', function(req, res, next) {
  res.render('users/create')
});

//get statistic page 
router.get('/:id/statistic', surveys.statistic);





//router.get('/:username/surveys', surveys.findAllSurveys);


module.exports = router;
