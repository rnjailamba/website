$(document).ready(function(){
    $(document).ajaxStart(function(){
        $(".loaders").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $(".loaders").css("display", "none");
    });
});