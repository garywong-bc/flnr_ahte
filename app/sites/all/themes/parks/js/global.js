var sRootPath = 'https://apps.nrs.gov.bc.ca/pub/pefp/';

var url = document.URL;
var vCtrl = '?v=' + new Date().getTime();
var s = 400; //standard fade/slide speed

//strip any default file names from the URL
var aDefault = new Array('index.','default.','welcome.');
for (i in aDefault) {
	if (url.indexOf(aDefault[i])>0)
		window.location.replace(url.substring(0,url.indexOf(aDefault[i])));
}


/* [(document).ready] */
jQuery(document).ready(function($) {
	var sCredit = loadBGImages(); //load background images
	jQuery('#footer').prepend('<div id="photoCredit"><div>' + sCredit + '<\/div><\/div>');
	setTitle(); //set the title tag based on the <h1> tag on the current page

	//prevent caching of all PDF files
	var anchors = jQuery('a[href$=".pdf"]');
	var v = '?v=' + new Date().getTime();
	for (var i = 0; i < anchors.length; i++) {
		if(anchors[i].getAttribute('href').match('\\.pdf$')) {
			anchors[i].setAttribute('target', '_blank');
			anchors[i].setAttribute('href', anchors[i].getAttribute('href') + v);
		}
	}
	
	
	/* [background view] */
	jQuery('body').click(function(e){
		console.log('body clicked');
		if (jQuery('#content').css('opacity')!='1') {
			jQuery('#content').fadeTo(s,1);
			jQuery('#viewMode').slideUp(100);
		} else {
			jQuery('<div id="viewMode"><div>[background view; click anywhere to exit]<\/div><\/div>').insertAfter('#topNavContainer');
			jQuery('#content').fadeTo(s,.2);
		}
	});
	jQuery('#content').click(function(e){
		console.log('content clicked');
		if (jQuery('#content').css('opacity')!='1') {
			jQuery('#content').fadeTo(s,1);
			jQuery('#viewMode').slideUp(100);
		}
		e.stopPropagation();
	});
	jQuery('#header').click(function(e){
		console.log('header clicked');
		if (jQuery('#content').css('opacity')!='1') {
			jQuery('#content').fadeTo(s,1);
			jQuery('#viewMode').slideUp(100);
		}
		e.stopPropagation();
	});
	jQuery('#topNavContainer').click(function(e){
		console.log('topNavContainer clicked');
		if (jQuery('#content').css('opacity')!='1') {
			jQuery('#content').fadeTo(s,1);
			jQuery('#viewMode').slideUp(100);
		}
		e.stopPropagation();
	});
	jQuery('#footer').click(function(e){
		console.log('footer clicked');
		if (jQuery('#content').css('opacity')!='1') {
			jQuery('#content').fadeTo(s,1);
			jQuery('#viewMode').slideUp(100);
		}
		e.stopPropagation();
	});
	/* [/background view] */
	
});
/* [/(document).ready] */







function loadBGImages() {
	//load background image
	var sPath = sRootPath + '_shared/images/backgrounds/'; //set image path
	var oImgTmp = new Image(); //image container for preloading
	var bgPhoto = document.body;
  var iSel = new Number();
	var aImg = [
		'bg_future-strategy.jpg',
		'bg_MacMillan_Iain-Robert-Reid-8.jpg',
		'bg_Tunkwa_Iain-Robert-Reid.jpg',
		'Bowron-Lakes_Iain-Robert-Reid-6.jpg',
		'Akamina-Kishinena_Iain-Robert-Reid-15.jpg',
		'Tunkwa_Iain-Robert-Reid-3.jpg'
	];
  var iImg = aImg.length;
  for (i=0; i<iImg; i++) {
		oImgTmp.src = sPath + aImg[i];
	}
	//check cookie for saved background image - use only one per session
	if (readCookie('bgImg') && 1==0) {
		//background image already set
		iSel = readCookie('bgImg');
		//alert('iSelCookie: ' + iSel);
	} else {
		//none found; randomly select a new background image
    do {
    	iSel = Math.floor(Math.random()*10);
    } while (iSel>iImg || iSel<=0);
		createCookie('bgImg',iSel);
	}
	//force a particular background image based on the current URL
	if (document.URL.indexOf('/explore/')>0) {
		document.body.style.backgroundImage = 'url(' + sPath + 'bg_MacMillan_Iain-Robert-Reid-8.jpg' + ')';
	} else if (document.URL.indexOf('get-involved')>0) {
		document.body.style.backgroundImage = 'url(' + sPath + 'bg_Tunkwa_Iain-Robert-Reid.jpg' + ')';
	} else if (document.URL.indexOf('learn-more')>0) {
		document.body.style.backgroundImage = 'url(' + sPath + 'Tunkwa_Iain-Robert-Reid-3.jpg' + ')';
	} else if (document.URL.indexOf('/future/')>0) {
		document.body.style.backgroundImage = 'url(' + sPath + 'bg_future-strategy.jpg' + ')';
	} else {
		document.body.style.backgroundImage = 'url(' + sPath + aImg[iSel-1] + ')';
	}
	var sCredit = new String();
		switch (iSel-1) {
			case 0:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/elk_lk/">Elk Lakes Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
			case 1:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/macmillan/">MacMillan Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
			case 2:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/tunkwa/">Tunkwa Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
			case 3:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/bowron_lk/">Bowron Lakes Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
			case 4:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/akamina/">Akamina-Kishinena Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
			case 5:
				sCredit = '<a href="http://www.env.gov.bc.ca/bcparks/explore/parkpgs/tunkwa/">Tunkwa Provincial Park<\/a><br>&copy; <a href="https://www.flickr.com/photos/iain-reid/">Iain Robert Reid Photography<\/a>';
			  break;
		}
	return sCredit;
}




//Generic Cookie Code
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	//alert(name+"="+value+expires+"; path=/");
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}



function setTitle() {
	//set the current page title - based on the content of the first h1 tag in mainCol
	var i = new Number();
	var sTitle = new String();
	var h1 = new String();
	var t = document.title;
	//var aMeta = document.getElementsByTagName('meta'); //searching for name='WT.ti'
	var ti = new Object();
	var mainCol = jQuery('#mainCol');
	if (jQuery('#mainCol > h1')) {
		h1 = jQuery('#mainCol > h1').html();
		if (h1==null)
			h1 = '';
//		alert('1:' + h1);
		h1 = unescapeHtml(h1);
		
	} else {
		h1 = '';
//		alert('2:' + h1);
	}
	/*
	for (i in aMeta) {
		if (aMeta[i].name=='WT.ti') {
			ti = aMeta[i];
			break;
		}
	}
	*/
	if (t.indexOf(h1)<0) {
		sTitle = h1 + ' - ' + t;
		//document.title = sTitle;
		document.title = h1;
		jQuery('meta[name="title"]').attr('content',h1);
	}
	//ti.content = sTitle; //set content of <meta name='WT.ti' content='' />
}
function unescapeHtml(unsafe) {
	return unsafe
		.replace(/<!--[\S\s]*?-->/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '\'')
		.replace(/&#039;/g, '"');
}


function setMeta(tagName,val) {
	jQuery('<meta name="' + tagName + '" content="' + val + '">').appendTo(jQuery('head'));
}

function showSocialBar() {
	jQuery('#social-media > div').slideToggle(100);
}
  

//--==Expand/Collapse Accordion==--
function collapse(el) {
	var s = 400;
	//jQuery('#' + el + ' > dd').slideUp(s);
	if (jQuery('#' + el + ' > dd'))
		jQuery('#' + el + ' > dd').slideUp(s);
	
	if (jQuery('#' + el + ' > li'))
		jQuery('#' + el + ' > li').slideUp(s);
	
	//	jQuery('#' + el + ' > li').slideUp(s);
}
function expand(el) {
	var s = 400;
	//jQuery('#' + el + ' > dd').slideDown(s);
	
	if (jQuery('#' + el + ' > dd'))
		jQuery('#' + el + ' > dd').slideDown(s);
	if (jQuery('#' + el + ' > li'))
		jQuery('#' + el + ' > li').slideDown(s);
	
	//jQuery('#' + el + ' > li').slideDown(s);
}
function expandItem(el) {
	var s = 400;
	if (jQuery('#' + el)) {
		jQuery('#' + el).siblings().slideUp(s);
		jQuery('#' + el).slideDown(s);
	}
}
function collapseItem(el) {
	var s = 400;
	if (jQuery('#' + el)) {
		jQuery('#' + el).slideUp(s);
	}
}