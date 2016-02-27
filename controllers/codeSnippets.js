var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers


// INDEX
// ==============================================
router.get('/fileUpload', function(req, res, next) {
  res.render('codeSnippets/fileUpload', { title: 'Cementify Blog' });
});


// ADDELEMENTJQUERY
// ==============================================
router.get('/addElementJquery', function(req, res, next) {
  res.render('codeSnippets/addElementJquery', { title: 'Cementify Blog' });
});



// GRIDDER1
// ==============================================
router.get('/gridder1', function(req, res){

  res.render('codeSnippets/gridder1');

});


// HOME1
// ==============================================
router.get('/home1', function(req, res){

  res.render('codeSnippets/home1');

});


// HOME2
// ==============================================
router.get('/home2', function(req, res){

  res.render('codeSnippets/home2');

});


// TEMPLATE
// ==============================================
router.get('/template', function(req, res, next) {
  res.render('codeSnippets/template', { title: 'Express' });
});

var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
