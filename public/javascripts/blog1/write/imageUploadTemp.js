// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    acceptedMimeTypes: "image/bmp,image/gif,image/jpg,image/jpeg,image/png",
    clickable: true,
    maxfiles: 1,
    parallelUploads: 3,
    maxFilesize: 1, // in mb
    maxThumbnailFilesize: 8, // 3MB
    clickable: ".fileinput-button", // Define the element that should be used as click trigger to select files.
    paramname: 'pic',
    parallelUploads: 2,
    url: "https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/", // Set the url

    addedfile: function(file) {
        console.log(file, "added file");

//        var tpl = twig({
//            href: '/bundles/acmecontent/js/template/image_upload.html.twig',
//            async: false
//        });
//        file.template = $(tpl.render());
//        $(this.previewsContainer).append(file.template);
//        file.template.find(".filename span").text(file.name);
//        file.template.find("#filename").html(file.name);
//        return file.template.find("#filesize").html(this.filesize(file.size));
    },
    sending: function(file, xhr, formData) {

        $.post('/prepare-upload', {
            filename: file.name
        }, function(response) {
            $.each(response, function(k, v) {
                formData.append(k, v);
            });
        }, 'json');
    },
    thumbnail: function(file, dataUrl) {
        file.template.removeClass("file-preview").addClass("image-preview");
        return file.template.find(".details img").attr('alt', file.name).attr('src', dataUrl);
    },
    processingfile: function(file) {
        return file.template.addClass("processing");
    },
    uploadprogress: function(file, progress) {
        return file.template.find(".progress .upload").css({
            width: "" + progress + "%"
        });
    },
    success: function(file, serverResponse, event) {
        var _this = this;
        file.template.find('.status_message .inputImage').val(serverResponse.file_name);

        file.template.find('.btn-delete').on('click', function() {
            _this.removeFile(file);
        });

        return file.template.addClass("done");
    },
    removedfile: function(file) {
        var _this = this;
        return file.template.fadeOut('fast', function() {
            this.remove();
        });
    },
    error: function(file, response) {
        response = $.parseJSON(response);
        file.template.addClass("error");
        return file.template.find(".error-message span").html(response.message);
    }

});

myDropzone.on("addedfile", function(file) {
    // Hookup the start button


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
    //   console.log(file.name,"sending");
    //   var url = $(".presignedurl").text();
    //    console.log(url);
    //    $.ajax({
    //        url: url,
    //        type: 'PUT',
    //        data: 'blah blah blah',
    //        headers: {'Content-Type': 'text/plain;charset=UTF-8'},
    //        dataType: "text",
    //        cache: false,
    //        processData: false,
    //        success: function(response) {
    //          console.log('S3 upload success!');
    //        },
    //        error: function(response) {
    //          console.log('Error with S3 upload: ' + response.statusText);
    //        }
    //    });


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