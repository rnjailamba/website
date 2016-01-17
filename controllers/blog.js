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


// WRITEPOST
// ==============================================
router.get('/writePost', function(req, res, next) {
  res.render('blog/writePost', { title: 'Cementify Blog' });
});


app.post('/test-page', function(req, res) {
    var name = req.body.name,
        color = req.body.color;
    // ...
});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
