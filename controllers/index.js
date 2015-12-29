var express = require('express');
var router = express.Router();


// INDEX
// ==============================================
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


// INDEX
// ==============================================
router.get('/index', function(req, res, next) {
  console.log("in index");
  res.render('basicPages/index', { title: 'Express' });
});


// ABOUT
// ==============================================
router.get('/about', function(req, res, next) {
  res.render('basicPages/about', { title: 'Express' });
});


// TEMPLATE
// ==============================================
router.get('/template', function(req, res, next) {
  res.render('basicPages/template', { title: 'Express' });
});


// HOME1
// ==============================================
router.get('/home1', function(req, res){

  res.render('basicPages/home1');

});


// HOME2
// ==============================================
router.get('/home2', function(req, res){

  res.render('basicPages/home2');

});


// HOME3
// ==============================================
router.get('/home3', function(req, res){

  res.render('basicPages/home3');

});

var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
