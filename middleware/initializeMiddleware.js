var exportedApp = require('../controllers/setup/export_app');
var logginMiddleware = require('./login.js');
exportedApp.app.use('/loginMiddleware', logginMiddleware.router);
