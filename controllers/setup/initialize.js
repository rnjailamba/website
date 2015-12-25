var exportedApp = require('./export_app');
var basicPages = require('../index.js');
var users1 = require('../users1.js');

exportedApp.app.use('/', basicPages);
exportedApp.app.use('/users1', users1.router);

