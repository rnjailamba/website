var express = require('express');
var router = express.Router();


// INDEX
// ==============================================
router.get('/', function(req, res, next) {
  console.log("in index");
  res.render('blog/index', { title: 'Cementify Blog' });
});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
