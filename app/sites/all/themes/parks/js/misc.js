/********************************
* Collapse Menu 
********************************/


jQuery(document).ready(function(e) {
	jQuery(".back-to-top").on("focus mousedown", function(e) {
		e.preventDefault();
		/*
		jQuery('html,body').animate({ scrollTop: 0 }, 'slow', function(){
			//"#shareContainer").css("bottom","10px");
		});
		*/
	});
	
	//var touchenabled = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
	var touchenabled = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
	
    
	jQuery('#header-main-row2').on("shown.bs.collapse", function() {
		if(jQuery("#header").hasClass("collapsed-header")) {
			addScrollableBurgerMenu();
		}	
	});
    
});


jQuery(document).mouseup(function(e) {
	var touchenabled = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
	var target = jQuery(e.target);

	// Close the navigation menu when there is a click on the page somewhere other than the menu button or within the menu
	if(!target.hasClass("menu-button") && !target.parent().hasClass("menu-button") && target.closest("#govNavMenu").length == 0) {
		jQuery("#govNavMenu").removeClass("expanded").addClass("hidden");			
		jQuery("#header-main-row2").removeClass("in");
	}
	// Close the search box when there is a click on the page somewhere other than the search box or within the search box
	if(!target.hasClass("search-button") && !target.parent().hasClass("search-button") && target.closest(".header-search").length == 0) {
		jQuery(".header-search").removeClass("in");
	}		
	
	// Close any navigation tile menus
    jQuery(".explore ul").not(target.closest(".explore").find("ul")).slideUp(200, 'linear', function () { });

    
});

var scrollTimer;
jQuery(window).on("scroll", function() {
	
	// Clear timeout if one is pending
	if(scrollTimer) {
		clearTimeout(scrollTimer);
	}
	// Set timeout
	scrollTimer = setTimeout(function() { 			
		/* 
		 * Re-position the "Back to top" button if it is touching the footer
		*/				

//		console.log("jQuery('#footer').offset().top: " + jQuery("#footer").offset().top);
//		console.log("jQuery('#footer').height(): " + jQuery("#footer").height());
//		console.log("jQuery(window).scrollTop(): " + jQuery(window).scrollTop());
//		console.log("jQuery(window).height(): " + jQuery(window).height());
//		console.log("jQuery(window).scrollTop() + jQuery(window).height(): " + (jQuery(window).scrollTop() + jQuery(window).height()));
		
		if(jQuery(window).scrollTop() > 0) {
			jQuery(".back-to-top").show();
			//jQuery("#shareContainer").css("bottom","70px");
		} else {
			jQuery(".back-to-top").hide();
			//jQuery("#shareContainer").css("bottom","10px");
		}
		
		// Check if the footer is within the viewport and switch the position of the button accordingly
		var windowBottomCoordinate = jQuery(window).scrollTop() + jQuery(window).height() -280;
		if(windowBottomCoordinate > jQuery("#footer").offset().top) {
			jQuery(".back-to-top").addClass("footer-overlap");
			//jQuery("#shareContainer").addClass("footer-overlap");
		} else {
			jQuery(".back-to-top").removeClass("footer-overlap");
			//jQuery("#shareContainer").removeClass("footer-overlap");
		}
		
		/* 
		 * When the page is scrolled in desktop mode, collapse the header
		*/				
		var scrollPosition = jQuery(window).scrollTop();
		if(scrollPosition > 50 && jQuery(window).width() >= 768) {
			if(!jQuery("#header").hasClass("collapsed-header")) {
				jQuery("#header-main > .container").hide();
				jQuery("#header").addClass("collapsed-header");
				jQuery("#header-main > .container").fadeIn("300");
			}	
		} else {
			if(jQuery("#header").hasClass("collapsed-header")) {
				jQuery("#header-main > .container").hide();
				jQuery("#header").removeClass("collapsed-header");
				jQuery("#header-main > .container").fadeIn("300", function() {
					// After the full header is fully loaded, readjust the top padding on content
					adjustContentPadding();	
				})
			}		
		}
		addScrollableBurgerMenu();

	}, 100); // Timeout in msec
});

// When page is resized
jQuery(window).on("resize", function() {
	adjustContentPadding();
	addScrollableBurgerMenu();
});

// When page is loaded or window is resized 
$(window).on("load resize", function() {
		
	// workaround for left nav collapsing on page load
	// Bootstrap known issue - https://github.com/twbs/bootstrap/issues/14282
	$('#leftNav').collapse({'toggle': false})
	
	//hide mobile topic menu
	 if ($(this).width() < 767) {
			$("#leftNav").removeClass('in')
	 }else{
			$("#leftNav").addClass('in').attr('style','')
	 }

	$('#leftNav').collapse({'toggle': true})
  
	// When our page loads, check to see if it contains and anchor
	scroll_if_anchor(window.location.hash);

	// Intercept all anchor clicks in the accessibility section and page content
	//jQuery("#access").on("click", "a", scroll_if_anchor);		
	//jQuery("#main-content").on("click", "a", scroll_if_anchor);	
	
});


function toggleHeaderElements(event) {

	// Mobile only?
	if(event.type=="focus"&&jQuery(event.currentTarget).hasClass("navbar-toggle")){		
		if(  jQuery("#header-main-row2.collapse").hasClass('in')){	
			  jQuery("#header-main-row2.collapse").removeClass('in');
		}else{
			  jQuery("#header-main-row2.collapse").addClass('in').attr('style','')	
		}
	}
	
	// Non-mobile?
	else {	
		// Toggle the main menu
		jQuery("#govNavMenu").each(function(){
			if(jQuery(this).is(":visible")){	
				jQuery(this).addClass("hidden").removeAttr("style");
				jQuery(this).removeClass("expanded");
	
			}else{					
				jQuery(this).addClass("expanded");
				jQuery(this).removeClass("hidden");
	
			};
		});		
		
		// Collapsed header-specific behaviours
		if(jQuery("#header").hasClass("collapsed-header")) {
			if(jQuery(event.currentTarget).hasClass("search-button")) {
				// Close header-links section if it's open
				if(jQuery("#header-main-row2").hasClass("in")){	
					jQuery("#header-main-row2").removeClass("in");
				}
			}
			else if(jQuery(event.currentTarget).hasClass("menu-button")) {
				// Close search if it's open
				if(jQuery(".header-search").hasClass("in")) {
					jQuery(".header-search").removeClass("in");
				}
			}
		}		
	}
}


function ieVersion() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf("Trident/7.0") > 0)
        return 11;
    else if (ua.indexOf("Trident/6.0") > 0)
        return 10;
    else if (ua.indexOf("Trident/5.0") > 0)
        return 9;
    else
        return 0;  // not IE9, 10 or 11
}

var animate = 1;

function toggleFooter(event) {

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if(msie < 0){
    	//check for IE 11
    	msie = ieVersion();
    }
	
	jQuery("#footerCollapsible").css("height", jQuery("#footerCollapsible").height());

	if (msie > 0) {
		jQuery("#footerCollapsible").slideToggle(0, function() {			
			// expand
			if(jQuery(this).is(":visible")) {
				jQuery("#footer").addClass("expanded");
				jQuery("#footerToggle a.footerExpand").hide();
				jQuery("#footerToggle a.footerCollapse").show();
			} 
			// collapse
			else {
				jQuery("#footer").removeClass("expanded");				
				jQuery("#footerToggle a.footerExpand").show();
				jQuery("#footerToggle a.footerCollapse").hide();
			}
			
			jQuery('html, body').animate({
				scrollTop: jQuery(document).height()
			}, 'slow');
		});
	}
	else{
		jQuery("#footerCollapsible").slideToggle('slow', function() {			
			// expand
			if(jQuery(this).is(":visible")) {
				jQuery("#footer").addClass("expanded");								
				jQuery("#footerToggle a.footerExpand").hide();
				jQuery("#footerToggle a.footerCollapse").show();
				animate = 0;								
			} 
			// collapse
			else {
				jQuery("#footer").removeClass("expanded");				
				jQuery("#footerToggle a.footerExpand").show();
				jQuery("#footerToggle a.footerCollapse").hide();
				animate = 1;				
			}
		});
		
		if (animate == 1){
			jQuery('html, body').animate({
				scrollTop: jQuery(document).height()
			}, 'slow');		
			var temp = animate;		//get animate var
		}
	}
}

function sortTiles(selector, sortType) {
    jQuery(selector).children("div.homepage-tile").sort(function(a, b) {
        // Sort based on the Tile title
    	if(sortType == "alphabetical") {    	
        	var stringA = jQuery(a).find(".tile-text > .title > a").text().toUpperCase();
            var stringB = jQuery(b).find(".tile-text > .title > a").text().toUpperCase();
            return (stringA < stringB) ? -1 : (stringA > stringB) ? 1 : 0;
        }
    	// Sort based on the Tile order weight
        else if(sortType == "orderWeight") {
        	var intA = parseInt(jQuery(a).attr("data-order"));
            var intB = parseInt(jQuery(b).attr("data-order"));
            return (intA < intB) ? -1 : (intA > intB) ? 1 : 0;
        }
    }).appendTo(selector);
}

/**
 * Check an href for an anchor. If exists, and in document, scroll to it.
 * If href argument omitted, assumes context (this) is HTML Element,
 * which will be the case when invoked by jQuery after an event
 */
function scroll_if_anchor(href) {
   href = typeof(href) == "string" ? href : jQuery(this).attr("href");

   // If href missing, ignore
   if(!href) return;
  
   // Do not trigger on mobile view
   if(jQuery(window).width() < 768) {
	   return;
   } else {
	   var fromTop = jQuery("#header-main").height() + 20;	   
	   
	   // Case #1 - href points to a valid anchor on the same page in the format "#foo"
	   if(href.charAt(0) == "#") {
		   
		   var jQuerytarget = jQuery(href);

		   // If no element with the specified id is found, check for name instead (some of the GOV2 content is like this)
		   if(!jQuerytarget.length)  {
			   jQuerytarget = jQuery("a[name='" + href.substring(1) + "']");
		   }
	      
		   // Older browsers without pushState might flicker here, as they momentarily jump to the wrong position (IE < 10)
	       if(jQuerytarget.length) {
	           jQuery('html, body').animate({ scrollTop: jQuerytarget.offset().top - fromTop });
	       }
	   } 
	   // Case #2 - href points to a valid anchor on the same page in the format "/gov/current/page#foo"
	   else if(href.indexOf("#") > -1) {

		   var targetHrefPath = href.split("#")[0];
		   var targetHrefHash = href.split("#")[1];
		   		   
		   if(href.indexOf(location.pathname) > -1) {
			   var jQuerytarget = jQuery("#" + targetHrefHash);

			   if(!jQuerytarget.length)  {
				   jQuerytarget = jQuery("a[name='" + targetHrefHash + "']");
			   }

		       if(jQuerytarget.length) {
		           jQuery('html, body').animate({ scrollTop: jQuerytarget.offset().top - fromTop });
		       }			   
		   }
	   }
   }
}  
