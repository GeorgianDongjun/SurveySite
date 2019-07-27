var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('users/create')
});

// get users surveys and other suryes
router.get('/surveys', function(req, res, next) {
  res.render('users/surveys')
});


router.post('/create', surveys.createNewSurvey);

router.post('/doSurvey/:id', surveys.postAnswer);
module.exports = router;
