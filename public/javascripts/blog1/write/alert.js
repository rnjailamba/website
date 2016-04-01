$(document).ready(function(){
    var formModal = $('.cd-user-modal'),
      formLogin = formModal.find('#cd-login'),
      formSignup = formModal.find('#cd-signup'),
      formForgotPassword = formModal.find('#cd-reset-password'),
      formForgotPasswordDetailsSignup = formModal.find('#cd-reset-password-enter-details-signup'),
      formEnterDetailsOTP = formModal.find('#cd-enter-details'),
      formEnterLoginDetailsToSignUp = formModal.find('#cd-login-enter-details'),

      formModalTab = $('.cd-switcher'),
      tabLogin = formModalTab.children('li').eq(0).children('a'),
      tabSignup = formModalTab.children('li').eq(1).children('a'),

      forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
      backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
      backToForgetPasswordLinkResetPasswordEnterDetailsSignup = formForgotPasswordDetailsSignup.find('.cd-form-bottom-message a'),
      resendOTPLink = formEnterDetailsOTP.find('.cd-form-bottom-message a'),
      resendOTPLinkAtLogin = formEnterLoginDetailsToSignUp.find('.cd-form-bottom-message a'),

      sendOTPButton = formSignup.find('p .sendOTP'),
      signupButton = formEnterDetailsOTP.find('p .signUpButton'),

      loginButton = formLogin.find('p .loginButton'),
      loginButtonWithDetails = formEnterLoginDetailsToSignUp.find('p .loginButtonWithDetails'),

      logoutButton = $('.cd-signout');

      resetPasswordButton = formForgotPassword.find('p .resetButton'),
      resetPasswordButtonDetailsSignup = formForgotPasswordDetailsSignup.find('p .resetButtonDetails'),

      mainNav = $('.main-nav');


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
                  //do nothing
                   swal({   
                   	 	title: "You are logged in!",   
                   	 	text: "Happy writing",
                   	 	type:'success',   
                   	 	timer: 1500,   
						allowEscapeKey:true,
						allowOutsideClick:true,			 	
                   	 	showConfirmButton: false 
                   	});
                }
                else{
                  swal({
                      title: 'Please login to post your blog',
                      text: 'Thank you :)',
                      showCancelButton: true,
                      closeOnConfirm: true,
                      cancelButtonText: "I will login later",
  					  confirmButtonColor: "#2ecc71",
                      showLoaderOnConfirm: true,
                      allowEscapeKey:true,
                      allowOutsideClick:true,
                    }, function(){
                    	loginSelected();
                    });
                }
            },
            error: function(response) {
                console.log('Error with register ' + response.statusText);
                console.log("error page");
            }
        });


    }


    //LOGIN SELECTED
    // ==============================================
    function loginSelected(){
      mainNav.children('ul').removeClass('is-visible');
      formModal.addClass('is-visible');
      formLogin.addClass('is-selected');
      formSignup.removeClass('is-selected');
      formEnterDetailsOTP.removeClass('is-selected');
      formForgotPassword.removeClass('is-selected');
      tabLogin.addClass('selected');
      tabSignup.removeClass('selected');
      formForgotPasswordDetailsSignup.removeClass('is-selected');
      formEnterLoginDetailsToSignUp.removeClass('is-selected');
      $('.cd-switcher').find('.selected').html("Sign in");
    }    

    isLoggedInAlert();


});
