var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new-survey', function(req, res, next) {
  res.render('users/new-survey')
});

module.exports = router;
