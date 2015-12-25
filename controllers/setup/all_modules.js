var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config/config'); // get our config file
var uuid = require('node-uuid');



module.exports.express = express;
module.exports.jwt = jwt;
module.exports.config = config;
module.exports.uuid = uuid;
