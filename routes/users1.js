var express = require('express');
var router = express.Router();
var User1 = require('../model/user1');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file




router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User1({ 
    name: 'Nick', 
    password: 'password',
    admin: true 
  });
  console.log(nick);

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});



router.get('/', function(req, res) {
      res.status(200).send("pong!");

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



router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});




module.exports = router;
