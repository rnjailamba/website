var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers


// FILEUPLOAD
// ==============================================
router.get('/fileUpload', function(req, res, next) {
  res.render('codeSnippets/fileUpload', { title: 'Cementify Blog' });
});


// FORM
// ==============================================
router.get('/form', function(req, res, next) {
  res.render('codeSnippets/form', { title: 'Express' });
});


// MODALFORM
// ==============================================
router.get('/modalForm', function(req, res, next) {
  res.render('codeSnippets/modalForm', { title: 'Express' });
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


// SOCIALSHARING
// ==============================================
router.get('/socialSharing', function(req, res, next) {
  res.render('codeSnippets/socialSharing', { title: 'Express' });
});


// SWEET ALERT
// ==============================================
router.get('/sweetAlert', function(req, res, next) {
  res.render('codeSnippets/sweetAlert', { title: 'Express' });
});


// SWITCHER
// ==============================================
router.get('/switcher', function(req, res, next) {
  res.render('codeSnippets/switcher', { title: 'Express' });
});


// TAGS
// ==============================================
router.get('/tags', function(req, res, next) {
  res.render('codeSnippets/tags', { title: 'Express' });
});


// TYPEAHEAD
// ==============================================
router.get('/typeahead', function(req, res, next) {
  res.render('codeSnippets/typeahead', { title: 'Express' });
});

var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
