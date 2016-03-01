//contains elb values

module.exports = function(){

    var userServiceURL;
    var blogServiceURL;
    var contentServiceURL;
    switch(process.env.NODE_ENV || 'development'){// other option is export NODE_ENV=development in console
        case 'development':
            userServiceURL = "http://localhost:9000/userService/";
            break;

        case 'production':
            userServiceURL = "http://"
            break;

        default:

    }
     return {

       'userService.ping': userServiceURL+'ping',

    };
};


