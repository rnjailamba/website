module.exports = {
  sayHelloInEnglish: function() {
    console.log("HELLO");
  },
       
  sayHelloInSpanish: function() {
    console.log("H0LLA");
  },

  isLoggedIn: function(req,res,redisClient,pageToDisplay,extraParams) {
    var customerId = req.cookies.customerId; 
    var ruid = req.cookies.ruid;
    redisClient.get(ruid, function(err, reply) {
      // console.log("have set otpo",reply);
      if( customerId == reply){
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
  }
};