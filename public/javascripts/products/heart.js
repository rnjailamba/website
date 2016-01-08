$('.heart').click(function(){
  if(!$(this).hasClass('happy')){
    $(this).addClass('happy').removeClass('broken');
  }
  else {
    $(this).removeClass('happy').addClass('broken');
  }
});