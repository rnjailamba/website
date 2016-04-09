var modules = require('../../controllers/setup/all_modules');//require all modules that are shared by all controllers
var knox = require('knox');
var config = require('../../config/config.js');//require all modules that are shared by all controllers


console.log('connected to knox in helper',config.amazonS3key,config.amazonS3secret);


//var myCallback = function(data) {
//  console.log('got data: '+data);
//};
//
//var usingItNow = function(callback) {
//  callback('get it?');
//};
//
//usingItNow(myCallback);

var knoxClient;
var promise = new modules.Promise(function(resolve, reject) {
   knoxClient = knox.createClient({
      key: config.amazonS3key
    , secret: config.amazonS3secret
    , bucket: 'cementifyblogimages'
  });
//    console.log("created the promise",knoxClient);

  if ( typeof knoxClient !== 'undefined' && knoxClient ){
//        console.log("resolved");
      resolve(knoxClient);
  }
});


var export_knoxClient = require('../exporters/export_knoxClient.js');
export_knoxClient.setKnoxClient(knoxClient);



