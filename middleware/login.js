var modules = require('../controllers/setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var redisClient;

module.exports.setRedisClient = function(inClient) { redisClient = inClient; };


module.exports.functions = {
  sayHelloInEnglish: function() {
    console.log("HELLO");
  },
       
  sayHelloInSpanish: function() {
    console.log("H0LLA");
  },

  isLoggedInWithRender: function(req,res,redisClient,pageToDisplay,extraParams) {
    var customerId = req.cookies.customerId; 
    var ruid = req.cookies.ruid;
    redisClient.get(ruid, function(err, reply) {
      // console.log("have set otpo",reply);
      if( customerId == reply && reply != null && typeof customerId != 'undefined'){
        console.log("logged in",customerId,reply);
          res.render(pageToDisplay, {
              isLoggedIn : true
          });
      }
      else{
      	console.log("not logged in",customerId,reply);
        res.render(pageToDisplay, {
            isLoggedIn : false
        });        
      }
    }); 
    // console.log(ruid,customerId);
  },

  isLoggedIn: function() {
    isLoggedIn();
  }  


};

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


// IS LOGGED IN
// ==============================================
router.get('/isLoggedIn', function(req, res, next) {
    isLoggedIn(req,res);
});


module.exports.router = router;
