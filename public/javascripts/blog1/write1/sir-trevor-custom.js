$(document).ready(function () {
    <!--alert("here");-->

    new SirTrevor.Editor( {
        el: $('.js-st-instance'),
        defaultType: "Image",
        blockTypes: [
            "Text",
            "Heading",
            "Image",
            "List",
            "Quote",
            "Columns",
            "ImageExtended"
          ],
        required: [
            "Heading",
            "Text"
          ],
        onEditorRender: function() {
//            alert('Do something');
        }
    });

    SirTrevor.setDefaults({
      uploadUrl: "https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/1454841932002.jpg?AWSAccessKeyId=AKIAJDTELPCXKB6E3LBQ&Content-Type=image%3Bcharset%3DUTF-8&Expires=1460841932&Signature=S8sgrSI%2FQgmonHYHogye14sRE6o%3D"
   });




});