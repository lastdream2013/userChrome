// ==UserScript==
// @name           sendToGmail.uc.js
// @namespace      ithinc#mozine.cn
// @description    Send the selection to Gmail
// @include        main
// @compatibility  Firefox 3.x
// @author         ithinc
// @version        LastMod 2009/3/15 20:30 Improvment on sending images
// @version        LastMod 2009/3/14 20:30 Add support for all Gmail display languages
// @version        LastMod 2009/3/13 21:30 Initial release
// @Note           null
// ==/UserScript==

/* :::: Send the selection to Gmail :::: */

function SendToGmail(from, to, cc, bcc, subject, body) {
  var gmailComposeURL = 'https://mail.google.com/mail/?ui=html&v=b&pv=tl&cs=b';

  var req = new XMLHttpRequest();
  req.open('GET', gmailComposeURL, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200 && req.responseText.match(/<form[\s]+action="[^>"]+"[\s]+name=(f|"f")[^>]*>/i)) {
        if (!to && /([\w.]+)@gmail.com/.test(req.responseText)) to = RegExp.$1 + "+note@gmail.com";

        var gmailSendURL = req.responseText.match(/<base[^>]*>/i).toString().split(/"/)[1] + req.responseText.match(/<form[\s]+action="[^>"]+"[\s]+name=(f|"f")[^>]*>/i).toString().split(/"/)[1];
        var gmailSendParams = 'redir=?&nvp_bu_send=Send';
        //gmailSendParams += '&from=' + encodeURIComponent(from);
        gmailSendParams += '&to=' + encodeURIComponent(to);
        gmailSendParams += '&cc=' + encodeURIComponent(cc);
        gmailSendParams += '&bcc=' + encodeURIComponent(bcc);
        gmailSendParams += '&subject=' + encodeURIComponent(subject);
        gmailSendParams += '&body=' + encodeURIComponent(body);

        var req2 = new XMLHttpRequest();
        req2.open('POST', gmailSendURL, true);
        req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req2.onreadystatechange = function() {
          if (req2.readyState == 4) {
            if (req2.status == 200) {
//              document.getElementById("statusbar-display").label = //req2.responseText.match(/<td[\s]+bgcolor="?#(f|F)(a|A)(d|D)163"?>[^<>]*<b>[^<>]*<\/b>/i).toString().split(/<|>/i)[4];
                var alertsService=Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
		      alertsService.showAlertNotification("chrome://global/skin/icons/information-32.png","SentToGmail",req2.responseText.match(/<td[\s]+bgcolor="?#(f|F)(a|A)(d|D)163"?>[^<>]*<b>[^<>]*<\/b>/i).toString().split(/<|>/i)[4],false,"",null,"");
            }
            else {
              alert("\u6D88\u606F\u53D1\u9001\u4E0D\u6210\u529F!");
            }
          }
        }
        req2.send(gmailSendParams);
      }
      else {
        alert("\u60A8\u6CA1\u6709\u767B\u9646\u4F60\u7684Gmail!");
      }
    }
  }
  req.send(null);
}

(function() {
  var mainContextMenu = document.getElementById("contentAreaContextMenu");

  var menuitem = mainContextMenu.insertBefore(document.createElement("menuitem"), document.getElementById("context-sendpage"));
  menuitem.setAttribute("id", "context-sendpagetogmail");
  menuitem.setAttribute("label", "\u53D1\u9001\u5F53\u524D\u7F51\u5740\u5230Gmail");
  menuitem.setAttribute("accesskey", "G");
  menuitem.setAttribute("oncommand", "SendToGmail('', '', '', '', gBrowser.selectedTab.label, gBrowser.currentURI.spec);");

  var menuitem = mainContextMenu.insertBefore(document.createElement("menuitem"), document.getElementById("context-sendlink"));
  menuitem.setAttribute("id", "context-sendlinktogmail");
  menuitem.setAttribute("label", "\u53D1\u9001\u94FE\u63A5\u5730\u5740\u5230Gmail");
  menuitem.setAttribute("accesskey", "G");
  menuitem.setAttribute("oncommand", "SendToGmail('', '', '', '', gContextMenu.linkText(), gContextMenu.linkURL);");

  var menuitem = mainContextMenu.insertBefore(document.createElement("menuitem"), document.getElementById("context-sendimage"));
  menuitem.setAttribute("id", "context-sendimagetogmail");
  menuitem.setAttribute("label", "\u53D1\u9001\u56FE\u8C61\u5730\u5740\u5230Gmail");
  menuitem.setAttribute("accesskey", "G");
  menuitem.setAttribute("oncommand", "SendToGmail('', '', '', '', gContextMenu.target.getAttribute('title') || gContextMenu.target.getAttribute('alt') || gContextMenu.target.currentURI.spec, gBrowser.currentURI.spec + '\\n\\n' + gContextMenu.target.currentURI.spec);");

  var menuitem = mainContextMenu.insertBefore(document.createElement("menuitem"), document.getElementById("frame-sep"));
  menuitem.setAttribute("id", "context-sendselecttogmail");
  menuitem.setAttribute("label", "\u53D1\u9001 ... \u5230Gmail");
  menuitem.setAttribute("accesskey", "G");
  menuitem.setAttribute("oncommand", "SendToGmail('', '', '', '', gBrowser.selectedTab.label, gBrowser.currentURI.spec + '\\n\\n' + document.commandDispatcher.focusedWindow.getSelection());");

  mainContextMenu.addEventListener("popupshowing", function(e) {
    document.getElementById("context-sendpagetogmail").setAttribute("hidden", "true");
    document.getElementById("context-sendlinktogmail").setAttribute("hidden", "true");
    document.getElementById("context-sendimagetogmail").setAttribute("hidden", "true");
    document.getElementById("context-sendselecttogmail").setAttribute("hidden", "true");

    if (gContextMenu.onLink) {
      document.getElementById("context-sendlinktogmail").removeAttribute("hidden");
    }

    if (gContextMenu.onImage) {
      document.getElementById("context-sendimagetogmail").removeAttribute("hidden");
    }

    if (gContextMenu.isTextSelected) {
      var selection = getBrowserSelection(16);
      if (selection && selection.length > 15)
        selection = selection.substr(0,15) + "...";

      document.getElementById("context-sendselecttogmail").setAttribute("label", '\u53D1\u9001 "' + selection + '" \u5230Gmail');
      document.getElementById("context-sendselecttogmail").removeAttribute("hidden");
    }

    if (!gContextMenu.onLink && !gContextMenu.onImage && !gContextMenu.isContentSelected && !gContextMenu.onTextInput) {
      document.getElementById("context-sendpagetogmail").removeAttribute("hidden");
    }
  }, false);
})();
