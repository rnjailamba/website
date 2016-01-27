var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var knoxClient;

module.exports.setClient = function(inClient) { knoxClient = inClient; };

var promise = new modules.Promise(function(resolve, reject) {
//  console.log("created the promise2",knoxClient);
  if ( typeof knoxClient !== 'undefined' && knoxClient ){
         console.log("resolved2");
        resolve(knoxClient);
   }
});

promise.then(function(knoxClient) {
//  console.log(knoxClient,"in the final then"); // 1

}).then(function() {
});


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
//   var object = { foo: "bar" };
//      var string = JSON.stringify(object);
//      var req = knoxClient.put('/test/obj.json', {
//          'Content-Length': Buffer.byteLength(string)
//        , 'Content-Type': 'application/json'
//      });
//      req.on('response', function(res){
//        if (200 == res.statusCode) {
//          console.log('saved to %s', req.url);
//        }
//      });
//      req.end(string);

});

router.post('/writePost', function(req, res, next) {
    console.log("in the post",req.body);

    res.render('blog/blogSummary', { title: 'Cementify Blog' });


});

// BLOGSUMMARY
// ==============================================
router.get('/blogSummary', function(req, res, next) {
  res.render('blog/blogSummary', { title: 'Cementify Blog' });
});




var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
