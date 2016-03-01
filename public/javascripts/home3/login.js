jQuery(document).ready(function($){
	var formModal = $('.cd-user-modal'),
		formLogin = formModal.find('#cd-login'),
		formSignup = formModal.find('#cd-signup'),
		formForgotPassword = formModal.find('#cd-reset-password'),
		formEnterDetailsOTP = formModal.find('#cd-enter-details'),
		formEnterResetPasswordDetailsOTP = formModal.find('#cd-reset-password-enter-details'),
		formModalTab = $('.cd-switcher'),
		tabLogin = formModalTab.children('li').eq(0).children('a'),
		tabSignup = formModalTab.children('li').eq(1).children('a'),
		forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
		backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
		backToLoginLinkResetPasswordEnterDetails = formEnterResetPasswordDetailsOTP.find('.cd-form-bottom-message a'),
		sendOTPButton = formSignup.find('p .sendOTP'),
		loginButton = formLogin.find('p .loginButton'),
		signupButton = formEnterDetailsOTP.find('p .signUpButton'),
		resetPasswordButton = formForgotPassword.find('p .resetButton'),
		resendOTPLink = formEnterDetailsOTP.find('.cd-form-bottom-message a'),
		mainNav = $('.main-nav');


	//OPEN MODAL
	// ==============================================
	mainNav.on('click', function(event){
		$(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
	});


	//OPEN SIGN-UP FORM
	// ==============================================
	mainNav.on('click', '.cd-signup', signupSelected);


	//OPEN LOGIN-FORM FORM
	// ==============================================
	mainNav.on('click', '.cd-signin', loginSelected);


	//CLOSE MODAL
	// ==============================================
	formModal.on('click', function(event){
		if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
			formModal.removeClass('is-visible');
		}
	});


	//CLOSE MODAL WHEN CLICKING THE ESC KEYBOARD BUTTON
	// ==============================================
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		formModal.removeClass('is-visible');
	    }
    });


	//SWITCH FROM A TAB TO ANOTHER
	// ==============================================
	formModalTab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( tabLogin ) ) ? loginSelected() : signupSelected();
	});


	//HIDE OR SHOW PASSWORD
	// ==============================================
	$('.hide-password').on('click', function(){
		var togglePass= $(this),
			passwordField = togglePass.prev('input');
	    console.log("in hide",togglePass,passwordField);


		( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
		( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
		//focus and move cursor to the end of input field
		passwordField.putCursorAtEnd();
	});


	//SHOW FORGOT-PASSWORD FORM
	// ==============================================
	forgotPasswordLink.on('click', function(event){
		event.preventDefault();
		forgotPasswordSelected();
	});


	//BACK TO LOGIN FROM THE FORGOT-PASSWORD FORM
	// ==============================================
	backToLoginLink.on('click', function(event){
		event.preventDefault();
		loginSelected();
	});


    //BACK TO LOGIN FROM THE FORGOT-PASSWORD ENTER DETAILS FORM
    // ==============================================
    backToLoginLinkResetPasswordEnterDetails.on('click', function(event){
        event.preventDefault();
        loginSelected();
    });


    //GO TO ENTER DETAILS AND OTP
    // ==============================================
    sendOTPButton.on('click', function(event){
        var errMessage = formSignup.find('input[type="tel"]').hasClass('has-error');
        if(errMessage){
            formSignup.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        event.preventDefault();
        var phoneNumber = $('#mobile').val();
        console.log(phoneNumber);
        if( checkNumber(phoneNumber) ){
            if( getlength(phoneNumber) !=10 ){
                formSignup.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            }
            else{
                enterDetails();
                ajaxCallForOTP(phoneNumber);
            }
        }
        else{
            formSignup.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
    });

    //CLICK THE SIGNUP BUTTON
    // ==============================================
    signupButton.on('click', function(event){
        event.preventDefault();
        var errMessageEmail = formEnterDetailsOTP.find('input[type="email"]').hasClass('has-error');
        var errMessagePassword = formEnterDetailsOTP.find('input[type="password"]').hasClass('has-error');
        var errMessageIncorrectOTP = formEnterDetailsOTP.find('input[type="text"]').hasClass('has-error');
        var errMessageAgreeTerms = formEnterDetailsOTP.find('input[type="checkbox"]').hasClass('has-error');

//        alert(errMessageAgreeTerms);
        if( errMessageEmail ){
            formEnterDetailsOTP.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        if( errMessagePassword ){
            formEnterDetailsOTP.find('input[type="password"]').toggleClass('has-error').siblings('.cd-error-message').toggleClass('is-visible');
        }
        if( errMessageIncorrectOTP ){
            formEnterDetailsOTP.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        if( errMessageAgreeTerms ){
            formEnterDetailsOTP.find('input[type="checkbox"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }

        var signupEmail = $('#email').val();
        var signupPassword = $('#signup-password').val();
        var signupOTP = $('#signup-otp').val();

        var isCheckAgreeTerms = $('#' + 'accept-terms').is(":checked");
        var isValidEmail = isEmail(signupEmail); // Checks for ascii already
        var isPasswordEmpty = (signupPassword.length == 0);
        var isPasswordASCII = isASCII(signupPassword);
        var isOTPASCII = isASCII(signupOTP);

//        alert(isCheckAgreeTerms);

        if( !isValidEmail ){
            formEnterDetailsOTP.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        if( isPasswordEmpty ){
            formEnterDetailsOTP.find('input[type="password"]').toggleClass('has-error').siblings('.cd-error-message').toggleClass('is-visible');
        }
        if( !isOTPASCII ){
            formEnterDetailsOTP.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        if( !isCheckAgreeTerms ){
            console.log("here to show");
            var x = formEnterDetailsOTP.find('input[type="checkbox"]');
            console.log(x);
            formEnterDetailsOTP.find('input[type="checkbox"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }




//        alert(isEmail(signupEmail));
//        alert(isCheckTerms);
//$(this).val().length === 0
//        alert(isOTPASCII);
        //check if valid email , otp
        // or just check otp
        //http://stackoverflow.com/questions/15259170/checking-if-input-value-is-not-empty-or-default
    });


    //CLICK THE LOGIN BUTTON
    // ==============================================
    loginButton.on('click', function(event){
        event.preventDefault();
        alert("login pressed");
        //check if email in records/no then tell message acc
    });



    //RESEND OTP SO GO BACK TO  ENTER PHONE
    // ==============================================
    resendOTPLink.on('click', function(event){
        event.preventDefault();
        signupSelected();
    });


    //CLICK THE RESET PASSWORD
    // ==============================================
    resetPasswordButton.on('click', function(event){

        var errMessage = formEnterResetPasswordDetailsOTP.find('input[type="tel"]').hasClass('has-error');
        if(errMessage){
            formEnterResetPasswordDetailsOTP.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
        event.preventDefault();

        var phoneNumber = $('#mobileForgot').val();
        console.log(phoneNumber);
        if( checkNumber(phoneNumber) ){
            if( getlength(phoneNumber) !=10 ){
                formEnterResetPasswordDetailsOTP.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            }
            else{
                forgotPassword();

                ajaxCallForOTP(phoneNumber);
            }
        }
        else{
            formEnterResetPasswordDetailsOTP.find('input[type="tel"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        }
    });


    //GET LENGTH
    // ==============================================
    function getlength(phoneNumber) {
        return phoneNumber.toString().length;
    }


    //CHECK NUMBER
    // ==============================================
    function checkNumber(phoneNumber)
    {
        var x=phoneNumber;
        if (isNaN(x))
        {
            return false;
        }
        else{
            return true;
        }
    }


    //IS EMAIL
    // ==============================================
    function isEmail(email){
         var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         return regex.test(email);
    }


    //IS ASCII
    // ==============================================
    function isASCII(text){
         var regex = /^[\x20-\x7E]+$/;
         return regex.test(text);
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
		formEnterResetPasswordDetailsOTP.removeClass('is-selected');
        $('.cd-switcher').find('.selected').html("Sign in");


	}


    //SIGNUP SELECTED
    // ==============================================
	function signupSelected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.removeClass('is-selected');
	    formEnterDetailsOTP.removeClass('is-selected');
		formEnterResetPasswordDetailsOTP.removeClass('is-selected');
		formSignup.addClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.removeClass('selected');
		tabSignup.addClass('selected');

	}


    //ENTER DETAILS FOR SIGN UP
    // ==============================================
	function enterDetails(){
        formLogin.removeClass('is-selected');
		formSignup.removeClass('is-selected');
		formForgotPassword.removeClass('is-selected');
	    formEnterResetPasswordDetailsOTP.removeClass('is-selected');
		formEnterDetailsOTP.addClass('is-selected');
    }


    //FORGOT PASSWORD SELECTED
    // ==============================================
	function forgotPasswordSelected(){
		formLogin.removeClass('is-selected');
		formSignup.removeClass('is-selected');
		formEnterDetailsOTP.removeClass('is-selected');
		formEnterResetPasswordDetailsOTP.removeClass('is-selected');
		formForgotPassword.addClass('is-selected');
        $('.cd-switcher').find('.selected').html("Forgot Password");

	}

    //ENTER DETAILS FOR FORGOT PASSWORD
    // ==============================================
    function forgotPassword(){
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        formEnterResetPasswordDetailsOTP.addClass('is-selected');
        formEnterDetailsOTP.removeClass('is-selected');
        $('.cd-switcher').find('.selected').html("Forgot Password");
    }


    //AJAX CALL FOR OTP
    // ==============================================
	function ajaxCallForOTP(phoneNumber){
        console.log("in new function",phoneNumber);
        var data = {};
        data.phoneNumber = phoneNumber;

        $.ajax({
            url:"/users1/sendOTP",
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            contentType: 'application/json',
            context: this,
            cache: false,
            processData: false,
            success: function(response) {
                console.log('OTP sent succesfully',response);
            },
            error: function(response) {
                console.log('Error with sending OTP ' + response.statusText);
            }
        });
	}


	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	// ==============================================
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
// ==============================================
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};