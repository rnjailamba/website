var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers


// INDEX
// ==============================================
router.get('/fileUpload', function(req, res, next) {
  res.render('codeSnippets/fileUpload', { title: 'Cementify Blog' });
});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
