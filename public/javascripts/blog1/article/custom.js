/* ==============================================
    Fixed Navbar
   =============================================== */
jQuery(window).bind('scroll', function (){
  if (jQuery(window).scrollTop() > 80){
    jQuery('.header').addClass('fixed-nav');
  } else {
    jQuery('.header').removeClass('fixed-nav');
  }
});
/* ==============================================
    Preloader
   =============================================== */

$(window).load(function() {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});
});

/* ==============================================
    jQuery Instafeed
   =============================================== */
$(function() {
      var userFeed = new Instafeed({
          limit: 16,
          get: 'tagged',
          tagName: 'awesome',
          accessToken: '2106621868.95809bd.6cedcfe289c44294b83e1602f419049e',
          template: '<a target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
      });
      userFeed.run();
});

$( document ).ready(function() {

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


/* ======================================
     ON CLICKING TOP LEVEL REPLY
   ====================================== */
  $('div.leave-a-reply .btn-black').click(function(event){
    event.preventDefault();
    publishAttemptedForComment = true;
    var data = {};
    data.blogId = 12;
    data.parentId = 12;
    isLoggedIn(data);
  });


/* ======================================
     ON CLICKING OTHER REPLIES
   ====================================== */
  $('div.comment-wrap .btn-white-sm').click(function(event){
    event.preventDefault();
    // alert("clicked nested reply");
    var data = {};
    data.blogId = 12;
    data.parentId = 12;
    var topCommentDiv = $(this).parents('.comment-wrap');
    var commentReply = '<div class="row"><form action="#" method="POST"><div class="col-md-12"><textarea name="comment" id="comment" class="form-control" rows="8" placeholder="Message"></textarea></div><div class="col-md-12"><button type="submit" class="btn-black">Reply To Comment</button></div></form></div>';
    var isCommentBoxOpen = $( ".comment" ).has( ".row" ).length;
    var isCommentBoxOpenAfterCurrentElement = $( topCommentDiv ).next().hasClass("row");
    console.log(isCommentBoxOpenAfterCurrentElement);
    if( isCommentBoxOpen > 0 ){
      $( ".comment .row" ).remove( );
    }
    if( isCommentBoxOpen == 0 || isCommentBoxOpenAfterCurrentElement ==0 )
      $( commentReply ).insertAfter(topCommentDiv);
    // isLoggedIn(data);

    $('html, body').animate({
          scrollTop: topCommentDiv.offset().top -85
        }, 500);
  });  





/* ======================================
     IS LOGGED IN AND SHOW ALERT IF NOT
   ====================================== */
    function isLoggedIn(blogData){

        var x = $.ajax({
            url:"/loginMiddleware/isLoggedIn",
            type: 'GET',
            async: true,
            context: this,
            cache: false,
            processData: false,
            success: function(response) {
              console.log('Am i logged in for comment?',response);
              if(response == true){
                 ajaxCallForSubmitComment(blogData);
              }
              else{
                swal({
                  title: 'Please login to post your comment',
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
/* ======================================
     AJAX CALL FOR SUBMITTING COMMENT
   ====================================== */
    function ajaxCallForSubmitComment(data){
        console.log("in submit comment ",data);
        $.ajax({
            url:"/blog/galleryPostComments",
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
                console.log('Error with comment submission ' + response.statusText);
                console.log("error page");
            }
        });
    } 

/* ======================================
     LOGIN SELECTED
   ====================================== */
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
});

/* ======================================
     Full Screen Header
   ====================================== */
    function SetResizeContent() {
        var minheight = $(window).height();
        $(".full-screen").css('min-height', minheight);
    }
    SetResizeContent();
    //Navigation Visible On Scroll


    var IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
    var IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);


    if (IS_IPAD == true || IS_IPHONE == true) {

    }
    else
    {
        $('li.content-scroll figure').removeAttr('class');

        try {
            $(".content-scroll").mCustomScrollbar({
                autoHideScrollbar: true,
                theme: "minimal-dark"
            });
        }
        catch (err) {
        }


    }

