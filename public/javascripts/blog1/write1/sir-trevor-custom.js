$(document).ready(function () {
    <!--alert("here");-->

    var stInstance  = new SirTrevor.Editor( {
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
//        required: [
//            "Heading",
//            "Text"
//          ],
        onEditorRender: function() {
//            alert('Do something');
        },
        onFormSubmit: function(){
            alert("form submitted");
        }
    });

      $('.submit').on('click', function(e) {
        e.preventDefault();

        // Skip validaton for now, we're just saving as we're going
        SirTrevor.SKIP_VALIDATION = true;

        // Store the current set of cards
        SirTrevor.onBeforeSubmit();

        // Grab the data
        var json = SirTrevor.getInstance().store.retrieve();

        // Turn validation back on
        SirTrevor.SKIP_VALIDATION = false;

        $('.output').html(JSON.stringify(json, null, ' '));
      });

    SirTrevor.setDefaults({
      uploadUrl: "https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/1454841932002.jpg?AWSAccessKeyId=AKIAJDTELPCXKB6E3LBQ&Content-Type=image%3Bcharset%3DUTF-8&Expires=1460841932&Signature=S8sgrSI%2FQgmonHYHogye14sRE6o%3D"
   });

});