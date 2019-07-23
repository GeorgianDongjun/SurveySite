var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('users/create')
});


router.post('/create', surveys.createNewSurvey);

module.exports = router;
