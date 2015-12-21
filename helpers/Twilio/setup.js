// Twilio Credentials

var accountSid = 'ACbfbda838da573c3029e8e85b652d5968';
var authToken = '24142dc91650125660913a63855408b2';
var twilioClient = require('twilio')(accountSid, authToken); //creates a new client

var users1 = require('../../controllers/users1.js');

users1.setTwilioClient(twilioClient);
//require the Twilio module and create a REST client
console.log("exporting twilio client from the helper");

