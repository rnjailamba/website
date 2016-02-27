var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers


// FOOTER
// ==============================================
router.get('/footer', function(req, res, next) {
  res.render('partials/footer', { title: 'Cementify Blog' });
});


// HEADER
// ==============================================
router.get('/header', function(req, res, next) {
  res.render('partials/header', { title: 'Cementify Blog' });
});


// LOGINMODAL
// ==============================================
router.get('/loginModal', function(req, res, next) {
  res.render('partials/loginModal', { title: 'Cementify Blog' });
});


// BLOGIMAGEUPLOAD
// ==============================================
router.get('/blogImageUpload', function(req, res, next) {
  res.render('partials/blogImageUpload', { title: 'Cementify Blog' });
});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
