$(document).ready(function(){
	/*-------------------------------------------------*/
	/* =  owl-carousel (Categories Slider)
	/*-------------------------------------------------*/

	$(window).load(function(){

		var $owl = $('.owl-carousel');
		$owl.owlCarousel({
		    lazyLoad:true,
		    loop:true,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:2,
		            dots: false,
		            loop:true
		        },
		        768:{
		            items:3,
		            dots: false,
		            loop:true
		        },
		        1024:{
		            items:4,
		            dots: false,
		            loop:true
		        },
		        1200:{
		            items:6,
		            dots: false,
		            loop:true
		        }
		    }
		});
	});

	/*-------------------------------------------------*/
	/* =  categories ripple effect
	/*-------------------------------------------------*/
	var parent, ink, d, x, y;
	$(".main_category h3").click(function(e){
		parent = $(this).parent();
		//create .ink element if it doesn't exist
		if(parent.find(".ink").length == 0)
			parent.prepend("<span class='ink'></span>");

		ink = parent.find(".ink");
		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");

		//set size of .ink
		if(!ink.height() && !ink.width())
		{
			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}

		//get click coordinates
		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;

		//set the position and add class .animate
		ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});

	/*-------------------------------------------------*/
	/* =  browse-link
	/*-------------------------------------------------*/

	$(window).load(function(){

		var toggles = document.querySelectorAll(".browse-link");

		  for (var i = toggles.length - 1; i >= 0; i--) {
		    var toggle = toggles[i];
		    toggleHandler(toggle);
		  };

		  function toggleHandler(toggle) {
		    toggle.addEventListener( "click", function(e) {
		      e.preventDefault();
		      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
		    });
		}
	});

	/*-------------------------------------------------*/
	/* =  open-close browse categories
	/*-------------------------------------------------*/

	$(window).load(function(){
		var $openclose = $('#open-close');


			$openclose.click(function () {

			    $("#browse-categories").slideToggle('fast');

			});


	});

	/*-------------------------------------------------*/
	/* =  search
	/*-------------------------------------------------*/

    	$(".search-box").first().expandSearch();



    	/*-------------------------------------------------*/
	/* =  info modal popup
	/*-------------------------------------------------*/

	$(window).load(function(){

 	var triggerBttn = document.getElementById( 'trigger-info-modal' ),
		overlay = document.querySelector( 'section.info-modal' ),
		closeBttn = overlay.querySelector( 'a.info-modal-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );

	});

	/*-------------------------------------------------*/
	/* =  isotope - post items
	/*-------------------------------------------------*/

	$(window).load(function(){

		var $container = $('.post-container');

		// initialize isotope
		$container.isotope({

		  itemSelector : '.post-item',

		  masonry: {
		    columnWidth: '.grid-sizer'
		  }
		  // options...
		});

	});

	/*-------------------------------------------------*/
	/* =  article sticky
	/*-------------------------------------------------*/

	$('.post-content').theiaStickySidebar({
	      // Settings
	      additionalMarginTop: 0,

	});

	/*-------------------------------------------------*/
	/* =  back to top
	/*-------------------------------------------------*/

	$('.back-to-top').click(function(){
	    $('html, body').animate({scrollTop:0}, 'slow');
	});





});









