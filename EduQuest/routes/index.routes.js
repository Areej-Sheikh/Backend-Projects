var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/contact', function(req, res, next) {
  res.render('contactus');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
