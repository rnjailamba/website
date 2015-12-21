var modules = require("./all_modules.js");//simply loads all modules, no initialisation/creation of object of module
var initHelper = require("./helpers/initializeHelpers.js");//initialize database connections etc.


var app = modules.express();

// view engine setup
app.set('views', modules.path.join(__dirname, 'views'));
app.set('view engine', 'ejs');// set up ejs for templating

app.use('/jquery', modules.express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', modules.express.static(__dirname + '/node_modules/bootstrap/dist/'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(modules.session({
    secret: 'keyboard cat',
    proxy: true,
    resave: false,
    cookie: {httpOnly: true ,maxAge : 365 * 24 * 60 * 60 * 1000},
    saveUninitialized: false

}));//https://github.com/expressjs/session/issues/56

app.use(modules.flash()); // use connect-flash for flash messages stored in session


app.set('superSecret', modules.config.secret); // secret variable
console.log(modules.config.secret);


app.use(modules.logger('dev')); // log every request to the console
// use body parser so we can get info from POST and/or URL parameters

app.use(modules.bodyParser.json());// get information from html forms
app.use(modules.bodyParser.urlencoded({ extended: false }));
app.use(modules.cookieParser());// read cookies (needed for auth)
app.use(modules.express.static(modules.path.join(__dirname, 'public')));

app.use('/', modules.routes);
app.use('/users1', modules.users1.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
