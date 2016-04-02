//contains elb values

module.exports = function(){

    var userServiceURL;
    var blogServiceURL;
    var contentServiceURL;
    switch(process.env.NODE_ENV || 'development'){// other option is export NODE_ENV=development in console
        case 'development':
            userServiceURL = "http://localhost:9000/userService/";
            blogServiceURL = "http://localhost:8080/blogService/";
            // userServiceURL = "http://192.168.2.137:9000/userService/";

            break;

        case 'production':
            userServiceURL = "http://"
            break;

        default:

    }
     return {

       'userService.ping': userServiceURL+'ping',
       'userService.create': userServiceURL+'create',
       'userService.login': userServiceURL+'login',
       'userService.findByMobile': userServiceURL+'findByMobile',
       'userService.resetPassword': userServiceURL+'resetPassword',
       'userService.createCustomer': userServiceURL+'createCustomer',
       'userService.updateCustomerData': userServiceURL+'updateCustomerData',
       'userService.logout': userServiceURL+'logout',
       'userService.findCustomerByCustomerId': userServiceURL+'findCustomerByCustomerId',
       'userService.updatePassword': userServiceURL+'updatePassword',

       'blogService.createBlog': blogServiceURL+'createBlog',
       'blogService.readBlogs': blogServiceURL+'readBlogs',
       'blogService.ping': blogServiceURL+'ping',


    };
};


