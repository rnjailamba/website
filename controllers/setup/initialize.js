var exportedApp = require('../../helpers/exporters/export_app');
var basicPages = require('../basicPages.js');
var users1 = require('../users1.js');
var blog = require('../blog.js');
var products = require('../products.js');
var codeSnippets = require('../codeSnippets.js');
var partials = require('../partials.js');
var index = require('../index.js');

exportedApp.app.use('/', index.router);
exportedApp.app.use('/basic', basicPages.router);
exportedApp.app.use('/users1', users1.router);
exportedApp.app.use('/blog', blog.router);
exportedApp.app.use('/products', products);
exportedApp.app.use('/codeSnippets', codeSnippets.router);
exportedApp.app.use('/partials', partials.router);
