// ==UserScript==
// @name        url bar blur to revert mod 
// @namespace   blur2revert@zbinlin.gmail.com
// @filename    blur2revert.uc.js
// @description url bar blur to revert mod ( Ctrl + 鼠标点击页面后，恢复原来的地址，规避原脚本和Noscript冲突 )
// @author      zbinlin
// @version     0.1.20110602.1
// @updateURL     https://j.mozest.com/ucscript/script/39.meta.js
// ==/UserScript==

if (location == "chrome://browser/content/browser.xul") {
	gBrowser.addEventListener("DOMWindowCreated", function () {
		window.content.document.addEventListener("click", function (e) {
			if (e.ctrlKey) {
				document.getElementById("urlbar").handleRevert();
			}
		}, false);
	}, false);
}
