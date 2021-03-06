  /* ==============================================
    Fixed Navbar
   =============================================== */
$( document ).ready(function() {
  jQuery('.header').addClass('fixed-nav');
});


/* ======================================
     IS ELEMENT OF TYPE 
   ====================================== */

   function isElementType(element,type){
      return $(element).is(type);
   }


/* ======================================
     GET DATE FORMATTED
   ====================================== */

   function getDateFormatted(d){

    var month = d.getMonth()+1;
    var day = d.getDate();

    return output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day; 
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
     CREATE COMMENT WITH MARGIN
   ====================================== */
    function createCommentWithMargin(data){
      var marginLeft = parseInt($( data.aboveElement ).css( "margin-left" ));   
      var isElementSpan = isElementType(data.aboveElement,"span"); //true or false
      if(isElementSpan)
        marginLeft = -60;
      var params = {};
      params.marginLeft = marginLeft;
      return createComment(data,params);

    }    


/* ======================================
     CREATE COMMENT 
   ====================================== */
    function createComment(data,params){
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
      // console.log(JSON.stringify(data));
      var outerMostDiv = $('<div>')
                              .attr("class", "comment-wrap")   
                              .css("margin-left",params.marginLeft+60);
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
                                  .text("Your Comment");   
      var commentSpan = $('<a>')
                            .attr("class", "date")
                            .text(getDateFormatted(new Date()));     
      var commentParagraph = $('<p>')
                            .text(String(data.commentText));  
      var commentReplyDiv = $('<div>')
                                .attr("class", "reply");
      var commentReplyLink = $('<a>')
                                  .attr({ class:"btn-white-sm", href:"#" })
                                  .text("Reply");  
      var showMoreReplyDiv = $('<div>')
                                .attr("class", "show-reply");                                  
      var showMoreReplyLink = $('<a>')
                                  .attr({ class:"btn-white-sm", href:"#" })
                                  .text("Show replies");                                    

      if ('commentId' in data){
        outerMostDiv.attr("data-commentId",data.commentId);
      }         
      if ('postedByUserName' in data){
        commentHeadingLink.text(data.postedByUserName);        
      }  
      else{
        commentHeadingLink.css("color","red"); // Just to show dynamically that it is new
      }
      if ('modifiedDate' in data){
        commentSpan.text(getDateFormatted( new Date(data.modifiedDate) ));
      }   



      commentReplyDiv.append(commentReplyLink);    
      commentDiv.append(commentHeading.append(commentHeadingLink));    
      commentDiv.append(commentReplyDiv);    
      commentDiv.append(commentSpan);    
      commentDiv.append(commentParagraph);    
      if ('noOfReplyCommentsCollections' in data){
        var noOfCollections = data.noOfReplyCommentsCollections;
        if( noOfCollections > 0 ){
          outerMostDiv.attr("data-totalCollections",noOfCollections);
          outerMostDiv.attr("data-currentCollections",0);
          showMoreReplyLink.text("Show replies ("+noOfCollections+")");
          showMoreReplyDiv.append(showMoreReplyLink);
          commentDiv.append(showMoreReplyDiv);
        }
      }        

      photoLink.append(photoImage);
      photoDiv.append(photoLink);    

      outerMostDiv.append(photoDiv);
      outerMostDiv.append(commentDiv);

      return outerMostDiv;                                          

    }    


/* ======================================
     CREATE BLOG TITLE
   ====================================== */
    function createBlogHTMLTitle(){

      var outerMostDiv = $('<div>')
                              .attr("class", "post");      
      var blogTitle = $('<div>')
                          .attr("class", "blog-title");
      var blogTitleHeading = $('<h1>');
      var blogTitleHeadingLink = $('<a>')
                                      .attr("href", "#");  

      var metaDiv = $('<div>')
                              .attr("class", "meta"); 
      var photoImage = $('<img>')
                          .attr({ src:"/img/blog/article/images/author.jpg", alt:"Image" });                                                    

      var commentDiv = $('<div>')
                              .attr("class", "full-comment");
      var unorderedList = $('<ul>')
      var listCategory = $('<li>')
                              .attr("class", "category");
      var listCategoryLink = $('<a>')
                                .attr("href", "#");                              
      var listAuthor = $('<li>')
                            .attr("class", "author");
      var listDate = $('<li>')
                            .attr("class", "date");
      var listComment = $('<li>')
                              .attr("class", "comment"); 

      var title = blogContent.title;
      if(typeof title != 'undefined' && title != null){

        blogTitleHeadingLink.text(title);

      }
      else{
        
        blogTitleHeadingLink.text("No title provided");

      }

      var category = blogContent.categoryId;
      if(typeof category != 'undefined' && category != null){

        listCategoryLink.text(category);

      }
      else{
        
        listCategoryLink.text("No category provided");

      }      

      var date = blogContent.createdDate;
      if(typeof date != 'undefined' && date != null){

        listDate.text(date);

      }
      else{
        
        listDate.text("No date provided");

      }  

      var userName = blogContent.customerId;
      if(typeof userName != 'undefined' && userName != null){

        listAuthor.text(userName);

      }
      else{
        
        listAuthor.text("No user name");

      }  
      var totalComments = blogContent.totalComments;
      if(typeof totalComments != 'undefined' && totalComments != null){

        listComment.text(totalComments+" comments");
      }
      else{
        
        listComment.text("No comments");

      }                                   

      blogTitle.append(blogTitleHeading.append(blogTitleHeadingLink));

      unorderedList.append(listCategory.append(listCategoryLink));
      unorderedList.append(listAuthor);
      unorderedList.append(listDate);
      unorderedList.append(listComment);

      metaDiv.append(unorderedList);
      
      outerMostDiv.append(blogTitle);
      outerMostDiv.append(metaDiv);
      
      return outerMostDiv;                                       

    }


/* ======================================
     CREATE BLOG IMAGE SINGLE
   ====================================== */
    function createBlogHTMLImageSingle(imageList){

    // <div class="thum-item">
    //      <img src="https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/1459912919472.jpg" alt="Post Thumnail Image">
    // </div>     

      var outerMostDiv = $('<div>')
                              .attr("class", "thum-item");      
      
      var obj = imageList;
      var photoImage;
      for (var i=0; i<obj.length; i++){
        var imageUrl = obj[i]["imageUrl"];
        imageUrl = imageUrl.substring(0, imageUrl.indexOf(".jpg")+4);
        console.log(imageUrl);

        photoImage = $('<img>')
                          .attr({ src:imageUrl, alt:"Post Thumbnail Image" })
      }                              

      return outerMostDiv.append(photoImage);           
    }    


/* ======================================
     CREATE BLOG IMAGE MULTIPLE
   ====================================== */
    function createBlogHTMLImageMultiple(imageList){
// <div class="thum-item">
//     <div id="gallery-slider" class="carousel slide" data-ride="carousel">
//         <div class="carousel-inner" role="listbox">
//             <div class="item active">
//                 <div class="gallery-item">
//                     <img class="" src="/img/blog/article/images/placeholder-post-thum.jpg" alt="">
//                 </div> <!-- End .slider-img -->
//             </div>
//             <div class="item">
//                 <div class="gallery-item">
//                     <img class="" src="/img/blog/article/images/placeholder-post-thum.jpg" alt="">
//                 </div> <!-- End .slider-img -->
//             </div>
//         </div>
//         <a class="left-arrow carousel-control" href="#gallery-slider" role="button" data-slide="prev">
//             <span class="fa fa-angle-left" aria-hidden="true"></span>
//             <span class="sr-only">Previous</span>
//         </a>
//         <a class="right-arrow carousel-control" href="#gallery-slider" role="button" data-slide="next">
//             <span class="fa fa-angle-right" aria-hidden="true"></span>
//             <span class="sr-only">Next</span>
//         </a>
//     </div><!-- /.carousel -->
// </div> <!-- End .thum-item -->

      var outerMostDiv = $('<div>')
                              .attr("class", "thum-item");      
      var gallerySliderDiv = $('<div>')
                                .attr("id", "gallery-slider")
                                .attr("class", "carousel slide")
                                .attr("data-ride", "carousel");
      var carouselInnerDiv = $('<div>')
                                  .attr("class", "carousel-inner")
                                  .attr("role", "listbox");
      
      var obj = imageList;
      for (var i=0; i<obj.length; i++){
        var imageItemDiv = $('<div>')
                              .attr("class", "item"); 
        if( i == 1 ){
          imageItemDiv.attr("class","item active");
        }

        var galleryItem = $('<div>')
                              .attr("class", "gallery-item"); 
        var imageUrl = obj[i]["imageUrl"];
        imageUrl = imageUrl.substring(0, imageUrl.indexOf(".jpg")+4);
        // console.log(imageUrl);
        var photoImage = $('<img>')
                              .attr({ src:imageUrl, alt:"Image" })
                              .attr("class", ""); 
        carouselInnerDiv.append(imageItemDiv.append(galleryItem.append(photoImage)));                           

      }

      var leftArrowLink = $('<a>')
                            .attr("class", "left-arrow carousel-control")
                            .attr("href", "#gallery-slider")
                            .attr("role", "button")
                            .attr("data-slide", "prev");
      var faSpan = $('<span>')
                        .attr("class", "fa fa-angle-left")
                        .attr("aria-hidden", "true"); 
      var srSpan = $('<span>')
                        .attr("class", "sr-only")
                        .text("Previous"); 
      leftArrowLink.append(faSpan);                         
      leftArrowLink.append(srSpan);  

//         <a class="right-arrow carousel-control" href="#gallery-slider" role="button" data-slide="next">
//             <span class="fa fa-angle-right" aria-hidden="true"></span>
//             <span class="sr-only">Next</span>
//         </a>      

      var rightArrowLink = $('<a>')
                            .attr("class", "right-arrow carousel-control")
                            .attr("href", "#gallery-slider")
                            .attr("role", "button")
                            .attr("data-slide", "next");
      var faSpanRight = $('<span>')
                        .attr("class", "fa fa-angle-right")
                        .attr("aria-hidden", "true"); 
      var srSpanRight = $('<span>')
                        .attr("class", "sr-only")
                        .text("Next"); 
      rightArrowLink.append(faSpanRight);                         
      rightArrowLink.append(srSpanRight);    


      gallerySliderDiv.append(carouselInnerDiv);
      gallerySliderDiv.append(leftArrowLink);
      gallerySliderDiv.append(rightArrowLink);

      outerMostDiv.append(gallerySliderDiv);                                 

      return outerMostDiv;          
      
    }    


/* ======================================
     CREATE BLOG IMAGE HANDLER
   ====================================== */
    function createBlogHTMLImageHandler(imageList){

      var obj = imageList;
      if( obj == null || typeof obj == 'undefined' || obj.length == 0 ){
        return;
      }
      else if( obj.length == 1 ){
        return createBlogHTMLImageSingle(imageList);
      } 
      else if( obj.length > 1 ){
        return createBlogHTMLImageMultiple(imageList);
      } 
    }  


/* ======================================
     PARSE YOUTUBE URL
   ====================================== */
    function parseYoutubeUrl(videoUrl){
      var url = videoUrl;
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      } else {
          alert("not a youtube url");
      }
    }     


/* ======================================
     PARSE VIMEO URL
   ====================================== */
    function parseVimeoUrl(videoUrl){

      var url = videoUrl;
      var regExp =/http(s)?:\/\/(www\.)?vimeo.com\/(\d+)(\/)?(#.*)?/;

      var match = url.match(regExp);

      if (match){
          return match[3];
      }else{
          alert("not a vimeo url");
      }
    }          


/* ======================================
     CREATE BLOG VIDEO VIMEO
   ====================================== */
    function createBlogHTMLVideoVimeo(videoUrl){
// <div class="thum-item">
//    <div class="embed-responsive embed-responsive-16by9">
//       <iframe src="https://player.vimeo.com/video/44801709?byline=0&amp;portrait=0" width="500" height="281" allowfullscreen=""></iframe>
//     </div> <!-- End .embed-responsive -->
// </div>
      //https://vimeo.com/163097374#at=3
      var stripUniqueId = parseVimeoUrl(videoUrl);
      // alert(stripUniqueId);
      videoUrl = ("https://player.vimeo.com/video/".concat(stripUniqueId)).concat("?byline=0&amp;portrait=0");
      var outerMostDiv = $('<div>')
                              .attr("class", "thum-item");
      var innerDiv = $('<div>')
                           .attr("class", "embed-responsive embed-responsive-16by9");                                    
      
      var iframe = $('<iframe>')
                          .attr({ src:videoUrl, width:"500", height:"281" ,allowfullscreen:"" });                       

      innerDiv.append(iframe);
      return outerMostDiv.append(innerDiv);           
    }      


/* ======================================
     CREATE BLOG VIDEO YOUTUBE
   ====================================== */
    function createBlogHTMLVideoYoutube(videoUrl){
// <div class="thum-item">
//     <div class="embed-responsive embed-responsive-16by9">
//         <iframe width="854" height="510" src="https://www.youtube.com/embed/pXwaKB7YOjw" allowfullscreen=""></iframe>
//     </div> <!-- End .embed-responsive -->
// </div>    
      //https://www.youtube.com/watch?v=S176AKQhcCk
      var stripUniqueId = parseYoutubeUrl(videoUrl);
      // alert(stripUniqueId);
      videoUrl = "https://www.youtube.com/embed/".concat(stripUniqueId);
      var outerMostDiv = $('<div>')
                              .attr("class", "thum-item");
      var innerDiv = $('<div>')
                           .attr("class", "embed-responsive embed-responsive-16by9");                                    
      
      var iframe = $('<iframe>')
                          .attr({ src:videoUrl, width:"854", height:"510" ,allowfullscreen:"" })                             

      innerDiv.append(iframe);
      return outerMostDiv.append(innerDiv);   ;           
    }        


/* ======================================
     CREATE BLOG HTML VIDEO HANDLER
   ====================================== */
    function createBlogHTMLVideoHandler(videoList){

      var obj = videoList;
      if( obj == null || typeof obj == 'undefined' || obj.length == 0 ){
        return;
      }
      else {
        for (var i=0; i<obj.length; i++){
          var videoUrl = obj[i]["videoUrl"];
          console.log(videoUrl);
          if( videoUrl.indexOf("youtube") > -1 ){
            return createBlogHTMLVideoYoutube(videoUrl);
          }    
          else if( videoUrl.indexOf("vimeo") > -1 ){
            return createBlogHTMLVideoVimeo(videoUrl);
          }
        }
      } 
    }      



/* ======================================
     CREATE BLOG TEXT CONTENT
   ====================================== */
    function createBlogTextContent(text){
  // <div class="post">
  //   <div class="content">
  //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit aperiam.</p>
  //   </div>
  // </div>
      var outerMostDiv = $('<div>')
                              .attr("class", "post");      
      var contentDiv = $('<div>')
                                .attr("class", "content")
                                .append($(text));
      return outerMostDiv.append(contentDiv);

    }         


/* ======================================
     CREATE COMMENTS TITLE
   ====================================== */
    function createCommentsHTMLTitle(){

      var spanTitle = $('<span>')
                            .attr("class", "title blog-comments")
                            .text("Blog Comments");     
      
      return spanTitle;                                       

    }    


/* ======================================
     UPDATE SHOW MORE COMMENTS
   ====================================== */
    function updateShowMoreComments(){

      if( currentBlogCollection < totalBlogCollection ){

        var diff = totalBlogCollection - currentBlogCollection;
        $('.primary .comment-show-more a').text("Show more comments("+diff+")");
      
      }
      else{

        $('.primary .comment-show-more').empty();

      }
                                    
    }   

/* ======================================
     UPDATE SHOW MORE REPLIES
   ====================================== */
    function updateShowMoreReplies(currentCollections,totalCollections,showMoreDiv){

      if( currentCollections >= totalCollections ){

        showMoreDiv.empty();
      
      }
      else{
       
        showMoreDiv.find("a").text("Show Replies ("+(totalCollections-currentCollections)+")");

      }
                                    
    }     


/* ======================================
     UPDATE PUSH COMMENTS TO VIEW FROM ARRAY - AFTER DATABASE CALL
   ====================================== */
    function pushCommentsToView(blogComments,aboveElement){

      var obj = blogComments;
      // console.log(obj);
      for (var i=0; i<obj.length; i++){
        switch( obj[i]["paragraphType"]){
          case 'Text':
                    var data = {};
                    // console.log(JSON.stringify(obj[i]));
                    data.commentText = obj[i]["text"];
                    data.commentId = obj[i]["commentId"];
                    data.postedByUserName = obj[i]["postedByUserName"];
                    data.modifiedDate = obj[i]["modifiedDate"];
                    data.noOfReplyCommentsCollections = obj[i]["noOfReplyCommentsCollections"];     
                    var params = {};
                    if( aboveElement == null || aboveElement.hasClass('comment')){
                      params.marginLeft = -60;
                    }        
                    else{
                      console.log("setting it");
                      var marginLeft = parseInt($( aboveElement ).css( "margin-left" ));   
                      params.marginLeft = marginLeft;
                    }
                    var commentText = createComment(data,params);
                    if( params.marginLeft == -60){
                      aboveElement.append( commentText );
                    }
                    else{
                      commentText.insertAfter(aboveElement);
                    }

                    break;
          case 'Image':
                    alert("no support for images in blog comments at the moment");
                    break;
          default:
                    alert("theis paragraphType not supported in comments");                                
                    break;
        }
      }                           
    }       


/* ======================================
     AJAX CALL FOR SHOW MORE COMMENTS
   ====================================== */
    function ajaxCallForShowMoreComments(data){
        console.log("in ajaxCallForShowMoreComments ",data);
        $.ajax({
            url:"/blog/galleryPostCommentsShowMore",
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            contentType: 'application/json',
            context: this,
            cache: false,
            processData: false,
            success: function(response, textStatus, xhr) {
                console.log('Comments show more get succesfull',xhr.status);
                if(xhr.status == 200 ){
                  console.log(JSON.parse(response));
                  var aboveElement = $('div.comment');
                  pushCommentsToView(JSON.parse(response),aboveElement);
                }
                else{
                  alert("Comments show more get was unsuccessful due to internal error");
                  console.log('Comments show more get was unsuccessful due to internal error',response,textStatus,xhr);

                } 
            },
            error: function(response) {
                console.log('Error with comment submission ' + response.statusText);
                console.log("error page");
            }
        });
    }       


/* ======================================
     AJAX CALL FOR SHOW MORE REPLIES
   ====================================== */
    function ajaxCallForShowMoreReplies(data){
        console.log("in ajaxCallForShowMoreReplies ",data);
        $.ajax({
            url:"/blog/galleryPostCommentsShowMore",
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            contentType: 'application/json',
            context: this,
            cache: false,
            processData: false,
            success: function(response, textStatus, xhr) {
                console.log('Comments show more get succesfull',xhr.status);
                if(xhr.status == 200 ){
                  console.log((response));
                  console.log();
                  var aboveElement = $('div.comment');                  
                  pushCommentsToView(JSON.parse(response),data.aboveElement);


                }
                else{
                  alert("Comments show more get was unsuccessful due to internal error");
                  console.log('Comments show more get was unsuccessful due to internal error',response,textStatus,xhr);

                } 
            },
            error: function(response) {
                console.log('Error with comment submission ' + response.statusText);
                console.log("error page");
            }
        });
    }       


/* ==============================================
    PLACE BLOG CONTENT
   =============================================== */
$( document ).ready(function() {

  $('#content .blog-post').empty();
  $('#content .blog-post').append(createBlogHTMLTitle());
  
  var obj = blogContent.paragraphs;
  if ( typeof obj == 'undefined' ) return ;
  for (var i=0; i<obj.length; i++){
    switch( obj[i]["paragraphType"]){
      case 'Text':
                var blogText = createBlogTextContent(obj[i]["text"]);
                $('#content .blog-post').append( blogText );
                break;
      case 'Image':
                var blogImage = createBlogHTMLImageHandler(obj[i]["imageList"]);
                $('#content .blog-post').append(blogImage);
                break;
      case 'Video':
                var blogVideo = createBlogHTMLVideoHandler(obj[i]["videoList"]);
                $('#content .blog-post').append(blogVideo);
                break;                
      default:
                alert("paragraphType not supported");                                
                break;
    }
  }  
});


/* ==============================================
    PLACE BLOG COMMENTS INITIALLY
   =============================================== */
$( document ).ready(function() {

  $('div.comment').empty();
  $('div.comment').append(createCommentsHTMLTitle());
  var aboveElement = $('div.comment');
  pushCommentsToView(blogComments,aboveElement);
  updateShowMoreComments();
});


/* ==============================================
    CLICK SHOW MORE TO GET MORE COMMENTS
   =============================================== */
$( document ).ready(function() {
  $('.primary .comment-show-more a').click(function(){
    var data = {};
    data.blogId = blogId;
    data.currentBlogCollection = ++currentBlogCollection;
    ajaxCallForShowMoreComments(data);
    updateShowMoreComments();
  }); 

});  

  
// /* ==============================================
//     Preloader
//    =============================================== */

// $(window).load(function() {
//   $('#status').fadeOut();
//   $('#preloader').delay(350).fadeOut('slow');
//   $('body').delay(350).css({'overflow':'visible'});
// });

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
      console.log(commentData.aboveElement.attr("data-commentId"));
      commentData.blogId = blogId;
      commentData.parentId = commentData.aboveElement.attr("data-commentId");                                        
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
   $(document).on('click','div.comment-wrap .reply',function(){
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
     ON CLICKING SHOW REPLIES TO COMMENTS
   ====================================== */
   $(document).on('click','div.comment-wrap .show-reply',function(){
    event.preventDefault();
    var topCommentDiv = $(this).parents('.comment-wrap');
    var commentId = $(topCommentDiv).attr("data-commentId"); 
    var currentCollections = $(topCommentDiv).attr("data-currentCollections"); 
    var totalCollections = $(topCommentDiv).attr("data-totalCollections"); 

    var data = {};
    data.blogId = blogId;
    data.currentBlogCollection = ++currentCollections;
    data.parentId = commentId;
    data.aboveElement = topCommentDiv;
    ajaxCallForShowMoreReplies(data);  
    updateShowMoreReplies(currentCollections,totalCollections,$(this));  
    $(topCommentDiv).attr("data-currentCollections",currentCollections);
    //get data

    //run loop

      //add comment dynamically 

    //perform a check to see if have to increase current collection
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
     CHECK BLOGID = PARENTID
   ====================================== */
    function checkBlogidParentid(data){

      if( data.blogId == data.parentId) return true;
      else return false                      

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
     AJAX CALL FOR SUBMITTING COMMENT -TOP LEVEL AND REPLIES
   ====================================== */
    function ajaxCallForSubmitComment(data){
        console.log("in submit comment ",data);
        if(checkBlogidParentid(data)){
          action = "galleryPostComments"
        }    
        else{
          action = "galleryPostCommentReplys";
        }    
        $.ajax({
            url:"/blog/"+action,
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
                  data.commentId = response.commmentId;  
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
     ADD ELEMENT DYNAMICALLY - AFTER CLICK CALL
   ====================================== */
    function addCommentDynamically(data){
      var comment =  createCommentWithMargin(data);
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

