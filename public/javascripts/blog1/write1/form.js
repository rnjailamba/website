jQuery(document).ready(function($){
	if( $('.floating-labels').length > 0 ) floatLabels();

	function floatLabels() {
		var inputFields = $('.floating-labels .cd-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}

	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}


	$(document).ready(function(){
		$('.cd-form input[type="submit"]').click(function(e){
			alert("helllo");
			var myfield = $('.myfield').val();
			if(myfield.length == 0){
				e.preventDefault();
				$('.myfield').tooltipster({
					autoClose:false,
					trigger:'custom',
				    functionInit: function(){
				        return $('#myfield_description').html();
				    }

				});
				$('.myfield').tooltipster('show');
			}

		   	// as soon as a key is pressed on the keyboard, hide the tooltip.
			$(window).keypress(function() {
			  $('.myfield').tooltipster('hide');
			});						
		});
	});		
});