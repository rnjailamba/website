var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
  res.render('basicPages/index', { title: 'Express' });
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('basicPages/index', { title: 'Express' });
});

module.exports = router;
