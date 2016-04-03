jQuery(document).ready(function($){
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

	if( $('.floating-labels').length > 0 ) floatLabels();
	

	//FLOAT LABELS
	// ==============================================
	function floatLabels() {
		var inputFields = $('.floating-labels .cd-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}


	//CHECK VAL
	// ==============================================	
	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}


	//CHECK INPUT TEXT FIELD EMPTY
	// ==============================================
	function checkInputTextFieldEmpty(element,e){
		initializeTooltipster(element);
		var myfield = $(element).val();
		if(myfield.length == 0){
			$(element).tooltipster('show');
			return true;	

		}
		else{
			$(element).tooltipster('hide');	
			return false;	
		}

	}


	//INITIALIZE THE TOOLTIPSTER FOR ELEMENT
	// ==============================================
	function initializeTooltipster(element){
		$(element).tooltipster({
			autoClose:false,
			trigger:'custom',
			position: 'right',
		    functionInit: function(){
		        return $(element).siblings('#myfield_description').html();
		    }

		});
	}	


	//CHECK INPUT SELECT FIELD EMPTY
	// ==============================================
	function checkInputSelectFieldEmpty(element,e){
		initializeTooltipster(element);
		if (!$(element.concat(" option:selected")).val()) {
			$(element).tooltipster('show');		
			return true;	
		}
		else{
			$(element).tooltipster('hide');		
			return false;	
		}

	}	
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
                console.log('Am i logged in ( initial )?',response);
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
                   	  type:'success',   
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
        isLoggedInAlert();



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


    //IS LOGGED IN AND SHOW ALERT IF NOT
    // ==============================================
    function isLoggedIn(blogData){

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
					ajaxCallForSubmitBlog(blogData);
                }
                else{
					swal({
						title: 'Please login to post your blog',
						type:'success',   
						text: 'Thank you :)',
						closeOnConfirm: true,
						confirmButtonColor: "#2ecc71",
						showLoaderOnConfirm: true,
						allowEscapeKey:true,
						allowOutsideClick:true,
					}, function(){
						loginSelected();// After this the handling is done in loginAsynWithCallbacks
					});
                }
            },
            error: function(response) {
                console.log('Error with register ' + response.statusText);
                console.log("error page");
            }
        });
    }


    //AJAX CALL FOR SUBMITTING BLOG
    // ==============================================
    function ajaxCallForSubmitBlog(data){
        console.log("in submit up ",data);
        $.ajax({
            url:"/blog/writePost1",
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            contentType: 'application/json',
            context: this,
            cache: false,
            processData: false,
            success: function(response) {
                console.log('Blog submission succesfull',response);
                if(response.statusCode == 200 ){
                	window.location = "/blog/blogSummary?status=200";
                }
                else{
                	window.location = "/blog/blogSummary";
                }
            },
            error: function(response) {
                console.log('Error with blog submission ' + response.statusText);
                console.log("error page");
            }
        });
    }	


    //CONVERT SIR TREVOR TEXT
    // ==============================================
    function convertSirTrevorData(sirTrevorText){
      var objectsirTrevorText = JSON.parse( sirTrevorText );   // { foo: "bar" }
      var convertedArray = new Array(); // or the shortcut: = []

      console.log("in convertSirTrevorData ",JSON.stringify(objectsirTrevorText));

      if(!isEmpty(objectsirTrevorText)){
         var obj = objectsirTrevorText["data"];
          var type;
          var data;
        for (var i=0; i<obj.length; i++){
          for (var name in obj[i]) {
            // console.log("Item name: "+name+obj[i][name]);
            switch(name){
              case 'type':
                          type = obj[i][name];
                          break;
              case 'data':
                          data = obj[i][name];
                          break;
              default:
                        alert("data type is not known by system");
            } 
          }// end inner for loop
          console.log(type);
          switch(type){
            case 'heading':
                          console.log(JSON.stringify(data['text']));
                          var headingData = {};
                          headingData.text = data['text'];
                          headingData.paragraphType = "Text";
                          convertedArray.push(headingData);
                          break;
            case 'text':
                          console.log(JSON.stringify(data['text']));
                          var textData = {};
                          textData.text = data['text'];
                          textData.paragraphType = "Text";    
                          convertedArray.push(textData);                      
                          break;
            case 'list':
                          console.log(JSON.stringify(data["listItems"]));
                          var obj = data["listItems"];
                          var list = document.createElement('ul');
                          for (var i=0; i<obj.length; i++){
                            // Create the list item:
                            var item = document.createElement('li');
                            // Set its contents:
                            item.appendChild(document.createTextNode(obj[i]["content"]));
                            // Add it to the list:
                            list.appendChild(item);
                          }   
                          console.log(list.outerHTML);
                          var listData = {};
                          listData.text = String(list.outerHTML);
                          listData.paragraphType = "Text";
                          convertedArray.push(listData);
                          break;
            case 'image':
                          console.log(JSON.stringify(data['file']));
                          var imageData = {};
                          var imageURLs = new Array();

                          var singleImageData = {};
                          singleImageData.imageUrl = data['file']['url'];
                          singleImageData.imageCaption = "hello";
                          imageURLs.push ( singleImageData );

                          imageData.imageList = imageURLs;
                          imageData.paragraphType = "Image";                          
                          convertedArray.push(imageData);                      
                          break;
            case 'quote':
                          console.log(JSON.stringify(data['text']));
                          // console.log(JSON.stringify(data['cite']));
                          var quoteData = {};
                          quoteData.text = data['text'];
                          quoteData.paragraphType = "Text"; 
                          convertedArray.push(quoteData);                      
                          break;
            case 'video':
                          console.log(JSON.stringify(data['source']));
                          console.log(JSON.stringify(data['remote_id']));
                          var videoData = {};
                          var videoURLs = new Array();

                          var singleVideoData = {};
                          singleVideoData.videoUrl = data['remote_id'];
                          singleVideoData.videoCaption = "hello";
                          videoURLs.push ( singleVideoData );

                          videoData.videoList = videoURLs;                          
                          videoData.paragraphType = "Video";                          
                          convertedArray.push(videoData);                      
                          break;
            default : alert("this type is not known by system",type);

          }
        } // end outer for loop

        
      
      }
      else{
        alert(" is empty");
      }
      return convertedArray;
 
    }     


    function isEmpty(obj){
      return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
    }       

    //ON SUBMIT
    // ==============================================
  	$(document).ready(function(){
  		$('.cd-normal-form input[type="submit"]').click(function(e){
  			e.preventDefault();
  			var checkName = checkInputTextFieldEmpty('.myfield-name',e);
  			var checkAbout = checkInputTextFieldEmpty('.myfield-about',e);
  			// var checkPhone = checkInputTextFieldEmpty('.myfield-phone',e);
  			var checkTitle = checkInputTextFieldEmpty('.myfield-title',e);
  			var checkCategory = checkInputSelectFieldEmpty('.category',e);
  			var checkSubcategory = checkInputSelectFieldEmpty('.subcategory',e);

  		   	// as soon as a key is pressed on the keyboard, hide the tooltip.
  			$(window).keypress(function() {
  			  $('.myfield').tooltipster('hide');

  			});


  			if( !checkName && !checkTitle && !checkCategory && !checkSubcategory && !checkAbout){
  				var name = $('.myfield-name').val();
  				var about = $('.myfield-about').val();
  				// var phone = $('.myfield-phone').val();
  				var title = $('.myfield-title').val();
  				var category = $('.category').val();
  				var subcategory = $('.subcategory').val();			

          SirTrevor.onBeforeSubmit();
          SirTrevor.SKIP_VALIDATION = true;
          var sirTrevorText = $('.js-st-instance').val();
          var convertedArray = convertSirTrevorData(sirTrevorText);
          console.log(JSON.stringify(convertedArray));  
          var blogData = {};        
  				blogData.name = name;
  				blogData.about = about;
  				// data.phone = phone;
  				blogData.title = title;
  				blogData.category = category;
  				blogData.subcategory = subcategory;
  				blogData.sirTrevorText = convertedArray;
  				// console.log(name,phone,title,category,subcategory,tinymceText,imageURLs);
  				publishAttemptedWithFullDataWritePost = true;
  				isLoggedIn(blogData);
  	
  			}
  			else{
  				sweetAlert("Oops...", "", "error");
  			    swal({   
                 	 	title: "Oops.....",   
                 	 	text: "You have not filled up all the required fields above ! :)",
                 	 	type:'error',   
                 	 	timer: 1500,   
          					allowEscapeKey:true,
          					allowOutsideClick:true,			 	
                 	 	showConfirmButton: true	 
                 	});
  			}

  		});
  	});		
});

