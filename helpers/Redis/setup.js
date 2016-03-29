var redis = require('redis');
var redisClient = redis.createClient().on('connect', function() {
     console.log('connected to redis in helper');
 }); //creates a new client

var users1 = require('../../controllers/users1.js');
users1.setClient(redisClient);

var basicPages = require('../../controllers/basicPages.js');
basicPages.setClient(redisClient);

var blog = require('../../controllers/blog.js');
blog.setRedisClient(redisClient);
