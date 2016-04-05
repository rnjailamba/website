/* ==============================================
    Fixed Navbar
   =============================================== */
$( document ).ready(function() {
  jQuery('.header').addClass('fixed-nav');
});
/* ==============================================
    Preloader
   =============================================== */

$(window).load(function() {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});
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


  //CHECK INPUT TEXT FIELD EMPTY
  // ==============================================
  function checkInputTextFieldEmpty(element){
    initializeTooltipster(element);
    var myfield = $(element).val();
    if(myfield.length == 0){
      element.tooltipster('show');
      return true;  

    }
    else{
      element.tooltipster('hide'); 
      return false; 
    }

  }


  //INITIALIZE THE TOOLTIPSTER FOR ELEMENT
  // ==============================================
  function initializeTooltipster(element){
    element.tooltipster({
      autoClose:false,
      trigger:'custom',
      position: 'right',
        functionInit: function(){
            return $(element).siblings('#myfield_description').html();
        }
    });
  } 


/* ======================================
     ON CLICKING TOP LEVEL PUBLISH COMMENT
   ====================================== */
   $(document).on('click','div.leave-a-reply .btn-black',function(){

    event.preventDefault();
    var textAreaElement = $(this).parents('.leave-a-reply').find('#comment');
    var checkComment = checkInputTextFieldEmpty(textAreaElement);
    if( !checkComment ){
      publishAttemptedForComment.trueFalse = true;
      publishAttemptedForComment.commentText = textAreaElement.val();
      var commentData = {};
      commentData.commentText = publishAttemptedForComment.commentText;
      commentData.aboveElement = $('.blog-comments');
      commentData.blogId = blogId;
      commentData.parentId = blogId;

      isLoggedIn(commentData);
    }
    else{
      sweetAlert("Oops...", "", "error");
        swal({   
                title: "Oops.....",   
                text: "You have not filled up any text above ! :)",
                type:'error',   
                timer: 1500,   
                allowEscapeKey:true,
                allowOutsideClick:true,       
                showConfirmButton: true  
              });
    }     

  });


/* ======================================
     ON CLICKING OTHER LEVEL PUBLISH COMMENT
   ====================================== */
   $(document).on('click','div.comment .btn-black',function(){

    event.preventDefault();
    var textAreaElement = $(this).parents('.leave-a-reply-to-comment').find('#comment');
    var checkComment = checkInputTextFieldEmpty(textAreaElement);
    if( !checkComment ){
      publishAttemptedForComment.trueFalse = true;
      publishAttemptedForComment.commentText = textAreaElement.val();
      var commentData = {};
      commentData.commentText = publishAttemptedForComment.commentText;
      commentData.aboveElement = $(this).parents('.leave-a-reply-to-comment')
                                        .prevAll(".comment-wrap:first"); 
      commentData.blogId = blogId;
      commentData.parentId = blogId;                                        
      isLoggedIn(commentData);
    }
    else{
      sweetAlert("Oops...", "", "error");
        swal({   
                title: "Oops.....",   
                text: "You have not filled up any text above ! :)",
                type:'error',   
                timer: 1500,   
                allowEscapeKey:true,
                allowOutsideClick:true,       
                showConfirmButton: true  
              });
    }     

  });


/* ======================================
     ON CLICKING OTHER REPLIES - ONLY THE INTENT - SO THIS WILL CREATE THE REPLY BOX
   ====================================== */
   $(document).on('click','div.comment-wrap .btn-white-sm',function(){
    event.preventDefault();
    var topCommentDiv = $(this).parents('.comment-wrap');
    var commentReply = createCommentReply();
    var isCommentBoxOpen = $( ".comment" ).has( ".leave-a-reply-to-comment" ).length;
    var isCommentBoxOpenAfterCurrentElement = $( topCommentDiv ).next().hasClass("leave-a-reply-to-comment");
    if( isCommentBoxOpen > 0 ){
      removeCommentBox();
    }
    if( isCommentBoxOpen == 0 || isCommentBoxOpenAfterCurrentElement == 0 ){
      $( commentReply ).insertAfter(topCommentDiv);
      $( commentReply ).find("#comment").focus();
    }
    $('html, body').animate({
          scrollTop: topCommentDiv.offset().top -85
        }, 500);
  });  


/* ======================================
     REMOVE THE COMMENT BOX
   ====================================== */
    function removeCommentBox(){

      $( ".comment .leave-a-reply-to-comment" ).remove( );                                     

    }


/* ======================================
     REMOVE TOP LEVEL PUBLISH COMMENT TEXT
   ====================================== */
    function removeTextTopLevel(){

      var x = $('.leave-a-reply').find('#comment').val('');                          

    }    


/* ======================================
     CREATE COMMENT REPLY
   ====================================== */
    function createCommentReply(){

      var outerMostDiv = $('<div>')
                              .attr("class", "leave-a-reply-to-comment");      
      var outerDiv = $('<div>')
                          .attr("class", "row");
      var form = $('<form>')
                        .attr({ action:"#", method:"POST" });
      var textArea = $('<textarea>')
                          .attr({ name:"comment", id:"comment" , class:"form-control" , rows:"8" , placeholder:"message" });
      var button = $('<button>')
                          .attr({ type:"submit", id:"class" , class:"btn-black" })
                          .text('Reply to Comment');
      var divButtonText =  $('<div>')
                                .attr("class", "col-md-12");

      form.append(divButtonText.append(textArea));                                             
      form.append(divButtonText.append(button));  
      return outerMostDiv.append(outerDiv.append(form));                                          

    }

/* ======================================
     IS ELEMENT OF TYPE 
   ====================================== */

   function isElementType(element,type){
      return $(element).is(type);
   }


/* ======================================
     CREATE COMMENT 
   ====================================== */
    function createComment(data){
// <div class="comment-wrap">
//     <div class="photo">
//         <a href="#"><img src="/img/blog/article/images/author.jpg" alt="S M Mishkatul Islam"></a>
//     </div> <!-- End .photo -->
//     <div class="full-comment">
//         <h5><a href="">Themography</a></h5>
//         <span class="date">June 15, 2015 at 2.17am</span>
//         <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit aperiam.</p>
//         <div class="reply">
//             <a class="btn-white-sm" href="#">Reply</a>
//         </div>
//     </div> <!-- End .full-comment -->
// </div> <!-- End .comment-wrap -->   
      var marginLeft = parseInt($( data.aboveElement ).css( "margin-left" ));   
      var isElementSpan = isElementType(data.aboveElement,"span"); //true or false
      if(isElementSpan)
        marginLeft = -60;
     
      var outerMostDiv = $('<div>')
                              .attr("class", "comment-wrap")   
                              .css("margin-left",marginLeft+60);
      var photoDiv = $('<div>')
                          .attr("class", "photo");
      var photoLink = $('<a>')
                          .attr("href", "#");   
      var photoImage = $('<img>')
                          .attr({ src:"/img/blog/article/images/author.jpg", alt:"Image" });                                                    

      var commentDiv = $('<div>')
                              .attr("class", "full-comment");
      var commentHeading = $('<h5>');
      var commentHeadingLink = $('<a>')
                                  .attr("href", "#")
                                  .text("Themography");   
      var commentSpan = $('<a>')
                            .attr("class", "date")
                            .text("June 15, 2015 at 2.17am");     
      var commentParagraph = $('<p>')
                            .text(String(data.commentText));  
      var commentReplyDiv = $('<div>')
                                .attr("class", "reply");
      var commentReplyLink = $('<a>')
                                  .attr({ class:"btn-white-sm", href:"#" })
                                  .text("Reply");  
      commentReplyDiv.append(commentReplyLink);    
      commentDiv.append(commentHeading.append(commentHeadingLink));    
      commentDiv.append(commentReplyDiv);    
      commentDiv.append(commentSpan);    
      commentDiv.append(commentParagraph);    

      photoLink.append(photoImage);
      photoDiv.append(photoLink);    

      outerMostDiv.append(photoDiv);
      outerMostDiv.append(commentDiv);

      return outerMostDiv;                                          

    }    


/* ======================================
     IS LOGGED IN AND SHOW ALERT IF NOT
   ====================================== */
    function isLoggedIn(commentData){

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
                 ajaxCallForSubmitComment(commentData);
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
            success: function(response, textStatus, xhr) {
                console.log('Comment submission succesfull',xhr.status);
                if(xhr.status == 200 ){
                  addCommentDynamically(data);
                }
                else{
                  alert("comment was not added due to internal error");
                  console.log('comment was not added due to internal error',response,textStatus,xhr);

                } 
            },
            error: function(response) {
                console.log('Error with comment submission ' + response.statusText);
                console.log("error page");
            }
        });
    } 


/* ======================================
     ADD ELEMENT DYNAMICALLY
   ====================================== */
    function addCommentDynamically(data){
      var comment =  createComment(data);
      $( comment ).insertAfter(data.aboveElement);
      removeCommentBox();
      removeTextTopLevel();
      $('html, body').animate({
        scrollTop: (data.aboveElement).offset().top -85
      }, 500);
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

