
jQuery.fn.font_sizer = function(o) {

	// Cookie functions
	function setCookie(c_name, value, expiredays){
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
	}
		
	function getCookie(c_name){
	if (document.cookie.length>0){
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1){
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	    }
	  }
	return "";
	}

    
	// Defaults
	var o = jQuery.extend( {
		applyTo: 'body',
		changesmall: 0.2,
		changelarge: 0.2,
		expire: 30
	}, o);
	
	var s = '';
	var m = '';
	var l = '';
	
	// Current
	var c = 'normal';
	
	// Check cookie  
	if (getCookie('font-size') != "") {
		var c = getCookie('font-size');
		switch (c) {
			case 'smaller':
				jQuery('#sizer a.smaller').addClass('current');
				jQuery(o.applyTo).css('font-size', '0.8462em');
				break;
			case 'normal':
				jQuery('#sizer a.normal').addClass('current');
				jQuery(o.applyTo).css('font-size', '1.0em');
				break;
			case 'bigger':
				jQuery('#sizer a.bigger').addClass('current');
				jQuery(o.applyTo).css('font-size', '1.2307em');
				break;
		}
	}
	else {
		jQuery('#sizer a#normal').addClass(c);
	}
	
	
	jQuery('#sizer a').click(function(){
	
		var t = jQuery(this).attr('id');
		
		setCookie('font-size', t, o.expire);
		
		jQuery('#sizer a').removeClass('current');

		jQuery(this).addClass('current');
		
		var f = jQuery(o.applyTo).css('font-size');	
		
		switch(t){
			case 'smaller':
				jQuery(o.applyTo).css('font-size', '0.8462em');
				break;
			case 'normal':
			    jQuery(o.applyTo).css('font-size', '1.0em');
				break;
			case 'bigger':
				jQuery(o.applyTo).css('font-size', '1.2307em');
				break;
		}	
	});
};