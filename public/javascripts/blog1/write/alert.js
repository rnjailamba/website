$(document).ready(function(){


    //IS LOGGED IN AND SHOW ALERT IF NOT
    // ==============================================
    function isLoggedInAlert(){

        var x = $.ajax({
            url:"/loginMiddleware/isLoggedIn",
            type: 'GET',
            async: true,
            context: this,
            cache: false,
            processData: false,
            success: function(response) {
                console.log('Am i logged in?',response);
                if(response == true){

                }
                else{

                }
            },
            error: function(response) {
                console.log('Error with register ' + response.statusText);
                console.log("error page");
            }
        });


    }

    isLoggedInAlert();

});
