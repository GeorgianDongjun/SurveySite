//- File name: users.pug
//- Author's name: Tomoya Kuroda, Yang su
//- File description: Routing for logged in user

var express = require('express');
var surveys = require('./controllers/surveys');
var router = express.Router();




// Get surveys for registered account
router.get('/:username/surveys', surveys.findAllSurveys); 



router.post('/:username/create', surveys.createNewSurvey);

/* GET new survey page */
router.get('/:username/create', function(req, res, next) {
  
  if(!req.user){
    res.redirect('/')
  }
  if(req.user.username != req.params.username){
    res.redirect('/')
  }
  if(req.params.username == req.user.username){
  res.render('users/create',  { title: 'Create a Survey' })
  }
});

//get statistic page 
router.get('/:id/:username/statistic', surveys.statistic);





module.exports = router;
