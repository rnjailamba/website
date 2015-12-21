var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET users listing. */
// router.get('/register', function(req, res) {
//     res.render('register', { });
// });

// router.post('/register', function(req, res) {
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//             return res.render('register', { account : account });
//         }

//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/');
//         });
//     });
// });

// router.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

 
/* GET login page. */
router.get('/index', isAuthenticated,function(req, res) {
// Display the Login page with any flash message, if any
	res.render('users/index', { message: req.flash('message') });
	// res.render('users/register',{message: req.flash('message')});
	// res.redirect('users/index');


});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/users/index',
	failureRedirect: '/',
	failureFlash : true 
}));

/* GET Registration Page */
router.get('/signup', function(req, res){
	res.render('users/register',{message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/users/index',
	failureRedirect: '/users/signup',
	failureFlash : true 
}));

/* Handle Logout */
router.get('/signout', function(req, res) {
  console.log("signing out");
  req.logout();
  res.redirect('/');
});


 


module.exports = router;
