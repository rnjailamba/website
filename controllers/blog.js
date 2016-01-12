var express = require('express');
var router = express.Router();


// INDEX
// ==============================================
router.get('/', function(req, res, next) {
  res.render('blog/index', { title: 'Cementify Blog' });
});


// INDEX
// ==============================================
router.get('/index', function(req, res, next) {
  res.render('blog/index', { title: 'Cementify Blog' });
});


// ARTICLE
// ==============================================
router.get('/article', function(req, res, next) {
  res.render('blog/article', { title: 'Cementify Blog' });
});


// CATEGORY
// ==============================================
router.get('/category', function(req, res, next) {
  res.render('blog/category', { title: 'Cementify Blog' });
});


// GALLERYPOST
// ==============================================
router.get('/galleryPost', function(req, res, next) {
  res.render('blog/galleryPost', { title: 'Cementify Blog' });
});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
