var exportedApp = require('./exporters/export_app');
var imageUploadAPI = require('./AmazonS3/imageUploadAPI.js');

exportedApp.app.use('/imageUploadAPI', imageUploadAPI.router);

var redisSetup = require('./Redis/setup.js');
var twilioSetup = require('./Twilio/setup.js');
var knoxSetup = require('./KnoxS3/setup.js');
var solrSetup = require('./Solr/setup.js'); 
