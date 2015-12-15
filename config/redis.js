


var exports = module.exports = {};
var redis = require('redis');
exports.redisClient = redis.createClient().on('connect', function() {
    console.log('connected to redis');
}); //creates a new client

// redisClient.on('connect', function() {
//     console.log('connected to redis');
// });

console.log("in redis js");


// exports.sayHelloInEnglish = function() {
//   return "HELLO";
// };
   
// exports.sayHelloInSpanish = function() {
//   return "Hola";
// };