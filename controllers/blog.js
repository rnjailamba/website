var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var knoxClient;
var config = require('../config/config.js');//require all modules that are shared by all controllers
//console.log('got the config for aws',config.amazonS3key,config.amazonS3secret);

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

var AWS = require('aws-sdk');
AWS.config.region = 'ap-southeast-1';
var AWS_ACCESS_KEY_ID = config.amazonS3key;
var AWS_SECRET_ACCESS_KEY = config.amazonS3secret;
AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
var s3 = new AWS.S3();





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

    var params = {Bucket: 'cementifyblogimages', Key: "testfromajax.txt",    ContentType: 'text/plain;charset=UTF-8', Expires: 6000000};
    var url = s3.getSignedUrl('putObject', params);
    console.log("The URL is", url);




    res.render('blog/writePost', { url: url, data2: 'World'  });
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

// DROPZONE
// ==============================================
router.get('/dropzone', function(req, res, next) {
    var params = {Bucket: 'cementifyblogimages', Key: "placeholder2.jpg",    ContentType: 'image;charset=UTF-8', Expires: 6000000};
    var url = s3.getSignedUrl('putObject', params);
    console.log("The URL is", url);
    res.render('blog/dropzone', { url: url, data2: 'World'  });
});


// DROPZONE2
// ==============================================
router.get('/dropzone2', function(req, res, next) {
    var params = {Bucket: 'cementifyblogimages', Key: "testfromajax.txt",    ContentType: 'text/plain;charset=UTF-8', Expires: 6000000};
    var url = s3.getSignedUrl('putObject', params);
    console.log("The URL is", url);
    res.render('blog/dropzone2', { url: url, data2: 'World'  });
});





var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
