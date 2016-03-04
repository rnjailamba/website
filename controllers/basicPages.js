var express = require('express');
var router = express.Router();
var loginMiddleWare = require("../middleware/login.js");

var redisClient;
module.exports.setClient = function(inClient) { redisClient = inClient; };


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



// HOME3
// ==============================================
router.get('/home3', function(req, res){

  loginMiddleWare.isLoggedIn(req,res,redisClient,'basicPages/home3',null);



});





var justPrintSomething = function(){
    console.log("print something");
}


  // console.log(req.cookies.fooo," printing the cookie");
  // console.log(req.signedCookies.name ," printing the cookie");
  // res.clearCookie('name');
  // if(!req.signedCookies.name){
    // console.log("cleared the cookie name");
  // }
  // else{
    // console.log("un cleared the cookie name");

  // }

module.exports.router = router;
