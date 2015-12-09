var mongoose = require('mongoose');
console.log("in the user1 model");
 
module.exports = mongoose.model('User1',{
    name: String, 
    password: String, 
    admin: Boolean 
});

