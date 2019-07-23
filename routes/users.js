var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new-survey', function(req, res, next) {
  res.render('users/new-survey')
});
/* get users surveys and other suryes
router.get('/surveys', function(req, res, next) {
  res.render('users/surveys')
});*/
module.exports = router;
