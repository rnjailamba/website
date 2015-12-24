var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file
var path = require('path');
var unless = require('express-unless');
var app = express();
var session = require('express-session');
var uuid = require('node-uuid');


//using db 1 for session token and uuid data

var twilioClient;

module.exports.setTwilioClient = function(inClient) { twilioClient = inClient; };

var redisClient;

module.exports.setClient = function(inClient) { redisClient = inClient; };

app.use(session({
    secret: 'keyboard cat',
    proxy: true,
    resave: true,
    cookie: {httpOnly: false},
    saveUninitialized: true

}));//http

// jwtCheck.unless = unless;

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
app.use('/api', expressJwt({secret: config.secret}));

router.get('/', function(req, res) {
  if(req.cookies){
  // console.log(req.cookies.token,"in base fdfdfd");
        res.status(200).send(req.cookies.token+"only token");


  }
  else{
      res.status(200).send("no cookie pong!");

  }

});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User1.find({}, function(err, users) {
    res.json(users);
  });
});  

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {


  // find the user
  User1.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        console.log(config);
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

var isAuthenticated = function (req, res, next) {
  console.log(req.body.username);
  

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };
   
  if(!req.cookies.token || !req.cookies.uuid){
   var token = jwt.sign(profile, config.secret, { expiresIn: 365 * 24 * 60 * 60 });
   var expiryDate = new Date(Number(new Date()) + 365 * 24 * 60 * 60 * 1000); 
   if ((req.body.username === 'john.doe' && req.body.password === 'foobar')) {//make a database call here
    res.send(401, 'Wrong user or password');
    return;
   }
   else{
     res.cookie("token", token, { expires: expiryDate, httpOnly: true });
     res.cookie("uuid",uuid.v1(), { expires: expiryDate, httpOnly: true });

     //save token and uuid in session local memory and redis
     req.session.token = token;//session id created due to this
     req.session.uuid = uuid;

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

   // console.log(req.session,"s");
   console.log(   req.sessionID,"sssss");
     // console.log(res.session,"ss");
     // console.log(res.cookies,"sss");
     // console.log(req.cookies,"ssss");



// req.session.token = token;
    // req.session.lastPage = '/awesome';

  // res.json({ token: token,syz:req.session.lastPage });
    console.log("pong of login");
 
 
      res.send(JSON.stringify(req.body));

}
//Handle the registering
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

  // res.status(200).send("pong! of register");

});
router.get('/register', function(req, res){

  res.render('users1/register');

});
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

// RESEND CODE
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


/* Handle Login POST */
//isAuthenticated
router.post('/login',function(req, res){

  res.status(200).send("pong! of login");

});
router.get('/login', function(req, res){
   res.render('users1/login');

});


// route middleware to verify a token
router.use(function(req, res, next) {
  console.log("verifying the token");
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
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



router.get('/ping',isAuthenticated, function(req, res){
    res.status(200).send("pong!");
});

module.exports.router = router;
