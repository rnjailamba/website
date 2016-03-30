jQuery(document).ready(function($){
	if( $('.floating-labels').length > 0 ) floatLabels();
	

	//FLOAT LABELS
	// ==============================================
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


	//CHECK VAL
	// ==============================================	
	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}


	//CHECK INPUT TEXT FIELD EMPTY
	// ==============================================
	function checkInputTextFieldEmpty(element,e){
		initializeTooltipster(element);
		var myfield = $(element).val();
		if(myfield.length == 0){
			$(element).tooltipster('show');
			return true;	

		}
		else{
			$(element).tooltipster('hide');	
			return false;	
		}

	}


	//INITIALIZE THE TOOLTIPSTER FOR ELEMENT
	// ==============================================
	function initializeTooltipster(element){
		$(element).tooltipster({
			autoClose:false,
			trigger:'custom',
			position: 'right',
		    functionInit: function(){
		        return $(element).siblings('#myfield_description').html();
		    }

		});
	}	


	//CHECK INPUT SELECT FIELD EMPTY
	// ==============================================
	function checkInputSelectFieldEmpty(element,e){
		initializeTooltipster(element);
		if (!$(element.concat(" option:selected")).val()) {
			$(element).tooltipster('show');		
			return true;	
		}
		else{
			$(element).tooltipster('hide');		
			return false;	
		}

	}	


    //AJAX CALL FOR SUBMITTING BLOG
    // ==============================================
    function ajaxCallForSubmitBlog(data){
        console.log("in submit up ",data);
        $.ajax({
            url:"/blog/writePost1",
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            contentType: 'application/json',
            context: this,
            cache: false,
            processData: false,
            success: function(response) {
                console.log('Blog submission succesfull',response);
                location.reload();
            },
            error: function(response) {
                console.log('Error with blog submission ' + response.statusText);
                console.log("error page");
            }
        });
    }	


    //ON SUBMIT
    // ==============================================
	$(document).ready(function(){
		$('.cd-form input[type="submit"]').click(function(e){
			e.preventDefault();
			var checkName = checkInputTextFieldEmpty('.myfield-name',e);
			var checkAbout = checkInputTextFieldEmpty('.myfield-about',e);
			// var checkPhone = checkInputTextFieldEmpty('.myfield-phone',e);
			var checkTitle = checkInputTextFieldEmpty('.myfield-title',e);
			var checkCategory = checkInputSelectFieldEmpty('.category',e);
			var checkSubcategory = checkInputSelectFieldEmpty('.subcategory',e);

		   	// as soon as a key is pressed on the keyboard, hide the tooltip.
			$(window).keypress(function() {
			  $('.myfield').tooltipster('hide');

			});

			var imageURLs = "";
			var i;
			for (i = 0; i < myDropzone.files.length; i++) {
			  imageURLs += myDropzone.files[i].xhr.responseURL;
			}
			if( !checkName && !checkPhone && !checkTitle && !checkCategory && !checkSubcategory ){
				var name = $('.myfield-name').val();
				var phone = $('.myfield-about').val();
				// var phone = $('.myfield-phone').val();
				var title = $('.myfield-title').val();
				var category = $('.category').val();
				var subcategory = $('.subcategory').val();			
				var tinymceText = tinyMCE.get('mytextarea').getContent();

				var data = {};
				data.name = name;
				data.about = about;
				// data.phone = phone;
				data.title = title;
				data.category = category;
				data.subcategory = subcategory;
				data.tinymceText = tinymceText;
				data.imageURLs = imageURLs;
				// console.log(name,phone,title,category,subcategory,tinymceText,imageURLs);
				ajaxCallForSubmitBlog(data);
	
			}

		});
	});		
});