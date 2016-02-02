// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var time = Date.now || function() {
  return +new Date;
};

var preSignedURL = function(){
   var url = $(".presignedurl").text();
   return url;
}

// REPLACEPLACEHOLDER
// URL will be in form https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/placeholder.txt?AWSA....
// Replace placeholder in above string by epoch
// ==============================================
var replacePlaceholder = function(url){
    url = url.replace("placeholder",time()); // if you want only the first occurrence of "placeholder" to be replaced
    return url;
}

var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
  url: "fdfd",
  thumbnailHeight: 80,
  parallelUploads: 20,
  previewTemplate: previewTemplate,
  autoQueue: false, // Make sure the files aren't queued until manually added
  previewsContainer: "#previews", // Define the container to display the previews
  acceptedMimeTypes: "text/plain",
//  acceptedMimeTypes: "image/bmp,image/gif,image/jpg,image/jpeg,image/png",
  headers: {'Content-Type': 'text/plain;charset=UTF-8'},
  method: 'put',
  init: function() {
      this.on("processing", function(file) {
            console.log("new url here");
//            this.options.url = replacePlaceholder(preSignedURL());
            this.options.url = (preSignedURL());
      });
  },
  sending: function(file, xhr) {
    var _send = xhr.send;
    xhr.send = function() {
      _send.call(xhr, file);
    };
  },
  clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
});


myDropzone.on("addedfile", function(file) {
  // Hookup the start button
  file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
});

// Update the total progress bar
myDropzone.on("totaluploadprogress", function(progress) {
  document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
});

myDropzone.on("sending", function(file) {

  // Show the total progress bar when upload starts
  document.querySelector("#total-progress").style.opacity = "1";
  // And disable the start button
  file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
//  $.ajax({
//      type: 'PUT',
//      data: 'blah blah blah',
//      headers: {'Content-Type': 'text/plain;charset=UTF-8'},
//      dataType: "text",
//      cache: false,
//      processData: false,
//      success: function(response) {
//        console.log('S3 upload success!');
//      },
//      error: function(response) {
//        console.log('Error with S3 upload: ' + response.statusText);
//      }
//  });


});

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function(progress) {
  document.querySelector("#total-progress").style.opacity = "0";
});

// Setup the buttons for all transfers
// The "add files" button doesn't need to be setup because the config
// `clickable` has already been specified.
document.querySelector("#actions .start").onclick = function() {
  myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
};
document.querySelector("#actions .cancel").onclick = function() {
  myDropzone.removeAllFiles(true);
};