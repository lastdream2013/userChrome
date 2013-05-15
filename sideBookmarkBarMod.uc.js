// ==UserScript==
// @name           sideBookmarkBarMod.uc.js
// @namespace      http://www.slimeden.com
// @author         Xiao Shan
// @note           test version 20130515: modify by lastdream2013
// @note           fix combility for firefox24a1 and windows xp system
// @description    Customize bookmarkbar to left side, arrange bookmarks vertically
// @version        0.4.1 - 20110218
// ==/UserScript==
(function () {
    var sideBookmarkBar = document.createElement("vbox");
    sideBookmarkBar.setAttribute("id", "sideBookmarkBar");
    sideBookmarkBar.setAttribute("minwidth", "20px");
    sideBookmarkBar.setAttribute("maxwidth", "20px");
    var bookmarks = document.getElementById("personal-bookmarks");
    
    // get personal-bookmarks from BrowserToolbarPalette
    if(!bookmarks) {
        var templateNode = gNavToolbox.palette.firstChild;
        while (templateNode) {
            if (templateNode.id == "personal-bookmarks") {
                break;
            } else {
                templateNode = templateNode.nextSibling;
            }
        }

        if (templateNode && templateNode.id == "personal-bookmarks") {
            bookmarks = templateNode;
        } else {
            return;
        }
    }
    bookmarks.setAttribute("orient", "vertical");
    sideBookmarkBar.appendChild(bookmarks);

    document.getElementById("browser").insertBefore(sideBookmarkBar, document.getElementById("appcontent"));

    // put the BMB in the bottom of the sidebar
     var BMB = document.getElementById("bookmarks-menu-button");
     
     if (BMB){
     bookmarks.insertBefore(BMB, bookmarks.childNodes[0]);

 	var BMBobserver = new MutationObserver(function(mutations) {
 	for (let m of mutations) {
 	// stop BMB button removed from bookmarks
	for (let e of m.removedNodes) {
		//	Application.console.log("E.id: " + 	e.id); 	
		if ( e.id != BMB.id ) continue;
	   	if(e.parentNode && e.parentNode != bookmarks) {
			bookmarks.insertBefore(e, bookmarks.childNodes[0]);
		}
	 }
	}
	});
	BMBobserver.observe(bookmarks, { childList: true } );  
	}
	
 	var menupopupobserver = new MutationObserver(function(mutations) {
		for (let m of mutations) {
	// open bookmark folder right sideby of sidebookmarkbar
			for (let a of m.addedNodes) {
				if("toolbarbutton" == a.localName && "bookmark-item" == a.className && "true" == a.getAttribute("container")) {
					if (a.firstChild && a.firstChild.localName == "menupopup") {
						a.firstChild.setAttribute("position", "end_before");
					}
				}
			}
		}
	});
	menupopupobserver.observe(bookmarks, { childList: true, subtree: true } ); 
	
    // make the bookmark items arranged vertically
    var bookmarkItems = document.getElementById("PlacesToolbarItems");
    bookmarkItems.setAttribute("orient", "vertical");
	bookmarkItems.parentNode.setAttribute("orient", "vertical");
    bookmarkItems.setAttribute("style", "padding: 0px 0px 0px 0px !important;"); 

   var placesToolbar = document.getElementById("PlacesToolbar");
   placesToolbar.setAttribute("orient", "vertical");

   bookmarks.appendChild(placesToolbar);
   PlacesToolbarHelper.init();
   if ( typeof(BookmarksMenuButton) != 'undefined' )  BookmarksMenuButton.customizeDone();
    
    // make the drop indicator horizontal
    try {
        eval("PlacesToolbar.prototype._onDragOver = " + PlacesToolbar.prototype._onDragOver.toString().replace(/ind\.clientWidth/g,'ind.clientHeight').replace(/left/g,'top').replace(/right/g,'bottom').replace(/translateX/g,'translateY').replace(/translate\(/,'matrix(0,1,-1,0, 40px,'));
    }catch(e) {}

    // enable bookmark folder tooltip
    try{
        eval("BookmarksEventHandler.fillInBHTooltip = " + BookmarksEventHandler.fillInBHTooltip.toString().replace(/(!cropped) (&& !url)/, '$1 && aDocument.tooltipNode.localName == "treechildren" $2'));
    }catch(e) {}

    //css
    document.insertBefore(document.createProcessingInstruction('xml-stylesheet','type="text/css" href="data:text/css;utf-8,'  + encodeURIComponent(
    '\
#bookmarks-menu-button .toolbarbutton-text { display:none !important; }\
#personal-bookmarks .toolbarbutton-text {display: none !important;}\
#personal-bookmarks .toolbarbutton-icon {display: -moz-box !important;    margin:0px 1px 0px 0px!important;}\
#PlacesToolbarItems toolbarseparator {\
    -moz-appearance:none !important;\
    min-height: 1px !important;\
    max-height: 1px !important;\
    background: gray !important;\
    margin:0px 1px 0px 0px!important;\
}\
#bookmarks-menu-button .toolbarbutton-menubutton-button {\
  -moz-box-orient: vertical !important;\
  margin:0px 1px 0px 0px!important;\
}\
#bookmarks-menu-button.toolbarbutton-1 {\
  -moz-box-orient: vertical !important;\
  margin:0px 1px 0px 0px!important;\
}\
')+ '"'), document.documentElement);
})();
