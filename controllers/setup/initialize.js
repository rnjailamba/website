var exportedApp = require('./export_app');
var basicPages = require('../index.js');
var users1 = require('../users1.js');
var blog = require('../blog.js');
var products = require('../products.js');

exportedApp.app.use('/', basicPages);
exportedApp.app.use('/users1', users1.router);
exportedApp.app.use('/blog', blog);
exportedApp.app.use('/products', products);

