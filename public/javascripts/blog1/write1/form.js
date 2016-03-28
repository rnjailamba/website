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

	function checkInputField(element,e){
		var myfield = $(element).val();
		alert($(element));

		if(myfield.length == 0){
			e.preventDefault();
			console.log($(element));
			$(element).tooltipster({
				autoClose:false,
				trigger:'custom',
				position: 'right',
			    functionInit: function(){
			        return $(element).siblings('#myfield_description').html();
			    }

			});
			$(element).tooltipster('show');
		}

	}


	$(document).ready(function(){
		$('.cd-form input[type="submit"]').click(function(e){
			checkInputField('.myfield-name',e);
			checkInputField('.myfield-phone',e);

		   	// as soon as a key is pressed on the keyboard, hide the tooltip.
			$(window).keypress(function() {
			  $('.myfield').tooltipster('hide');
			});						
		});
	});		
});