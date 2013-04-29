 // ==UserScript==
// @name           quickProxyModokiMod.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    快速代理设置
// @include        main
// @compatibility  Firefox 3.0 3.5 3.6 3.7a1pre  WinXP
// @charset        UTF-8
// @author         Alice0775
// @note           fix compatibility for firefox23a1
// @version        2012/01/31 11:00 by Alice0775  12.0a1 about:newtab
// @version        2010/02/05 00:00 ウインドウが閉じてしまわないように
// @version        2009/09/02 13:00 quickproxy.typeをセットしないで使おうとする方のため直前のproxy.typeをquickproxy.typeにするようにした。
// @note           左クリック:オンオフ. 中クリック:起動時の設定 quickproxy.autooff, 右クリック:プロキシの設定
// @note           about:configのquickproxy.typeに値を予めセットしておく1(指定)または2(PAC)
// @note      一発プロキシcontextProxySwitch.uc.xulを使うとより便利かも
// ==/UserScript==

(function (css) {
if (window.quickProxy) {
window.quickProxy.destroy();
delete window.quickProxy;
}

var quickProxy = {
//-- config --
// 以下はFirefox3以上の場合に有効
// [true]:オプションをタブで開く, false:ダイアログで開く
optionInTab: true,
// falseの時ダイアログを開く遅延 巧く開かないときは遅延を大きくする
optionDelay: 800,
//-- config --
_init: function(){    
	   var overlay = '\
		<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
			xmlns:html="http://www.w3.org/1999/xhtml"> \
		 <toolbarpalette id="urlbar-icons">\
			<image id="quickproxy-status" label="quickproxySwitch" \
					onclick="quickProxy._click(event);" \
					tooltiptext="" >\
                 </image>\
            </toolbarpalette>\
        </overlay>';
  overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
  window.userChrome_js.loadOverlay(overlay, quickProxy);
  addStyle(css);

quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
window.addEventListener('unload',function(){
    quickProxy.removePrefListener(quickProxy.buttonPrefListener);
  }
,false);
},
	
observe: function (subject, topic, data) {
        if (topic == "xul-overlay-merged") {
    var icon = document.getElementById("quickproxy-status");
    var qp_autooff = quickProxy.getPref('quickproxy.autooff', 'bool', false);
    var Is_Proxy_On = quickProxy.getPref("network.proxy.type", 'int', 0);
    quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
         window.addEventListener('unload',function(){
    quickProxy.removePrefListener(quickProxy.buttonPrefListener);
     }
     ,false);
    if (qp_autooff == true && quickProxy.getNumberOfWindow() == 1){
      Is_Proxy_On = 0
    }
    quickProxy.setPref("network.proxy.type", 'int', Is_Proxy_On);

    quickProxy._updateUI();
                  //Application.console.log("quickProxy界面加载完毕！");
        }
},

getNumberOfWindow: function(){
  var mediator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                 .getService(Components.interfaces.nsIWindowMediator);
  var enumerator = mediator.getEnumerator("navigator:browser");
  var num = 0;
  while(enumerator.hasMoreElements()) {
    var win = enumerator.getNext();
    num++;
  }
  return num;
},

_switch: function() {
  var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
  var Proxy_Type = this.getPref("quickproxy.type", 'int', 1);
  if (Is_Proxy_On == 0){
    Is_Proxy_On = Proxy_Type;
  }else{
    Is_Proxy_On = 0;
  }
  this.setPref("network.proxy.type", 'int', Is_Proxy_On);
  this._updateUI();
},

_click: function(e){
  if (e.button == 0){
    this._switch();
  }
  if (e.button == 2) {
    var aURL = "chrome://browser/content/preferences/connection.xul";
    if (parseInt(Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULAppInfo)
        .version.substr(0,3) * 10,10) / 10 < 3) {
            //Fx2
            var aName ="";
            var aFeatures = 'modal,centerscreen,resizable=no';
            var aParams = null;
            openDialog(aURL, aName, aFeatures, aParams);
          } else {
            if (this.optionInTab) {
              //Fx3 タブバージョン (タブが一つの時, 閉じるとFxも閉じてしまう)
              if ("isBlankPageURL" in window ? isBlankPageURL(gBrowser.currentURI.spec) : gBrowser.currentURI.spec == "about:blank")
                 gBrowser.loadOneTab(aURL);
               else
                 gBrowser.selectedTab = gBrowser.addTab(aURL);
              var Proxy_Type = this.getPref("network.proxy.type", 'int', 0);
              if(Proxy_Type > 0) this.setPref("quickproxy.type", 'int', Proxy_Type);
              this._updateUI();
              e.preventDefault();

              setTimeout(function(self){
                if (gBrowser.mTabs.length == 1)
                  gBrowser.addTab();
              }, 200 , this);

              return;
            } else {
              //Fx3 ダイアログバージョン
              var prefBack = this.getPref("browser.preferences.instantApply", "bool", false);
              this.setPref("browser.preferences.instantApply", "bool", true);
              var w = openPreferences("paneAdvanced", {"advancedTab":"networkTab"});
              setTimeout(function(self, w, prefBack){
                self.optionOnload(w, prefBack);
              }, self.optionDelay, this, w, prefBack);

              var Proxy_Type = this.getPref("network.proxy.type", 'int', 0);
              if(Proxy_Type > 0) this.setPref("quickproxy.type", 'int', Proxy_Type);
              this._updateUI();
              e.preventDefault();
              return;
            }
          }
        }
        if (e.button == 1) {
          var qp_autooff = this.getPref('quickproxy.autooff', 'bool', true);
          var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                          .getService(Components.interfaces.nsIPromptService);
          var check = {value: qp_autooff};
          prompts.alertCheck(window, 'Window title', '',
                             "启动时设置为禁用代理", check);   //起動時は常にプロキシはオフ
          this.setPref('quickproxy.autooff', 'bool', check.value);
        }
        e.preventDefault();
      },

      optionOnload: function(w, prefBack){alert(2)
        this.setPref("browser.preferences.instantApply", "bool", prefBack);
        w.gAdvancedPane.showConnections();
},

_updateUI: function() {
  var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
  var icon = document.getElementById("quickproxy-status");
  var text1 = "";
  switch (Is_Proxy_On) {
    case 0:
    case 3:
            icon.setAttribute("state", "disable");
            icon.setAttribute("tooltiptext", "左键：开｜关代理； 中键：启动设置； 右键：代理设置");
            return;
  case 1:
    var ip = this.getPref("network.proxy.http", "str", "");
    var port = this.getPref("network.proxy.http_port", "int", 0);
    text1 = "\n当前代理：" + ip + ":" + port;
    break;
  case 2:
    text1 = "\n当前状态：自动代理配置(PAC)";
    break;
  case 4:
    text1 = "\n当前状态：自动检测此网络的代理设置";
    break;
  case 5:
    text1 = "\n当前状态：使用系统代理设置";
    break;
}
        icon.setAttribute("state", "enable");
        icon.setAttribute("tooltiptext", "左键：开｜关代理； 中键：启动设置； 右键：代理设置" + text1);
      },

  getPref: function(aPrefString, aPrefType, aDefault){
    var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
                 .getService(Components.interfaces.nsIPrefBranch);
    try{
      switch (aPrefType){
        case "str":
          return xpPref.getCharPref(aPrefString).toString(); break;
        case "int":
          return xpPref.getIntPref(aPrefString); break;
        case "bool":
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    }catch(e){
    }
    return aDefault;
  },

  setPref: function(aPrefString, aPrefType, aValue){
    var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
                 .getService(Components.interfaces.nsIPrefBranch);
    try{
      switch (aPrefType){
        case "str":
          return xpPref.setCharPref(aPrefString, aValue); break;
        case "int":
          aValue = parseInt(aValue);
          return xpPref.setIntPref(aPrefString, aValue);  break;
        case "bool":
        default:
          return xpPref.setBoolPref(aPrefString, aValue); break;
      }
    }catch(e){
    }
    return null;
  },
  // 監視を開始する
  addPrefListener: function(aObserver) {
    try {
      var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
      pbi.addObserver(aObserver.domain, aObserver, false);
    } catch(e) {}
  },

  // 監視を終了する
  removePrefListener: function(aObserver) {
    try {
      var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
      pbi.removeObserver(aObserver.domain, aObserver);
    } catch(e) {}
  },

  buttonPrefListener:{
    domain  : 'network.proxy.type',
      //"grabScroll.XXX"という名前の設定が変更された場合全てで処理を行う

    observe : function(aSubject, aTopic, aPrefstring) {
      if (aTopic == 'nsPref:changed') {
        // 設定が変更された時の処理
        var type = quickProxy.getPref(aPrefstring, 'int', 0);
        if (type != 0)
          quickProxy.setPref("quickproxy.type", 'int', type);
        quickProxy._updateUI();
      }
    }
  }
}
quickProxy._init();
window.quickProxy = quickProxy;

function addStyle(css) {
	var pi = document.createProcessingInstruction(
		'xml-stylesheet',
		'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
	);
	return document.insertBefore(pi, document.documentElement);
}

})('\
#quickproxy-status {\
	list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADsElEQVQ4jV1TW0yTBxj9siVzMWrUsWSGxZm4UZ26ueFG2MMw2R7GjOwWssBaUt0N5iWQyIAyhmw6cKLIHPeWwlpQfmxpuUhbob9jrLTcSikF7ZR0Qlv607UULKOu9OxBXRbPy0lOzjlP5xA9Ah6f4cWmdES9m6NI3Z+lfv7l9MboHWmNTz3qYxjmcaPRuOE/YWeq9AXhGZ2gocfuuzo6i+5RN1TGGfyiv40i+bArqaBTsld4+bWH/hrN8BYJo+cREVFMWlV0Xt3A9KhjAaZbfrC2eWjH5qAZ86BzxI2OYTfah5w4pxi/9042U/xB+vefZ1YbUqRt7EYiIvqoQF3FTnA4r7TgcGlvOO27jmCB1Bg5q7BArLODMcyg8boDP3ffwg8KG/LlZhRetoLRGF6nXckV60QSw+zRn/oQf7xtVfCt6s96pdEn1dkh7r6BSrUFxS1mnL5ixUnGBlGzFbnNE8iVmcNXtANxFPtFw/YPC7uCgpK+MeEZdvz60HQ4FI5g6OY8/gpGAABu3zLyavtR2GRG/iUrsqRjEMkfFLxySP7i29ntPWXtdmFhlX6kSTuOiWkv7J4V+P8Ggv8AhikOeWIDipVTyL80gRy5FSdbrFBoB9+kmJSaqITMtsQS+fCeE6WdAf6pLrQPezA1twIbtwqzM4SjF/twvOI35NQP4kSdCV9LBiGSmIJtWmMs8ZIk63Mr9cZWndmrYq3o7L+BbsNNfFNvgtYWgGKQw1vH5HhVWIuXBNXYnVaHnSkVyC5RphER0dbUyk2MzuJZWfLCy7mx4OPQ2jOOcrUNyhEv6noc+LioHW+kN2CvoBoJR2RI+LI28v4RsaCmmY2iramVm+Td5lmfdw4u5ywcMy6cbxlC+o9XkVHO4rRiEnkyM7Kq+8EvUiFf/Dtyyzsin4gYn6zLlELPJos3N2nGnAE/B87jBueZg9PlQZPGgmMXruHTMhbC0h4Ut4ygQGaGRPsHTjX0o7XXBvU10wGiDbs2K/Q21x23F2b7HBYXfHA5Z+D3crjj9EAzYMdFxRCyq/tRIB1ES+8k3N4FqH+dKmXZ+0uMlusmg8mZ5zKe3p2YL1YZAvP+RQSXArgb8CO0vIhwaBn3VoLAaggAYJhwTjEMu+7+K9ZE8fbxzxYS0Roi2kK09rP4977SXpDp/NbbHOYXglhaDiG4EobDcxdlcr0xZv/BqP8/cyMRPfmAtxPRc0S0jYhi1j6zJ5EXl8SPO5gu2HcgI2n9tvgdRPQEET32MPwveXRswBsq+TYAAAAASUVORK5CYII=");\
padding: 0 2px !important;\
}\
\
#quickproxy-status[state="disable"] {\
  filter: url("chrome://mozapps/skin/extensions/extensions.svg#greyscale");\
}\
');
