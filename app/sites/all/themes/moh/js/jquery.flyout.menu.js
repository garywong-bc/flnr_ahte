(function ($) {
	
	jQuery.fn.governmentMenu = function (options) {
				
		var settings = {
			activeClass		: 'current',
			menuWrapper		: null,
			clickTarget 	: null,
			menuSection		: null,
			bgColor			: '#000',
			opacity			: '0.3'
		};
		
		var flyoutClass;
		var menuVisible = false;

		// Override default settings with set options
		if (options) {
			jQuery.extend(settings, options);
		}	
				
		// Click on a menu link with drop down menu
		if(settings.clickTarget != null){				
			this.siblings(settings.clickTarget).click(function(){		
				
				hideOverlay();
				
				if ( jQuery(this).parent('li').hasClass(settings.activeClass) ){			
					hideMenu(this);
				} else {
					showMenu(this);
				}
				
				return false;
			});
		}
		
		// Hide Menu when overlay is clicked
		jQuery('#overlay').live('click', function(){
			hideMenu();
			hideOverlay();
		});
			
		
		// Add overlay to page
		function addOverlay(){
			jQuery('body').prepend('<div id="overlay"></div>');
			jQuery('#overlay')
				.hide()
				.css({
					'position' 	: 'absolute',
					'top'		: 0,
					'left'		: 0,
					'height'	: jQuery(document).height() + 'px',
					'width'		: '100%',
					'z-index'	: 100,
					'background': settings.bgColor,
					'opacity'	: settings.opacity,
					'cursor'	: 'pointer',
					'margin'	: 0
				})
				.fadeIn(100);
		}
		
		// Hide overlay
		function hideOverlay(){
			jQuery('#overlay').fadeOut(200);
		}
	
		// Show Flyout Menu for menu item
		function hideMenu(menuItem){
											
			// Remove active class	
			jQuery('#government-menu li').removeClass(settings.activeClass);
			
			// Remove menu
			jQuery('#flyout-menu').remove();
			
		};
		
		// Hide All Flyout Menus
		function showMenu(menuItem){
			
			// Add Overlay
			addOverlay();
			
			// Remove all menus that are visible
			jQuery(settings.menuWrapper).find('li.' + settings.activeClass)
				.removeClass(settings.activeClass)
				.find('#flyout-menu').remove();		
			
			// Add active class
			jQuery(menuItem).parent('li').addClass(settings.activeClass);
			
			// Get parent li position
			var position = jQuery(menuItem).parent('li').position();

			// Width of flyout is 736px
			// If the left position is >= 224
			// Set position.left - 224 = left
			var left = 0;
			if (position.left > 224){
				var left = 224 - position.left + 'px';
			}
			
			// Get Menu Item Attributes
			var menu 		= jQuery(menuItem).attr('menu');
			var block_id 	= jQuery(menuItem).attr('block-id');
			var td_block_id = jQuery(menuItem).attr('td-block-id');			
			
			// Get related menu content
			var related_menu = $('#' + block_id).html();
			var related_td_menu = $('#' + td_block_id).find('.content').html();
			var top_destinations = '';
			
			// Get flyout image		
			var image = '<img src="' + Drupal.settings.basePath + 'sites/all/themes/moh/images/menu/' + menu + '.png" />'
			
			// Get Top Destinations
			if (related_td_menu !== null){
				top_destinations  = '<div class="topDestinations">';
				top_destinations +='<h3>Top Destinations</h3>';
				top_destinations += related_td_menu;
				top_destinations += '</div>';
			}
			
			// Create new block for cloned menu
			var flyout_menu  = '<div id="flyout-menu" style="left:' + left + '" menu="' + menu + '">';
				flyout_menu += image;
				flyout_menu += related_menu;
				flyout_menu += top_destinations;
				flyout_menu += '</div>';
								
			// Add the new menu item to the parent li
			jQuery(menuItem).after(flyout_menu);
			jQuery('#flyout-menu').fadeIn(200);
			
		}

		// Hide menu and overlay on esc
		jQuery(document).keyup(function(e) {
			// Escape key
			if (e.keyCode == 27) { 
				hideMenu();
				hideOverlay();
			}
		});		
		
	};
})(jQuery);