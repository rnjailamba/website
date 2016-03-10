var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var twilioClient;
module.exports.setTwilioClient = function(inClient) { twilioClient = inClient; };

var redisClient;
module.exports.setClient = function(inClient) { redisClient = inClient; };

var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var mappings = appConfig();

// PING
// ============================================== 
router.get('/ping', function(req, res){
  // var bodyRet;
  // modules.request(
  //       {url:mappings['userService.ping']}, 
  //       function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //                 bodyRet = body;

  //           console.log("pring returned body1",body);
  //         }
  //         else{

  //         }
  //    });

   // var data = {};
   //  data.mobile = '7838185123';
   //  data.password = '7838185123';
   //  data.email = 'rnjai@gmail.com';


   // modules.request({
   //      url:mappings['userService.create'], 
   //      method: 'POST',
   //      json: data
   //    },
   //      function (error, response, body) {
   //        if (!error && response.statusCode == 200) {
   //                bodyRet = body; 

   //          console.log("pring returned bodyyy");
   //          res.status(200).send(body);
   //        }
   //        else{
   //          console.log("not signed up successfully");
   //        }
   //   });

   // var data = {};
   //  data.mobile = '7838185123';
   //  data.password = '7838185123';
   //  data.email = '';


   // modules.request({
   //      url:mappings['userService.resetPassword'], 
   //      method: 'POST',
   //      json: data
   //    },
   //      function (error, response, body) {
   //        if (!error && response.statusCode == 200) {

   //          console.log("pring returned body");
   //          res.status(200).send(body);
   //        }
   //        else{
   //          res.status(404).send( body);
   //        }

   //   });



   // var baseURL = "www.google.com";
   // var parameters = {};
   // parameters.mobile = '7838185123';
   // parameters.shit = 'xxx';
   // var result = createURLwithParameters(baseURL,JSON.stringify(parameters));
   // res.status(200).send(result);


   // var data = {};
   //  data.mobile = '7838185123';
   //  console.log(mappings['userService.findByMobile'].concat('?mobile=',data.mobile));

  // var createURLwithParameters = modules.urlgenerator.createURLwithParameters;
  // var baseURL = "www.google.com";
  // var parameters = {};
  // parameters.mobile = '7838185123';
  // parameters.shit = 'xxx';
  // var finalURL = createURLwithParameters(baseURL,parameters);
  // console.log("final URL is " , finalURL);
  // res.status(200).send(finalURL);

   // modules.request({
   //      url:mappings['userService.findByMobile'].concat('?mobile=',data.mobile)
   //    },
   //      function (error, response, body) {
   //        if (!error && response.statusCode == 200) {

   //          console.log("pring returned body");
   //          res.status(200).send(body);
   //        }
   //        else{
   //          res.status(404).send( body);
   //        }

     // });


    var osType = modules.os.type(); // 'Windows_NT' 
    var osPlatform = modules.os.platform(); // 'win32'
    var osArch = modules.os.arch(); // 'x64'
    res.status(200).send(osType.concat(osPlatform,osArch));

});


// SEND OTP AND SET COOKIE
// ==============================================
router.post('/sendOTPandSetCookie',function(req, res){

    // console.log('body: ' + JSON.stringify(req.body.phoneNumber));
    var phoneNumber = req.body.phoneNumber;
    var min = 1000;
    var max = 9999;
    var token = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(token,"token");
    var rString = randomString(32);

    twilioClient.messages.create({
        to: "+91" + phoneNumber,
        from: "+12027914038",
        body: "please enter this token to register successfully "+token,

        }, function(err, message) {

        console.log(message.sid);
        });
        // console.log(rString);

        // put in redis for 10 mins the token
        redisClient.select(1, function(err,res){

        redisClient.set(rString, token, function(err, reply) {
          // console.log("have set",reply);
        });
        redisClient.set(rString+"phone", phoneNumber, function(err, reply) {
          // console.log("have set",reply);
        });

        redisClient.expire(rString, 30*60);//expires in 180 seconds
        redisClient.expire(rString+"phone", 30*60);//expires in 180 seconds
        redisClient.get(rString, function(err, reply) {
            // console.log("am getting",reply);

        });
    });

    res.clearCookie('phone');
    res.cookie('phone',rString); // rString is taking place of phone
    res.status(200).send("done");

});



// CHECK OTP
// ==============================================
router.post('/checkOTP',function(req, res){
    
    // console.log(req.cookies.phone,"here to check otp"); 
    var rString = req.cookies.phone;
    var enteredOTP = req.body.otp;
    redisClient.get(rString, function(err, reply) {
      // console.log("have set otpo",reply);
      if( reply != null && enteredOTP == reply){
        // console.log("otp matched");
        res.status(200).send("done");
      }
      else if( reply != null ){
        res.status(404).send("notdone");
      }
      else{
        res.status(400).send("notdone");
      }
    }); 
});


// REGISTER
// ==============================================
router.post('/registerUser',function(req, res){
    console.log('register user: ' + JSON.stringify(req.body));
    var signupEmail = req.body.signupEmail;
    var signupPassword = req.body.signupPassword;
    var rString = req.cookies.phone;
    redisClient.get(rString+"phone", function(err, reply) {
      var data = {};
      data.mobile = reply;
      if( !isBlank(signupEmail)){
        data.email = signupEmail;
      }
      else console.log("email is empty ");
      data.password = signupPassword;
      modules.request({
        url:mappings['userService.create'], 
        method: 'POST',
        json: data
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body.customerId);
          res.cookie('customerId',body.customerId); // set cookie for customer id
          res.cookie('ruid',body.ruid); // set cookie for customer id
          redisClient.set(body.ruid, body.customerId, function(err, reply) {
            // console.log("have set",reply);
          });
          redisClient.expire(body.ruid, 300*60);//expires in 180 seconds
          res.status(200).send("done");
        }
        else{
          res.status(400).send("server side problem");

        }
      });
    }); 
});


// RESET/UPDATE PASSWORD
// ==============================================
router.post('/resetPassword',function(req, res){
    // console.log('resetting password user: ' + JSON.stringify(req.body));
    var resetEmail = req.body.resetEmail;
    var resetPassword = req.body.resetPassword;
    var rString = req.cookies.phone;
    redisClient.get(rString+"phone", function(err, reply) {
      var data = {};
      data.mobile = reply;
      if( !isBlank(resetEmail)){
        data.email = resetEmail;
      }
      else console.log("email is empty ");
      data.password = resetPassword;
      modules.request({
        url:mappings['userService.resetPassword'], 
        method: 'POST',
        json: data
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body.customerId);
          res.cookie('customerId',body.customerId); // set cookie for customer id
          res.cookie('ruid',body.ruid); // set cookie for customer id
          redisClient.set(body.ruid, body.customerId, function(err, reply) {
            // console.log("have set",reply);
          });
          redisClient.expire(body.ruid, 300*60);//expires in 180 seconds
          res.status(200).send("done");
        }
        else{
          res.status(400).send("server side problem");

        }
      });
    }); 
});


// LOGOUT
// ==============================================
router.post('/logout',function(req, res){
    var ruid = req.cookies.ruid;
    var customerId = req.cookies.customerId;
    console.log('logging out user',ruid,customerId);

    res.clearCookie('ruid');
    res.clearCookie('customerId');

    res.status(200).send("done");
    
});


// LOGIN
// ==============================================
router.post('/login',function(req, res){
    console.log('loggin in the user: ' + JSON.stringify(req.body));
    var phoneNumber = req.body.phoneNumber;
    var signinPassword = req.body.signinPassword;
    var rString = req.cookies.phone;
    var data = {};
    data.mobile = phoneNumber;
    data.password = signinPassword;
    modules.request({
      url:mappings['userService.login'], 
      method: 'POST',
      json: data
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.cookie('customerId',body.customerId); // set cookie for customer id
        res.cookie('ruid',body.ruid); // set cookie for customer id
        redisClient.set(body.ruid, body.customerId, function(err, reply) {
          // console.log("have set",reply);
        });
        redisClient.expire(body.ruid, 300*60);//expires in 180 seconds
        res.status(200).send("done");
      }
      else if(response != null && response.statusCode == 401){ // user is found with this mobile but password is wrong
        res.status(401).send("notdone");
      }
      else if(response != null &&response.statusCode == 404){ // user is not found with this mobile
        res.status(404).send("notdone");
      }
      else{
        res.status(400).send("server side problem");
      }
    });
});



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
  console.log("pong of login");
  res.send(JSON.stringify(req.body));
}




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

          if( !err ) console.log(message.sid);
          else console.log("Twilio error",err);
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


function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function createURLwithParameters(baseURL,parameters){
  if(!isEmpty(JSON.parse(parameters))){
     var obj = JSON.parse(parameters);
     var cnt = 0;
    for (var prop in obj) {
        if( cnt == 0 ) 
          baseURL = baseURL.concat('?',prop,'=',obj[prop]);
        else
          baseURL = baseURL.concat('&',prop,'=',obj[prop]); 
        cnt++;         
    }
  }
  return baseURL;
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function isEmpty(obj){
  return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
}

module.exports.router = router;
