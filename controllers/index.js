var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var loginMiddleWare = require("../middleware/login.js");
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;

// INDEX
// ==============================================
router.get('/', function(req, res){
  res.render('index/home', { title: 'Express' });
});


// INDEX
// ==============================================
router.get('/contact', function(req, res, next) {
  res.render('index/contact', { title: 'Express' });

});


// ABOUT
// ==============================================
router.get('/about', function(req, res, next) {
  res.render('index/about', { title: 'Express' });
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
