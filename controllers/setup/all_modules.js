var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config/config'); // get our config file
var uuid = require('node-uuid'); // needed to generate uuids along with the token generation
var Promise = require("bluebird"); // needed to simulate promises
var winston = require('winston'); // used for logging
var request = require('request'); // used to make http requests
var urlgenerator = require('urlgenerator'); // used to generate url from base url and parameters


//var $ = require('jquery');


module.exports.express = express;
module.exports.jwt = jwt;
module.exports.config = config;
module.exports.uuid = uuid;
module.exports.Promise = Promise;
module.exports.winston = winston;
module.exports.request = request;
module.exports.urlgenerator = urlgenerator;
