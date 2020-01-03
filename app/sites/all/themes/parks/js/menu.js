/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FILE LOCATION: /_shared/scripts/menu.js
DESCRIPTION: This script controls the behaviour of the left-side expand-collapse menu (#primaryMenu)
DATE of LAST EDIT: January 25, 2010
CHANGE LOG: 
Dec. 1, 2009 (Rob Fiddler)
	-added support for default file names; current page/menu item comparison now disregards any default file names in the URL
Nov. 26, 2013 (Rob Fiddler)
  -added the ability to specify a parent page to expand the menu to
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//find the root folder of the current site and save it to the sSiteRoot variable

//--==configuration==--

var sSupportFolder = "parks"; //set the name of the template support folder
var iActiveMenu = 0; //set the child index number of the <ul> under #primaryMenu that contains the dynamic menu
var refCSSId = "globalCSS"; //set the id of the link tag for the global CSS file to use as a reference to find the site root
var sSiteRoot = new String();
//var sLinkHref = document.getElementById(refCSSId).getAttribute("href");
//var sPathToRoot = sLinkHref.substring(0,sLinkHref.indexOf(sSupportFolder));
//var sLocHref = location.href.substring(0,location.href.lastIndexOf("/")+1);
sSiteRoot = 'sites/all/themes/';

//list of default files to strip from the URLs for comparison
var aDefault = new Array("index.","default.","welcome."); 
	
// Preload menu bullet images
var oPreload = new Image();
var aImgSrc = new Array();
aImgSrc[0] = sSiteRoot + sSupportFolder + "/images/icons/blueBullet.gif";
aImgSrc[1] = sSiteRoot + sSupportFolder + "/images/backgrounds/leftCol/arrowExpanded.gif";
aImgSrc[2] = sSiteRoot + sSupportFolder + "/images/backgrounds/leftCol/arrowExpandedSubMenu.gif";
aImgSrc[3] = sSiteRoot + sSupportFolder + "/images/backgrounds/leftCol/arrowCollapsed.gif";
aImgSrc[4] = sSiteRoot + sSupportFolder + "/images/backgrounds/leftCol/arrowCollapsedSubMenu.gif";
for (i in aImgSrc) {
	oPreload.src = aImgSrc[i];
}


var sectionMenuItem = new String();
var parentMenuItem = new String(); //parent menu item to expand to; can be referenced on pages that shouldn't exist in the site navigation
/* to apply this, set this variable in the <head> of the desired page; must be a root-relative path
		parentMenuItem = '/bcparks/reserve/dc_refund_guidelines.html';
*/
var pageUrl = document.URL; //get the page URL
//remove any hash or querystring values from the current URL for comparison in the checkMenu function
if (pageUrl.indexOf("#")>0)
	pageUrl = pageUrl.substring(0,pageUrl.indexOf("#"));
if (pageUrl.indexOf("?")>0)
	pageUrl = pageUrl.substring(0,pageUrl.indexOf("?"));
for (i in aDefault) {//strip any default file names from pageUrl
	if (pageUrl.indexOf(aDefault[i])>0)
		pageUrl = pageUrl.substring(0,pageUrl.indexOf(aDefault[i]));
}
var sDomain = pageUrl.substring(0,pageUrl.indexOf('/',8)); //get the current domain from the URL


//functions to run after the window loads
jQuery(document).ready(function() {
	//call the menu checker function if a menu exists on the page
	if (document.getElementById("primaryMenu")) {
		if (parentMenuItem!='') {//if a parent menu item is specified on the page, expand to that location
			checkMenu(sDomain + parentMenuItem);
		} else {
			if (jQuery('#primaryMenu').find('a[href="' + pageUrl.replace(sDomain,'') + '"]').attr('href')) {//check existance of the current page in the menu
				checkMenu(pageUrl);
			} else {//expand to the section default, if specified
				if (sectionMenuItem!='')
					checkMenu(sDomain + sectionMenuItem);
			}
		}
	}
});



//Checks to see whether the page URL matches the URL for any of the #primaryMenu list items
var currentMenuItem;
var sMenuLinkTemp = new String();
function checkMenu(pageUrl) {
	// Get all link elements in #primaryMenu 
	var bMatch = new Boolean();
	var menulinks = document.getElementById("primaryMenu");
	menulinks = menulinks.getElementsByTagName("ul")[iActiveMenu];
	menulinks = menulinks.getElementsByTagName("a");
	
	showSubs(menulinks);
		
	//iterate through the menu links and check to see if they match the page URL
	for (var i=0; i<menulinks.length; i++) {
		sMenuLinkTemp = menulinks[i].href;
		//alert(pageUrl + "; " + sMenuLinkTemp);
		//strip default file references from menu link and page URLs
		for (var x=0; x<aDefault.length; x++) {
			if (sMenuLinkTemp.indexOf(aDefault[x])>0)
				sMenuLinkTemp = sMenuLinkTemp.substring(0,sMenuLinkTemp.indexOf(aDefault[x]));
			if (pageUrl.indexOf(aDefault[x])>0)
				pageUrl = pageUrl.substring(0,pageUrl.indexOf(aDefault[x]));			
		}

		if (sMenuLinkTemp == pageUrl) {//check the menu link for a match to the page URL
			var thismenu = menulinks[i].parentNode;
			setCurrentMenuItem(thismenu);
			bMatch = true;
		} else {
			bMatch = false;
		}
	}
	return bMatch;
}


function setCurrentMenuItem(thismenu) {
    // Call menu expansion function, pass this menu and submenu variables
    if(currentMenuItem) {
      expandOrCollapseMenu(currentMenuItem,false);
    }
    currentMenuItem = thismenu;
	highlightCurrent(thismenu);	
	expandOrCollapseMenu(thismenu,true);
	
}


function expandOrCollapseMenu(thismenu,isExpand) {
	if(thismenu.getElementsByTagName("A")){
		if(isExpand) {
			thismenu.getElementsByTagName("A")[0].className += " expanded";
		} else {
			thismenu.getElementsByTagName("A")[0].className = "";
		}
	}
	if(thismenu.getElementsByTagName("li")){
		if(isExpand) {
			thismenu.getElementsByTagName("li")[0].parentNode.className += " expanded";
		} else {
			thismenu.getElementsByTagName("li")[0].parentNode.className = "";
		}
	}
	var submenu = null;
	// Get submenu, if applicable
	if (thismenu.getElementsByTagName("ul")) {
		submenu = thismenu.getElementsByTagName("ul")[0];
	}

	// First, show the submenu (if there is any)
	if (submenu) {
		submenu.style.display = (isExpand?"block":"none");
	}
	
	// recursive calling expandMenu upwards
	if (thismenu.parentNode.parentNode.tagName == "LI") {
		expandOrCollapseMenu(thismenu.parentNode.parentNode,isExpand);
	}
}


// Adds a class to the menu items that have submenus associated with them
function showSubs(menu) {	
	for (var i = 0; i < menu.length; i++) {
		var inMenu = menu[i].parentNode.innerHTML.toLowerCase().indexOf("<ul>");
		if (inMenu != "-1") {
			menu[i].parentNode.className = "subMenu";
		}
	}
}


// Adds the class "current" to the currently selected page
function highlightCurrent(thismenu) {
	if(thismenu.getElementsByTagName("A")){
		thismenu.getElementsByTagName("A")[0].className += "current";
	}
}


// Handler when left menu clicked
function onMenuClick(e) {
	if (!e) {
		e = window.event;
	}
	var ele = e.srcElement;
	if (!ele) {
		ele = e.target;
	}
	if (!ele) return;
	if (ele.nodeName == "A" && (ele.href == window.location.href || ele.href == window.location.href + "#")) {
		e.cancelBubble = true;
		setCurrentMenuItem(ele.parentNode);
	}
}


// The following separates the default  #primaryMenu display value (none) from the main.css to enable
//	 full menu accesibility should JavaScript be disabled
document.write("<style type='text/css' media='screen'>");
document.write("  #primaryMenu ul ul, #primaryMenu ul ul ul, #primaryMenu ul ul ul ul { display: none; }");
document.write("</style>");
