var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);


var app = {};
app.signS3RequestURL = '/admin/S3/sign';
app.S3_BUCKET = 'http://your-bucket-name.s3.amazonaws.com/';
app._dropzoneAcceptCallback = function _dropzoneAcceptCallback(file, done) {
  console.log("in accept callback");

  file.postData = [];
  $.ajax({
    url: app.signS3RequestURL,
    data: {
      name: file.name,
      type: file.type,
      size: file.size,
      _csrf: $('#__createPostToken').val() // this is not needed to make Dropzone work, it's express related
    },
    type: 'POST',
    success: function jQAjaxSuccess(response) {
      response = JSON.parse(response);
      file.custom_status = 'ready';
      file.postData = response;
      file.s3 = response.key;
      $(file.previewTemplate).addClass('uploading');
      done();
    },
    error: function(response) {
      file.custom_status = 'rejected';
      if (response.responseText) {
        response = JSON.parse(response.responseText);
      }
      if (response.message) {
        done(response.message);
        return;
      }
      done('error preparing the upload');
    }
  });
};

app._dropzoneSendingCallback = function(file, xhr, formData) {
  $.each(file.postData, function(k, v) {
    formData.append(k, v);
  });
  formData.append('Content-type', '');
  formData.append('Content-length', '');
  formData.append('acl', 'public-read');
};

app._dropzoneCompleteCallback = function(file) {
  var inputHidden = '<input type="hidden" name="attachments[]" value="';
  var json = {
    url: app.S3_BUCKET + file.postData.key,
    originalFilename: file.name
  };
  console.log(json, JSON.stringify(json), JSON.stringify(json).replace('"', '\"'));
  inputHidden += window.btoa(JSON.stringify(json)) + '" />';
  $('form#createPost').append(inputHidden);
}

app.setupDropzone = function setupDropzone() {

  if ($('div#dropzone').length === 0) {
    return;
  }
  Dropzone.autoDiscover = false;
  app.dropzone = new Dropzone(document.body, {
    url: app.S3_BUCKET,
    method: "post",
    autoProcessQueue: true,
    clickable: true,
    maxfiles: 5,
    parallelUploads: 3,
    maxFilesize: 10, // in mb
    maxThumbnailFilesize: 8, // 3MB
    thumbnailWidth: 150,
    thumbnailHeight: 150,
    acceptedMimeTypes: "image/bmp,image/gif,image/jpg,image/jpeg,image/png",
    accept: app._dropzoneAcceptCallback,
    sending: app._dropzoneSendingCallback,
    complete: app._dropzoneCompleteCallback
  });
};

app.startup = function startup() {
  app.setupDropzone();
}
$(document).ready(app.startup);
