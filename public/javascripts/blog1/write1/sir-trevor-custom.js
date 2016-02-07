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
            "Columns"
          ],
        required: [
            "Heading",
            "Text"
          ],
        onEditorRender: function() {
            <!--alert('Do something');-->
        }
    });
    <!--SirTrevor.setDefaults({-->
      <!--uploadUrl: "/images"-->
    <!--});-->

    SirTrevor.fileUploader = function(block, file, success, error) {
      var callbackError, callbackSuccess, uid;
      SirTrevor.EventBus.trigger("onUploadStart");
      uid = [block.blockID, (new Date()).getTime(), "raw"].join("-");
      block.resetMessages();
      callbackSuccess = function(data, textStatus, jqXHR) {
        SirTrevor.log("Upload callback called");
        SirTrevor.EventBus.trigger("onUploadStop");
        if (!_.isUndefined(success) && _.isFunction(success)) {
          return _.bind(success, block)({
            file: this.url
          });
        }
      };
      callbackError = function(jqXHR, status, errorThrown) {
        SirTrevor.log("Upload callback error called");
        SirTrevor.EventBus.trigger("onUploadStop");
        if (!_.isUndefined(error) && _.isFunction(error)) {
          return _.bind(error, block)(status);
        }
      };
      return $.ajax({
        url: '',
        data: {
          file_name: file.name,
          file_type: file.type
        },
        type: 'GET',
        error: callbackError,
        success: function(data, textStatus, jqXHR) {
          var xhr;
          xhr = $.ajax({
            url: data.url,
            contentType: file.type,
            crossDomain: true,
            data: file,
            processData: false,
            headers: {
              'Content-MD5': file.md5,
              'Authorization': data.signature,
              'x-amz-date': data.date,
              'x-amz-acl': 'public-read'
            },
            type: "PUT",
            success: callbackSuccess
          });
          block.addQueuedItem(uid, xhr);
          xhr.done(callbackSuccess).fail(callbackError).always(_.bind(block.removeQueuedItem, block, uid));
          return xhr;
        }
      });
    };


});