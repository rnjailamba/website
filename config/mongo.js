var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users1', function (error) {
    if (error) {
        console.log(error);
    }
    else{
        console.log("connection done");
    }
});