var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var mappings = appConfig();
var loginMiddleWare = require("../middleware/login.js");

var solrClient;
module.exports.setSolrClient = function(inClient) { solrClient = inClient; };
var knoxClient;
module.exports.setClient = function(inClient) { knoxClient = inClient; };
var redisClient;
module.exports.setRedisClient = function(inClient) { redisClient = inClient; };

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

modules.winston.level = 'debug';
modules.winston.log('debug', 'Hello distributed log files!');

modules.winston.add(modules.winston.transports.File, { filename: 'somefile.log' });
modules.winston.remove(modules.winston.transports.Console);

modules.winston.log('debug', 'Hello again distributed log files!');


// PING
// ============================================== 
router.get('/ping', function(req, res){
  var bodyRet;
  // modules.request(
  //       {url:mappings['blogService.ping']}, 
  //       function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //                 bodyRet = body;

  //           console.log("pring returned body1",body);
  //           res.send(body);
  //         }
  //         else{

  //         }
  //    });

   var data = {};
    data.postedBy = 12;
    data.categoryId = 11;
    data.isVerified = false;
    data.noOfCommentsCollections = 0;
    data.paragraphs =  [
                            {
                                "text": "hello mister",
                                "paragraphType": "Text"
                            }
                        ];

   modules.request({
        url:mappings['blogService.createBlog'], 
        method: 'POST',
        json: data
      },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
                  bodyRet = body; 

            console.log("pring returned bodyyy");
            res.status(200).send(body);
          }
          else{
                        res.status(404).send(response);

            console.log("not signed up successfully");
          }
     });
});

// WRITEPOST
// ==============================================
router.get('/writePost', function(req, res, next) {

  loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/writePost',null);

});

router.post('/writePost', function(req, res, next) {
    console.log("in the post",req.body);

    res.render('blog/blogSummary', { title: 'Cementify Blog' });


});


// WRITEPOST1
// ==============================================
router.get('/writePost1', function(req, res, next) {
    res.render('blog/writePost1');
});


router.post('/writePost1', function(req, res, next) {
    console.log("in the post",req.body);
    var data = {};
    data.postedBy = 12;
    data.categoryId = 11;
    data.isVerified = false;
    data.noOfCommentsCollections = 0;
    data.paragraphs =  [
                            {
                                "text": "hello mister",
                                "paragraphType": "Text"
                            }
                        ];

    modules.request({
        url:mappings['blogService.createBlog'], 
        method: 'POST',
        json: data
      },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
                  bodyRet = body; 

            console.log("pring returned bodyyy");
            res.status(200).send(response);
          }
          else{
            res.status(404).send(response);
            console.log("not signed up successfully");
          }
     });

});


// INDEX
// ==============================================
router.get('/', function(req, res, next) {

  loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/index',null);

});


// INDEX
// ==============================================
router.get('/index', function(req, res, next) {

  loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'blog/index',null);
  
});


// INDEX1
// ==============================================
router.get('/index1', function(req, res, next) {
  res.render('blog/index1', { title: 'Cementify Blog' });
});


// INDEX2
// ==============================================
router.get('/index2', function(req, res, next) {
  res.render('blog/index2', { title: 'Cementify Blog' });
});


// ARTICLE
// ==============================================
router.get('/article', function(req, res, next) {
  res.render('blog/article', { title: 'Cementify Blog' });
});


// ARTICLE1
// ==============================================
router.get('/article1', function(req, res, next) {
  res.render('blog/article1', { title: 'Cementify Blog' });
});


// ARTICLE2
// ==============================================
router.get('/article2', function(req, res, next) {
  res.render('blog/article2', { title: 'Cementify Blog' });
});


// ARTICLE11
// ==============================================
router.get('/article11', function(req, res, next) {
  res.render('blog/article11', { title: 'Cementify Blog' });
});


// ARTICLE22
// ==============================================
router.get('/article22', function(req, res, next) {
  res.render('blog/article22', { title: 'Cementify Blog' });
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


// EDITPOST
// ==============================================
router.get('/editPost', function(req, res, next) {
    res.render('blog/editPost');
});

router.post('/editPost', function(req, res, next) {
    console.log("in the post",req.body);

    res.render('blog/blogSummary', { title: 'Cementify Blog' });


});


// EDITPOST1
// ==============================================
router.get('/editPost1', function(req, res, next) {
    res.render('blog/editPost1');
});

router.post('/editPost1', function(req, res, next) {
    console.log("in the post",req.body);

    res.render('blog/blogSummary', { title: 'Cementify Blog' });


});


// BLOGSUMMARY
// ==============================================
router.get('/blogSummary', function(req, res, next) {
  console.log(req.query);
  if( req.query.status == 200 ){
    res.render('blog/blogSummary', { title: 'Blog successfully submitted' });
  }
  else{
    res.render('blog/blogSummary', { title: 'Blog not successfully submitted' });
  }
  
});


// PING
// ==============================================
router.get('/ping', function(req, res, next) {
    solrClient.add({ id : 13 },function(err,obj){
       if(err){
          console.log(err);
       }else{
          console.log('Solr response:', obj);
       }
    });

    var docs = [];
    for(var i = 0; i <= 10 ; i++){
       var doc = {
           id : 12345 + i,
           title_t : "Title "+ i,
           description_t : "Text"+ i + "Alice"
       }
       docs.push(doc);
    }

    // Add documents
    solrClient.add(docs,function(err,obj){
      if(err){
        console.log(err);
      }else{
        console.log(obj);
      }
    });


    solrClient.commit(function(err,res){
       if(err) console.log(err);
       if(res) console.log(res);
    });


    var query = 'q=*:*';
    solrClient.get('select', query, function(err, obj){
      if(err){
        console.log(err);
      }else{
        console.log(obj.response.docs);
      }
    });
    res.send(200, 'All good');

});



var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
