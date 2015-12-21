var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
  console.log("in index");
  justPrintSomething();

	req.flash('info', 'Flash is back!')
  var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('basicPages/index', {
        drinks: drinks,
        tagline: tagline
    });

});

/* GET home page. */
router.get('/index', function(req, res, next) {
  console.log("in index");
  res.render('basicPages/index', { title: 'Express' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('basicPages/about', { title: 'Express' });
});

var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
