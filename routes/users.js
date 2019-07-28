var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();



// get  surveys for registered account
router.get('/:username/surveys', function(req, res, next) {
  res.render('users/surveys',  surveys.findAllSurveys)
});


router.post('/:username/create', surveys.createNewSurvey);

/* GET new survey page */
router.get('/:username/create',  function(req, res, next) {
  if(!req.user){
    res.redirect('/')
  }else if(req.params.username == req.user.username){
  res.render('users/create')
  }else 
  res.redirect('/')
});





router.get('/:username/surveys', surveys.findAllSurveys);


module.exports = router;
