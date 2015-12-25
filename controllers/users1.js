var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var twilioClient;
module.exports.setTwilioClient = function(inClient) { twilioClient = inClient; };

var redisClient;
module.exports.setClient = function(inClient) { redisClient = inClient; };

// MIDDLEWARE - ISAUTHENTICATED
// ==============================================
var isAuthenticated = function (req, res, next) {
  console.log(req.body.username);

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };
   
  if(!req.cookies.token || !req.cookies.uuid){
   var token = modules.jwt.sign(profile, modules.config.secret, { expiresIn: 365 * 24 * 60 * 60 });
   var expiryDate = new Date(Number(new Date()) + 365 * 24 * 60 * 60 * 1000); 
   if ((req.body.username === 'john.doe' && req.body.password === 'foobar')) {//make a database call here
    res.send(401, 'Wrong user or password');
    return;
   }
   else{
     res.cookie("token", token, { expires: expiryDate, httpOnly: true });
     res.cookie("uuid",modules.uuid.v1(), { expires: expiryDate, httpOnly: true });
     // req.sessionID
     redisClient.select(1, function(err,res){

      redisClient.set('token'+req.sessionID, token, function(err, reply) {
        console.log(reply);
      });

      redisClient.set('uuid'+req.sessionID, uuid, function(err, reply) {
        console.log(reply);
      });

      redisClient.get('token'+req.sessionID, function(err, reply) {
          console.log(reply);
      });

      redisClient.get('uuid'+req.sessionID, function(err, reply) {
          console.log(reply);
      });
    });
     console.log(req.cookies," req while setting");
   }
   

  }
  else{
  }
  // res.json({ token: token,syz:req.session.lastPage });
  console.log("pong of login");
  res.send(JSON.stringify(req.body));
}


// REGISTER
// ==============================================
router.post('/register',function(req, res){
  var phone = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  var min = 1000;
  var max = 9999;
  var token = Math.floor(Math.random() * (max - min + 1)) + min;
  //check if phone unique
  //not required actually

  console.log("before the twilio appi");
  twilioClient.messages.create({
   to: "+91"+phone, 
   from: "+12027914038", 
   body: "please enter this token to register successfully "+token,   
  }, function(err, message) { 

   console.log(message.sid); 
  });
  // put in redis for 10 mins the token
   redisClient.select(1, function(err,res){

    redisClient.set(phone, token, function(err, reply) {
      console.log(reply);
    });
    redisClient.expire(phone, 3*60);//expires in 180 seconds

    redisClient.get(phone, function(err, reply) {
        console.log(reply);
    });
  });

  console.log("phone is ",phone);
  res.redirect('/users1/enterCode?phone='+phone);

});
router.get('/register', function(req, res){

  res.render('users1/register');

});


//  ENTERCODE
// ==============================================
router.get('/enterCode', function(req, res){

  var phone = req.query.phone;
  console.log("in enterCode",phone);
  res.render('users1/enterCode',{phone:phone});

});

router.post('/enterCode', function(req, res){

  var phone = req.query.phone;
  var user_entered_code = req.body.code;

   console.log(req.body.code,"the code by user");
   redisClient.get(phone, function(err, reply) {
        console.log(reply);
          var phoneCode = reply;
          if(user_entered_code == phoneCode){
           res.send("verified");
         }
         else{
          res.send("not verified"+user_entered_code+phoneCode);
         }
    });
});


// RESENDCODE
// ==============================================
router.get('/resendCode', function(req, res){

  var phone = req.query.phone;
  var min = 1000;
  var max = 9999;
  var token = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log("in resend Code",phone);
    twilioClient.messages.create({
     to: "+91"+phone,
     from: "+12027914038",
     body: "please enter this token to register successfully "+token,
    }, function(err, message) {

     console.log(message.sid);
    });
      // put in redis for 10 mins the token
       redisClient.select(1, function(err,res){

        redisClient.set(phone, token, function(err, reply) {
          console.log(reply);
        });
        redisClient.expire(phone, 3*60);//expires in 180 seconds


        redisClient.get(phone, function(err, reply) {
            console.log(reply);
        });
      });
  res.render('users1/enterCode',{phone:phone});

});


// TEMPLATE
// ==============================================
router.get('/template', function(req, res){

  res.render('users1/template');

});


// BOILERPLATE
// ==============================================
router.get('/boilerplate', function(req, res){

  res.render('users1/boilerplate');

});


// LOGIN
// ==============================================
router.post('/login',function(req, res){

  res.status(200).send("pong! of login");

});
router.get('/login', function(req, res){

   res.render('users1/login');

});


// MIDDLEWARE
// ==============================================
router.use(function(req, res, next) {

  console.log("verifying the token");
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    modules.jwt.verify(token, modules.config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        console.log("all good");
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// PING
// ==============================================
router.get('/ping',isAuthenticated, function(req, res){

    res.status(200).send("pong!");

});

module.exports.router = router;
