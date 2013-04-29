// ==UserScript==
// @include        chrome://browser/content/browser.xul
// @name           qrReader.uc.js
// ==/UserScript==
 
userChrome.import("lib/jsqrcode.min.js", "UChrm");

var qrReaderUc={
  initialize:function(){
		var menu=document.getElementById("contentAreaContextMenu");
			menu.addEventListener("popupshowing", qrReaderUc.optionsShowHide, false);
		qrReaderUc.createMenu();
	},
	getClickHandler:function(){
		var url=qrReaderUc.imgURL;
		qrcode.decode(url);
		qrcode.callback=qrReaderUc.read;
	},

	read:function(d){
		//Services.console.logStringMessage('[ d  ]: ' + d );
		//var p=/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]$/;
		var p=/^(https?|ftp|file):\/\/[-_.~*'()|a-zA-Z0-9;:\/?,@&=+$%#]*[-_.~*)|a-zA-Z0-9;:\/?@&=+$%#]$/;
		if(p.test(d)){
			var f=confirm("QR\u7801\u4E3A\u7F51\u7EDC\u5730\u5740\uFF0C\u786E\u8BA4\u6253\u5F00?"+'\n\n'+d);
			if(f==true){
				gBrowser.loadOneTab(d, null, null, null, true, false);
	      	}
		}
		else if(d=="error decoding QR Code"){
			alert("\u8BE5\u56FE\u50CF\u4E0D\u5305\u542B\u6709\u6548\u7684QR\u7801\u6216\u65E0\u6CD5\u8BFB\u53D6\u5B83\u3002 :(" );
		}
		else{
				var r=confirm("QR\u4EE3\u7801\u503C\uFF08\u6309OK\u952E\u5C06\u5176\u590D\u5236\u5230\u526A\u8D34\u677F\uFF09\uFF1A"+'\n\n'+d);
				if(r==true){
					try{
						Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(d);
					}
					catch(e){
						alert(e);
					}
				}
		}
	},
	createMenu:function(){
		qrReaderUc.menuItems=0;

		var menu=document.getElementById("contentAreaContextMenu");
		var menuItem=document.createElement("menuitem");
			menuItem.setAttribute("id", "qrReaderUc.menu.0");
			menuItem.addEventListener("command", function(){qrReaderUc.getClickHandler();}, false);
			menuItem.setAttribute("label", "\u89E3\u6790\u56FE\u50CFQR\u7801");
			menuItem.setAttribute("class", "menuitem-iconic");
			menuItem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4jaWSzWnDQBBGH2kiLsAnIfXhQzoKGBZcgHpxBWpBPqoAGdSCrJfTbix5V4Zk4GNmvvlddvCfgiqQsOdnY5HMJaYpGfulQa74uXCbt2qQm1Sa+GLvrbj3tN8NHg8/ICH6JX7L4TTp/e4BdBx1HD1A0Y/6E3SaxK7zBHq9+pXRWy7iBNp1Ytvq5eIZNATPkBB9Q1jFDMFv0LYVm0arSuvaGyRY1wk5zqrSphH7XofBI3iEZDsMKzvGn2Hfi8vy9nSLN7Es4jwXk3N/vxo2z/un/HYDN6f8F/kB7L2cwHXEHwAAAAAASUVORK5CYII=");
		menu.insertBefore(menuItem, document.getElementById("context-openlinkintab"));qrReaderUc.menuItems++;

	},
	optionsShowHide:function(){		// show or hide the menuitem based on what the context menu is on
		if(gContextMenu){
			var isViewableImage=false;
			qrReaderUc.imgTarget=gContextMenu.target;
			if(gContextMenu.onImage){
				isViewableImage=true;
				qrReaderUc.imgURL=gContextMenu.imageURL;
				if(gContextMenu.onLink){qrReaderUc.linkURL=gContextMenu.linkURL;}
				else{qrReaderUc.linkURL='';}
			}
			for(var i=-1;i<(qrReaderUc.menuItems);i++){
				var currentEntry=document.getElementById("qrReaderUc.menu."+i);
				if(currentEntry){currentEntry.hidden=!isViewableImage;}
			}
		}
	},
	fun_OpenSite:function(url){
		gBrowser.loadOneTab(url, null, null, null, true, false);
	},
};
if (window.location == "chrome://browser/content/browser.xul") {
	window.addEventListener("load", qrReaderUc.initialize(), false);
}
