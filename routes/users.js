var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();



// get users surveys and other suryes
router.get('/surveys', function(req, res, next) {
  res.render('users/surveys',  { username: req.user.username })
});


router.post('/:username/create', surveys.createNewSurvey);

/* GET new survey page */
router.get('/:username/create', function(req, res, next) {
  res.render('users/create')
});


router.get('/:username/surveys', surveys.findAllSurveys);

module.exports = router;
