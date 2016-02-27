var app;

module.exports.exportApp = function(inApp) {
    app = inApp;
    module.exports.app = app;
    var initializeControllers = require("./initialize");

};


