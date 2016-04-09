var app;
module.exports.exportApp = function(inApp) {
	console.log("App intitialized")
    app = inApp;
    module.exports.app = app;
};
