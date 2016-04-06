var modules = require('../controllers/setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var redisClient;

module.exports.setRedisClient = function(inClient) { redisClient = inClient; };


module.exports.functions = {
  sayHelloInEnglish: function() {
    console.log("HELLO");
    return "hello";
  },
       
  sayHelloInSpanish: function() {
    console.log("H0LLA");
  },

  isLoggedInWithRender: function(req,res,redisClient,pageToDisplay,extraParams) {
    var customerId = req.cookies.customerId; 
    var ruid = req.cookies.ruid;
    var viewData = {};
    redisClient.get(ruid, function(err, reply) {
      // console.log("have set otpo",reply);
      if( customerId == reply && reply != null && typeof customerId != 'undefined'){
        console.log("logged in",customerId,reply);
        viewData = getViewData(extraParams,true);
        res.render( pageToDisplay,viewData );
      }
      else{
      	console.log("not logged in",customerId,reply);
        viewData = getViewData(extraParams,false);
        res.render( pageToDisplay,viewData );        
      }
    }); 
    // console.log(ruid,customerId);
  },

  isLoggedIn: function(req,res) {
    isLoggedIn(req,res);
  },

  getCustomerId: function(req,res){
    return req.cookies.customerId; 
  }


};


// IS LOGGED IN
// ==============================================
var isLoggedIn = function(req,res){
  var customerId = req.cookies.customerId; 
  var ruid = req.cookies.ruid;
  redisClient.get(ruid, function(err, reply) {
    if( customerId == reply && reply != null && typeof customerId != 'undefined'){
      console.log("logged in",customerId,reply);
      res.status(200).send(true);
    }
    else{
      console.log("not logged in",customerId,reply);
      res.status(200).send(false);
    }
  });    
}


// GET CUSOMTER ID
// ==============================================
var getCustomerId = function(req,res){
  var customerId = req.cookies.customerId; 
  return "customerId"; 
}


// GET VIEW DATA
// ==============================================
var getViewData = function(extraParams,isLoggedIn){
  var data = {};
  if( isLoggedIn == true)
    data.isLoggedIn = true;
  else
    data.isLoggedIn = false;

  if( extraParams != null && !isEmpty(extraParams) ){
    return mergeObjects(data,extraParams);
  }     
  else{
    return data;
  }
}

// MERGE OBJECTS
// ==============================================
var mergeObjects = function(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}


// GET IS EMPTY
// ==============================================
var isEmpty = function (obj){
  return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
}


// IS LOGGED IN
// ==============================================
router.get('/isLoggedIn', function(req, res, next) {
    isLoggedIn(req,res);
});


// GET CUSOMTER ID
// ==============================================
router.get('/getCustomerId', function(req, res, next) {
    getCustomerId();
});


module.exports.router = router;
