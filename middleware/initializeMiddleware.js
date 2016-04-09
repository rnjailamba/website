var exportedApp = require('../helpers/exporters/export_app');
var logginMiddleware = require('./login.js');
exportedApp.app.use('/loginMiddleware', logginMiddleware.router);
