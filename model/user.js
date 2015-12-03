var mongoose = require('mongoose');
console.log("in the user model");
 
module.exports = mongoose.model('User',{
        username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});