// Twilio Credentials 
var exports = module.exports = {};

var accountSid = 'ACbfbda838da573c3029e8e85b652d5968'; 
var authToken = '24142dc91650125660913a63855408b2'; 
 
//require the Twilio module and create a REST client 
console.log("exporting twilio client");
exports.client = require('twilio')(accountSid, authToken); 
 
// client.messages.create({ 
// 	to: "+917838185123", 
// 	from: "+12027914038", 
// 	body: "heyy",   
// }, function(err, message) { 
// 	console.log(message.sid); 
// });