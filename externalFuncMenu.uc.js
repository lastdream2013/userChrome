// ==UserScript==
// @name           externalFuncMenu.uc.js
// @description    多功能左键菜单，可以把小书签，鼠标手势等都放进去
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// @version        20130601  0.12 autohide menu on image link and textinput area, minor fix
// @version        20130503  0.1 first release 
// ==/UserScript==


var gExternalSubMenu = {
	autohideEmptySubDirs : true, //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom : false, //把主菜单下的子目录移动到最下面
	insertafter : 'context-paste', //  context-paste   context-copylink context-openlinkintab
	toolbar :
	{
		//在这里定义好主菜单下子目录的名字,以及图标； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
		subdirs : [
			{
				name : '截图',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWklEQVQ4jZXRz0uaAQDG8fdP2WkldigoW0VIbQUzqCiQSnSL0n5ChzGC1FGxl4jVoETKMiorJfCgmETaiy4poZiyWFhmvVRbscYYa3/Ad4exINrBDp/Dw/f4CMoiMb+0bkquNrqpfe3LSrXRTWndlKwsEvOFJ7V22Rk8JJq85sOn71mJJq9xBg95UmuXhYqXi9h8aXqnknTZP2aldyqJzZfmmXEZoarbQ+fkHvqxOKtbZ6xundEgxrAF0rfbFkjTIMbu6Jzco6rbg1DZsYx+dAcpecW+/JOTq98AuCMyA/NJPBEZf/wCAH/8AndExhOR0Y/uUNmxjKBuX6RFjLEinaIxS4QTl7z3HqAxS2jMEuPeA04ub/BtnxNOXKIxS6xIp7SIMdTtiwjlrfNoh6K4whmq+0Nkvt5Q3R+6Qz+yxfbnb7fNFc6gHYpS3jqPUGJw0miVWNg4pultlGTmBxWv1u8Z8ezftoWNYxqtEiUGJ0KxbgatdZO59SPK+tZIf/lFWd/af/1rc+tHaK2bFOtmEAqbp2mybDIbPETV42ctfs7wUgJVj/+O4aUEa/FzVD1+ZoOHNFk2KWyeRijQ2tFZwkwHUjgCKdxSBgBHIIVxPIZxPIYjkPr7jJTBEUgxHUihs4Qp0NoR8hptGCwh8tq8d5jndrH7DrD7DjDP7d7rBkuIvEYbQm79BK2WEDkvVh+k1RIit34C4bFmjLaBICqTl0c6d1ZUJi9tA0Fynr9DUKhFuabLhckcpOtNOCsmc5CaLhcKtSgLyqLBfIValHOejvAQCrUoK4sG8/8Af9WgaNaSczsAAAAASUVORK5CYII="
			},
			{
				name : '搜索',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVQ4jZXRXUjTYRTH8Qd8KV3WNETTyQgNi0QWSai1nDKhzFxpYgYLFMpCROjG8FKwFwukUETShhWV5ktqXSQkiWKoqVE3RsF/WGyNtL/txS1Cv12Iy2WKHfjAc34PnItzRJtSqemPiZQm4tV8SIzbkIl4Nf0xkVKbUqkRfVERklxVibunHc+zzg1x97QjV1XSFxUhieGd0cxVlCMXnf4vcxXljMaqEOOxKuRzRpx36pl/2LKKXHaemewMZrIzALzvGUMm47EqxLvjehYdDlz3Tcx3PmHR4QDg16eP2G9e5dsRnRfg04+odyDenz2Fs+UuNr0Wm16LfKmM5ZotKcKm1/Kvsum1DKkiEG8LDHwvL+WrLtXLMzgAgNPU7JMDPv1AZDjizcks5MrLWA8lezmamwBwNDf55MCf/nAqL8O3I0aO6fk5OYkl+YCX8/GjpYVdvOCTr2RNT+NFWChiWJ8GgKu3F4tOh+1MIQt2O/bGRr4k7V+TNVPPc+U2RE9YKM6n3XjGxliw2wGQa27wWbNvXZajWXSHhCA6FAosOQamExLxjI4tDbhWw3RC4rosOQY6FApEa1Awltx8LCfycI+Mes80V1ePeffeNVly82kNCkZ0R0fjmprCPTSMfKsOR3uXd8gP0z2kuD2rTCelYM4rwLRpM6JLrZZep6VjLjRiNRZjNRYze+U6iy7X0t1LSr35MnOhkcGUg9wOCJREtRCaWr8AqcE/kJUehIbxalc8LVu28vdfg38gtX4BUrUQmt+jtZxHRtsXywAAAABJRU5ErkJggg=="
			},
			{
				name : '翻译',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jZXKvU8aYQDH8effaaJyISYGiFF7Ah4oInDAyfEOd71cyUVRe4jGMpAmQtLFoelgOujQdGmda2OHLtWlQ5NuNzRpjfaFGBCPF3+dSvKERYfP9P0Su5NnPLxkRLPryBR27iSaXYeHlwy7k2fIXCBv7B8c4fjkFB8+nt3J8ckp9g+OMBfIGyQQ11DfO0S5+uJe6nuHCKVWQfhUEepGDcraLuXNu2MAgLz6bKgpa7tQN2rgU0UQv6ghq1UpBb2Oi19/0e/fIqHuDPX//KIGMh9VkVArA9Xnr3B+8QfdXp8Se7RNfQm1gvmoCuIOyRCkrYHXb9/D7PaHBNMb1CdIW3CHZBDWn0M4oyOUeTLgE1dw0+nhptODVyjAJ65gKblGPeGMDtafA5laSCGc0eGLFylts4u22cVc5PFQ88WLCGd0TC2kQByciEhWBydolFa7g1a7AzYgDzVO0BDJ6nBwIsiES4CQK2GWVynNaxPNaxNprYJZXsWysk11IVfChEsAsbI8YtImppZkyo/LBq5aJn5eNvDp7CuuWiZs3vSgx6RNWFkexDIdQEIuw7aQpWzXXuL7+W80mm00mm18/vINVufyoCfkMizTAZCRyUXEpRLYoIJxLklhnDGMzEQwMhPB6MMorO44xrkk2KCCuFTC6OQiiMXhM1zBPNJKGfnC0ztJK2W4gnlYHD6DMHYPM2bzGg9sXtzHmM1rMHYP8w+pYGElCLDyYQAAAABJRU5ErkJggg=="
			},
		],

		//1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)；
		//2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
		//    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
		//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		configs : [
			{
				name : '谷歌站內搜索',
				subdir : '搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&amp;hl=zh-CN&amp;newwindow=1&amp;q='+q+'&amp;sitesearch='+location.host+'');window.open(qlocation);}%20void%200")
				},
			},
			{
				name : '百度站內搜索',
				subdir : '搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWklEQVQ4jZ2TzUuUURTGf2dmnFHLpCh1kSa0yV2k1iZokRURRNAiSrDAlZFhSUQgRBYGRX+BEFQEISJBENW2hRUlgaLpjBPqaI7mt+i877z3nhbjfKi7Dlw4zzn3Hp77nHOEh4MKgFVQCxYwJoWNBWtT2Ev7Odh4BAC0rYr/Man/iA+r2xLhEUc72md1oD+hAJGwo9GIu/2i8fBh7aaY6yrPO5fk1ctlnj6eJxpxaWyYprkpTjTibilgNzNYXDAEg4I1sLvIL/lBkfk5Q2LdijEq83NmcwHPEMCkGIyPJXnQNqv5BT7qzhTK4rzhcHWImmMFXGsszryZGE9SXpGXYQB3+1RVtev1oh4oGbHHa39bVdXRsKOJdatpGw07evliTC9dmLB/ppKqqsrZLs1oUHkwSHlFnpSUBuT9u1UAbt2Y5nbzNNGIS0/3CtFRlx/fEhIbT2603hLApv51pKaAljt7dCbucagqKC3X4/pryCGU75OZuNH2jn3ypXeNsrKA7i3x52jgpRj4/XDu/E6Zinm0NscZHnIwHrK2aun9vC73Wmf0ybNSiU0kqawMSrYLXlbZ0XCSm01xBgdcPA/JFXx4yJVH9/+yvyJPMhlj8KW7oAo9b5a1/6ejyeT2mVlYsPr9a4KJsZyktQQwWQZ5IcFxFL8f1KLWKj6/iN+HKrC2Zpma9HIGSbMaiMCVq8UyGfMYGXbZVeSTE3WFALztXpGlRUt1bYiTp3dILgOh4ZPqi1PpkAJ9wJaZzVgQqE4DOdqJUP9B8bzsmhq7saobvjXgaWqVM0cz6/8PC5Bp7zdzt94AAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){ p=prompt('%E5%9C%A8 '+document.location.href.split('/')[2]+' %E4%B8%AD%E6%90%9C%E7%B4%A2',''); if(p){ document.open('http://www.baidu.com/s?wd=site:'+document.location.href.split('/')[2]+' '+p,'','')} })();")
				},
			},
			{
				name : 'WIKI搜索',
				subdir : '搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5klEQVQ4ja2Tv2saYRjHP0lBSqCYhECzNNNZhCJ2CMVB9I6TRIKQk6RdbhMzpOAeOpz5E/w/inJTMvSOZnApoZhrKKTlhdMhNFSveg7SwWCHkLexdSnpA+/wPjzfz/PrfefG1+MJ97D5+4j/D8B1XUzTpLBVwHVdAOpv6xS2CliWhRACAMuyME0TIQRCCCqVCqZpMq/rOolnCdqdtqTuvNwBoFFvABB0AxYeLqCpGoqisBRdAkBTtZsWdl/tEg5CbNsm6AYAGEWDcBDitTx83+fy2yXlvfJU+eW98g1AURQyaga7YeP7PgCqppJMJqkeVnEcBzWjSuHZpzN5l0MslUoAOI7DLdQoGoivgvPP57KtoBtw+uGUxeXFaYCu6ySTSZrNphycqqmkUinCfiiz98M+o58jdF2fBgCk02mcdw5ey5vqtd1pyw2dvD9h7cna7zXeDTx4c4DyVKFhNwi6AV7LI/E8wcryCrZtA9Dr9igaRal5YFWtw7uQYTik9bHF1fcrVh+vsm1sMxgOOD46JhKJMBqN2MhvzK4AIBaL0fvRk29AURSy2SwAtVqNXC43LRhfjyd/nvxmfpLfzE8uvlxI3/7r/Uk8Hv8rdm7Wb3Rdl+ijKOsv1qVPCEGn05HTv7WZgH+xX3yx7irlByjQAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){q=document.getSelection();%20if(!q){void(q=prompt('Wikipedia%20keywords:',''))};%20if(q)location.href='http://en.wikipedia.org/w/wiki.phtml?search='+escape(q)})()")
				},
			},
			{
				name : 'google翻译当前网页',
				subdir : '翻译',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jX2Ty2sTYRTFf5NOazNiWkdiMVFpfFFiF0LJpmBxWxBFsDSgm0JpQDetgv9BoZsuXKmr0oXQuFAqFBeiQhMTXAgqWPARqyWPUnXiNI9pMknGxTCTjCSe1fc6595z7/0EgHLxp0ELNK1or2t6hQHfkEAHuP4lxxNxHj9dczzKZT463rRCBHgYjfJtcxOATDYHYO8Bbs5MdeKbAhYy2Rx+3xGHkLXvBMGy8H5jg3v3HzB3axavR2J+aY1943eaNvagVCmT1iW2CjoAymSPIFoFOxM4DsCjlSgnAgECF6fJ1v8bHDlaNVytB9fDE2SyOWKvE2TrsiP6jC/DXCDP0e5y+xqou3lerccdJAsj+xWGpSINo86Y7CahdAOgqTuINb1CVtkltCQTm7xE4Y+C1+dnQTE9A4z4NAC28yWu9v9ggWFb3AUQWjLTPR/1Exw6jdcj8akIaV0CIOhWiac1nldOAjAq62jqjingX3R0ksG7vXR1NQdvTN6jXjf4oMC60gvAVN9n+14AEG9/tSettnhKEMKrxsEr4wC8OPsOr0eiqldtkqrVuPb2MKlfqmmhoZpD01BzuKZjBkD+yTNGZZ0+t8ibbZ1IUiSSFFn+YmY3MZBvZmCRAIyi4rCUmj9GJCkSLzfb+vJcCoALsX5ss+1EekKD5t2BQza5UfjtCND2mwrhVcNYuSwEl78bparzIxq6Zq+3bgSFv7Bp4KZzDo3/AAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
				},
			}, 
			{
				name : '有道翻译当前网页',
				subdir : '翻译',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())")
				},
			},
			{
				name : '繁简转换',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADNUlEQVQ4jY3TX0xTZxgG8CMEZvkrBEQ2GyBUMylUN2J0hQCntZW2lhYowjm1lLQd0tFKsZRaKLSJk242tegWITGkyp+uRVTsMl1kihpEN6MzXnhB5EJNdrdl02SLMX7PLtYYWDTxTX6Xz5PvTd6PolaMrkeQeiSqtYfmXdfHb7rvH418Pmrsk5ZS7zNNzvLM0Tnr4sxDLzm12I7RBQOm7jkQvjPwot3LqB3HIlJX8GzDPtuR/LcWeMLqQOhOJ/FfUcE/p4Z/To2jV1QIXm1CaNHzOnzrKQkv/EbOzC39tb8/yKwKl5dTScM/6p54YlXwxKrh/b4a3lg1PLEqDF6sxIl5Fl/O/oSh2WUMXVhGYObXP2vkTRveFOyQZWf4Yg0v7NFS2KNl6JkWoGdaAHu0DAcjfAxdroUrcg59kSW4vlvC4fOPiZIxq1c+Yo3ztPhnW7gEnRPFsMR1ThTDMl4Mz0UZLKHbsIQeoXPsEXrPPHglUjZ8umqNFuc2tm+mgnSMFWKl7qkyYgn1E23gLtjAXeiP3yPN3cdjFEUlrCqQ6vJS249tvW8NfQzTCBemk1yYRrjomhAS1h8jMvc8ZO551B9eIHWOyWs04+S/Ce/tL6pqGy5cMo0UkLbhD6EP5kMfzEdrMB+Gbzei7Rs+5AMDqLD+AKHlEoSWS6g0T/9epTBtoRrs3O3ar/OeM74cML5csL5csF/9h/HlgvHloGUoB4wvD2K7A58YZ7HNcAFb285hh8Y9SmlcGy43DqyDZjALGk8WNN5sNMVpvNnQeLLQOLgO9f2ZULkKIGidRKk2ipLmKWzf45iklAczl+t606Fyxh3KgDpO5UxHXW86lI40KHvSILelQMAGsLk+BF6t72WFpFFO1Zqzf5Ed4EBuS4HClgJFd5wtBXIbB/IuDmRdHMisa7GrI5UU1NgJr9r6bKe4WUtRFEXt1hXpdu1Pei01J0P6xf+YkyExJ0PSkQSRKZFItJtufEarxXw+P23VEUnZIrfYmPySNiZCtAJtTARtSABtSCQSlntDKBSsf+dvrFSUlYtbCsZE+7Ke0a2cv2n92n9oXcYfIuajazUKgZ7H433wtty/EmGelA1I/y4AAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();")
				},
			},
			{
				name : '当前页面google快照',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADGElEQVQ4jW3RXUyTBxSA4e9yF4sXy+KycDMj1Bik/aDW2krcaMtm3ELmSBhbUMBlgBA0ss0IW1jXimJFGtTA1KJQftJ2OlosWlAqtcAaoP6w4NSFfQhhTiNshEyL6/LuglDTZCd5knNz3psjWM50iJ1en1Td3IPyoIf0w/0U1nkJT9wjPHYLu1pLd2ISfaoUBjM1jH6oJ6DX0q1Ikc4nJIhCu+eK9OfCIpcGZ/Dcnsdze562aw95Mv8cgKd3bzF99hBLQXfMs+sX+L3RjDt5vST0BkP8E42y336HvPb75LXfJ7flLqd9DwB4HB5jWKtm3lgc79Q39GtEhOGb4wAUnRlFc3yErdYwSkuI7PobADz6KYR/TRJ/5L8X53FRFv5NKQjXQncAcAQl3tjfw9pvB1hdeZW8huWAv6iEvrcSuZEoY2zDeibSkpnUyJl5O5WrchlCtsnNyuw5PcQrBR28WeJgfGqOr8+bMZRv4YOKdAqrtvCFWYvxqAZLqZLj+akc0soQUg92sb02gHd0mr/+XorFrJebWWfNZGe3gYo+HVV+Hd8FMqgZfCem0KZBECu72HriJq9/eYlV+W1xAdlRPbldhrijFUeGdBSc1SDI9jpQm4OsKrvIq7vsjE/NxSLN152sNWaww2nAFMiIUxvcxs7vNyMo9rTS6p+MO4zMTcf2H0KXEY/oKPfoqOrNiKnpzyK3YTNCt394+d8jTibqVDyol/PLsQ089NXFIpWOw+TYDVR4dDHm3mx2HFMjXBkYYmnhEb+ekLM08BHRkV28GMxhxqbiSdgFQGvAxfZGPaXOl0zeT3i/Ro3g9QeJRhb5rSmJFz45//oVRPsVLP6YzGzACsBJ3zm2ndKzu+0lk7uATOMmBJe3j2eRCE9/voDUrmW2JYHZlgSkix8TjSwAoK/N4d2Tej61LStuzaLasZv0AyoE67kO6d7kFM8jEf5vbD02ypqKMTpKMbmWVXeW8FlDNqq9Skn4ymIV6212qdnpZkVTp4sDjRbWFel4LU9kdWEaa4qVKMqVKPdtRLlvI2llaZL4uSj+B/6jwzxuLzMiAAAAAElFTkSuQmCC",
				command :
				function () {
		gBrowser.loadURI("javascript:(function(){%20document.location.href='http://webcache.googleusercontent.com/search?q=cache:'+escape(document.location.href)%20})();")
				},
			},
			
			{
				name : '清除隐藏文字',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jX2SzUuTARzHfzAsqD2F9Q8UjxV4CZZNVzbZTFh4muVBlA6VIHYps2KHhRYdjAgCOxREHVLKWgRFBR2ilUUhJWy1pvVszT209uzNt5yiz6dD7/byhc/t+/2cviJ/RtlltTYupkFRvH/p/pGVd2prgwuXLmFeu4YZCGAGAjAwgHn5Mn01NQP/Hd92OoMLZ87AhQvM9fVhPHhAIRxmrr8fLl7EPHuW/m3brv99XFkZXPD54ORJiqdPk02lGH3xgkQoxPTEBIVz56CnB9Pvp9/h+E2y7JbNFlzYtw8OHGDO76dw/jyZdJo3z56hDQ8zMzVF5tQp8Pvh8GHM9nauVFRcFRER65Il5YbHAy0t0NpKsqeH5Lt35AyDyNOnxL4Lurrg4EFob4c9e4h5PFMislKWl5Rs/FRbi7lzJzQ3k+juJhmNkjMMQoODaK9e8XlykszRo8y3tTHf2gpNTcTq6qZEZLUsLynZOOZ0Mltfj+n1Evf5SEUi5HSdYj7PbKHA/OQkiWPHmI7HGevtxWxoIOZ2/xRoW7Ywvn07Mzt28L6jg8+GQTGTYTabZTabpZjJkHj+nNTICDmvl2J9PaM1NT8F0cpK0k4nebebyP79FJJJxnWdiW+M6zqFZJLRQIBpj4eJujreVld/FSwV2RDctGlGdzhIVVcT2ruXtKZhaBpGLPYVTSOtaUSOHCHndpNxuQiUl38UkVUiItYyRekYtNmKY1VVvHa5eDs0hB6N/kb44UMSLhefnE4C69blV1gsTb9+oVRVlM7HNlsxbrcT3L2bJ3fv8uT+fR7fu0fw5k1eNjaib93KjbKyfKnF0iIi1sVvLFUVpfORzVbUNm9mtKKCmN1O3G7nQ1UVCYeD66r6z/EPyVpFOXRCVUPHVTV8XFXD3aoa7lLVsG/NmuFSi6X5f+PvWSEiqoisX8RaEVm2uPwFgl/ntiLCO0UAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:getobjstyle=function(node,prop){return node.ownerDocument.defaultView.getComputedStyle(node,'').getPropertyValue(prop);};RemoveHide=function(objname){var minValue=15;var objs=document.getElementsByTagName(objname);if(objs.length==0){}else{for(var i=objs.length-1;i>=0;i--){var node=objs.item(i);if(getobjstyle(node,'display')=='none' || getobjstyle(node,'visibility')=='hidden' || parseInt(getobjstyle(node,'font-size'))==0){node.parentNode.removeChild(node);}else{if(node.parentNode){var orgNode=node;var orgColor=getobjstyle(orgNode,'color');var orgRGB=CleanHidegetRGB(orgColor);var parentNode=node.parentNode;var parentBgColor=getobjstyle(parentNode,'background-color');var isLast=false;while(parentBgColor=='transparent'){if(parentNode.parentNode==null){isLast=true;break;}parentNode=parentNode.parentNode;parentBgColor=getobjstyle(parentNode,'background-color');if(parentBgColor != 'transparent'){break;}}if(isLast){if((Math.abs(orgRGB[0]-255)<=minValue)&&(Math.abs(orgRGB[1]-255)<=minValue)&&(Math.abs(orgRGB[2]-255)<=minValue)){orgNode.parentNode.removeChild(orgNode);}}else{parentBgRGB=CleanHidegetRGB(parentBgColor);if((Math.abs(orgRGB[0]-parentBgRGB[0])<=minValue)&&(Math.abs(orgRGB[1]-parentBgRGB[1])<=minValue)&&(Math.abs(orgRGB[2]-parentBgRGB[2])<=minValue)){orgNode.parentNode.removeChild(orgNode);}}}}}}var itemFrames=document.getElementsByTagName('frame');var itemiFrames=document.getElementsByTagName('iframe');var frame,iframe;if (itemFrames.length>0){for (var i=0;i<itemFrames.length;i++){frame=itemFrames[i].contentDocument;this.RemoveHide(frame,objname);}}if(itemiFrames.length>0){for(var i=0;i<itemiFrames.length;i++){iframe=itemiFrames[i].contentDocument;this.RemoveHide(iframe,objname);}}};function CleanHidegetRGB(colorString){var RGB=new Array;var tempSting=colorString.substring(4,colorString.length-1);var tempArray=tempSting.split(",");RGB[0]=parseInt(tempArray[0]);RGB[1]=parseInt(tempArray[1]);RGB[2]=parseInt(tempArray[2]);return RGB;};RemoveHide('span');RemoveHide('font');RemoveHide('div');RemoveHide('p');")
				},
			},
			{
				name : 'Mouseover DOM Inspector',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3ElEQVQ4jaWSvQuDMBDF+0e7ujs6O3YWFycXXQSpQyCgg1LIoAQqSigEER1eJ8X4XTy4IXD53bt399CcGHfyoTkxlpFwASvMpiLDowhyvqrbBNCy2e1mE3YOMP10F2B4FG0/HAPmH0bZQc6huwSFkOcKDI9OgOfrjVp2AKB0/tsDm7DrAACIWLWCXB5hjFp2sAlbQU5NXEb++UJ3yQSJWHUMKISEFWaK3Plq5we1ArT9oGzB9FPlrTkxaNnsAwohFbnLNP303MRxhCurPDSx7QckXCDhYvMGFMCd/AHHS24Twewa9gAAAABJRU5ErkJggg==",
				command :
				function () {
gBrowser.loadURI("javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');")
				},
			},
			{
				name : '短网址',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jcWSTUiUURSGn3O++WmMtMKSKEGoRX+QLdqEOUiOkBsjml0Q0SqCCFooBC0SXQZtgqByFZQQuHNjIJkhVARBREQWBBUi5Yw62nzfd06LYcTR3NaBC/fe977P5b73wP8uWb1429Y6DpoFcHe+fPha33PjmGzetr2ACiKCmz1bPPcwW/VodTLU0rIpCBLZIFBUFdB3PbOz81wZLUYWv3dz3Aycdm7lM+sAB5obF1Qr5iBQjky+PlzVfp9/dBAzLDbcjPTWYKEG0NH/7cznuuagaE4QJBD1q2vfGppddnfMHVE0de9sfgWQ1PSTBx1DiAplgf1PX95eB7jw+A6AC+COiAwDaOfNn+OIogIjR/v4UYgaN0p8OVFocBEcx81J3D09oaLeBIKI8mZPjuHWi8WNAK8WZ5aOp0LMHMyQiJ0C0DVYdBREldg9HOvdkvobYH6yq1wqWXLXdD2BGeGlEdFKQFxzUywWME229y92rzVHU7nuTEqSscXcb5gjjKJeWNVInQMld6lsiTtj1+tqmiycOumV487MrzK7T03Iyi8AROHcDkERBETpHCiNV7WlF9lR85jKMAKNm6pazS0dg8sfBd0nDiLG9/KndJ5D1pc7EVaCBjObzrQ937tR0P++/gAfa8dxFS7RuQAAAABJRU5ErkJggg==",
				command :
				function () {				gBrowser.loadURI("javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);if%20(!l)%20{alert('%E8%AF%B7%E8%BE%93%E5%85%A5%E7%BD%91%E5%9D%80%EF%BC%81');return;}d.title='(Shortening...)%20'+d.title;z.setAttribute('src','http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl='+encodeURIComponent(l));b.appendChild(z);}catch(e){alert('%E8%AF%B7%E7%AD%89%E5%BE%85%E7%BD%91%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%AF%95%EF%BC%81');}}iprl5();void(0)")
				},
			},
			{
				name : '图片适应窗口',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABz0lEQVQ4jb2RzWsTURTFf+/NTMfGNDVGsVAQ8YPsghVcCS4EXQmC6F/QTXDXf0Aoxf4XLrtIFy6LBEI/CBjEVfGji9ZWA0K0rakjmXlvOnNdmIZI0iIIHji8x73nHe55F/4RamntrUTG0okMYWQJI4sxMcZajD0EBb7nMOJ6+L7H6cwpHEfhOA6FfBbXT/aZODeO1lm0Viile+ej5h38jSyL95bQWv/R01qxvdPEBZi6Xho63v31x+hLI1y9cnlo/+NOE31Svtg1uNdO/gN3WHH59Qf2vgcUDx/COixuN5icyHNrqjgori2viYjI3Is5+VscaVfrDdEoRa7sYUsBlYMF5uuzx447X5+lcrCALQXkyh5aKajWVmSrtSkz8bSY2EqappIkSY/9SNNUbGxlJp6WrdamrNYbQrW2IkmSyLf2194jY22PaSpdpj2j3R+73QivRAOICPnsWUQEEcHRGkdrau+rPHv3FKVAKdWLUhgrdG/q9xZSkaGZgzDgRvHmQL1f7gJIOmhgYkNl8jljGwU+BZ8p333SZ3CkF1Tzy77stdsEHcPPTkQntHRCS2gsHRPxpvWS2xcf4HseZ3I+rlZkRjNkR30unM8fu7H/h1+ePDbJO/G73gAAAABJRU5ErkJggg==",
				command :
				function () {
gBrowser.loadURI("javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();")
				},
			},
			{
				name : '明文显示密码',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRElEQVQ4jW3Tf0zUdRzH8Y9QkUHLOW9KYEmtGkziPMexDicMuB/Q0TFg2MQK2gkRP+JEQjhyJr8Kji/I7zhghLBkghvS6cFUfhxwcXLFFvpPK4iTWLM/+0NW7dkftwJX7+315+vxx2t7C3X9ZEy8ZWYxt64PveUWGsnxv1E3TJF8yUFK2wKJzXPEW2YW1fWTMSLBMr3Z3VTN2vkIhk1xaKXZf0sZHfPIM84gC1PxbGAI+4JfQhb4ArFqLeUDtzk77N4UGsnBNXMKK4VBTBSEo5EcaCUHxYMuDsmjEUI8lmOh+8mtbya5ppuMum6ERnJgaLCTYniLTGmcU1YXlpvLpGVloZUJSo4KqmOexvKmjK7UA/S2f8JHc79gmlzhw+t3vYBGchD5fhX5fQ4sN5dI77FT+2Uf9p6PGb3aSf9wHy2D/Vzs7KLA0kG+ZKWwyUpRc+828LZkI+ezTnJGnZTZlzFarOiyC4nUGHg5XIHsQBDyqGiSUtKRyWQE+D3JHv/d20DxoIuTHSMUX53myBvH0CTq0adlIHb5IITgOdl+XMvf8+iPP+m/MoKv327vLv8A58fuYbK5OXQkisOvy/n90RYAn7d2Inx8USXo2HkZWUYvoG6cJb5hhrKBWd7ttSF8nyI7J4/fHj5kdXWVv4CjquOEK1UsLC6SlpoKwNDomBeIqryB0mzjvdoh0lqG2RvyGrFqLaXnKjiVmQnA6fwi/J4JwDowRE11NQA9l7/yAkqzDaXZhrZmkqrriyR92o4QgtN5BWx41tna2iI6Ng4hBK+EHmbi1h1u35kiLELBnsCD24DSbMN0+S5VC6skVDQSoT9BZYuV7DPl7A15lefD5BxUqIgwZBKbV05yVQe5Y0uPA0qzjbNDS7S5PFTM/4xxzE32iJOiiXuUzPxE6fw6JY41yhY8SN/9SvP0j/8FlGYbxy/Yye9zUnfjPm1ODy0uD63frNPuXOPS1A9UXnGS1ziCIceMUFaMP9hZTmya4YP+OYq7xiltGsBYWEbSCSP6k7no0rOJM7zDi6EKdvk8gRDigVCUXtNFnvt6M/qCnSLbfWrdHmq/3eCie4PKqRVMrV8QH7qPAH9/goKDdz7Wpr8Qur8B/c1d/jmhRwsAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()")
				},
			},
			{
				name : '页面可见区域截图',
				subdir : '截图',
				command : 
					function() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.innerWidth;
						canvas.height = content.innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
					},
			},
			{
				name : '页面所有区域截图',
				subdir : '截图',
				command : 
					function() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.document.documentElement.scrollWidth;
						canvas.height = content.document.documentElement.scrollHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
					},
			},
			{
				name : '浏览器界面截图',
				subdir : '截图',
				command : 
					function() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = innerWidth;
						canvas.height = innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
					},
			},
			{
				name : 'A,B,N,P站视频',
				subdir : '',
				command : 
				function () {
gBrowser.loadURI("javascript:q=''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);q=q.replace(/\s/g,'');if(!q)%20q=prompt('Please%20input%20the%20keyword:','');if(q!=null){p=encodeURI(q);if(p.match(/^ac\d+$/)){window.open('%20http://www.acfun.tv/v/'+p);}%20else%20if(p.match(/^av\d+$/)){window.open('%20http://www.bilibili.tv/video/'+p);}%20else%20if(p.match(/^sm\d+$/)){window.open('http://nicosound.anyap.info/sound/'+p);}%20else%20if(p.match(/^\d+$/)){window.open('%20http://www.pixiv.net/member_illust.php?mode=medium&illust_id=%20'+p);}%20else{alert('Invalid%20keywords!')}}void%200")
				},
			},
			
		],

	},
	subdirPopupHash : [],
	subdirMenuHash : [],
	_ExternalSubMenuPopup : null,
	_isready : false,
	unescapeHTML : function(input) {
			return input.replace(/&amp;/g, '&')
		  .replace(/&quot;/g, '\"')
		  .replace(/&lt;/g, '<')
		  .replace(/&gt;/g, '>')
		  .replace(/&apos;/g, '\'')
		  .replace(/\\/g, '\\\\');
	},
	init : function () {
		var insertPos = document.getElementById(this.insertafter);
		if (!insertPos)
			return;

		extSubMenu = document.createElement("menu");
		extSubMenu.setAttribute("id", "ExternalSubMenuID");
		extSubMenu.setAttribute("label", "多功能菜单");
		extSubMenu.setAttribute("class", "menu-iconic");
		extSubMenu.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYUlEQVQ4jWNgYPj/n5GRPMzA8P8/AyPjfyj4hx3/w4H/Qw2BGPDv/7SzRVjxU1FVrPj/v3//GRj+UWYAxS4YTgb8+///f8ruD1jx369pWPH//6MGUNcAPFkJrwwkR1KYnQHdFt9E917n4QAAAABJRU5ErkJggg==");
		var contextMenu = document.getElementById("contentAreaContextMenu");
		//contextMenu.appendChild(extSubMenu);
		contextMenu.insertBefore(extSubMenu, insertPos);
		contextMenu.addEventListener("popupshowing", gExternalSubMenu.optionsShowHide, false);

		var ExternalSubMenuPopup = document.createElement('menupopup');
		ExternalSubMenuPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalSubMenu.onpopupshowing();');
		this._ExternalSubMenuPopup = ExternalSubMenuPopup;
		extSubMenu.appendChild(ExternalSubMenuPopup);
		setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
			window.gExternalSubMenu.loadSubMenu();
		}, 2000);
	},
	loadSubMenu : function () {
		if (this._isready)
			return;
		if (this._ExternalSubMenuPopup == null)
			return;

		var ExternalSubMenuPopup = this._ExternalSubMenuPopup;
		for (var i = 0; i < this.toolbar.subdirs.length; i++) {
			if (this.toolbar.subdirs[i].name == 'separator') {
				ExternalSubMenuPopup.appendChild(document.createElement('menuseparator'));
			} else {
				var subDirItem = ExternalSubMenuPopup.appendChild(document.createElement('menu'));
				var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
				subDirItem.setAttribute('class', 'menu-iconic');
				subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
				subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
				gExternalSubMenu.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
				gExternalSubMenu.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
			}
		}

		for (var i = 0; i < this.toolbar.configs.length; i++) {
			var configItems;
			if (this.toolbar.configs[i].name == 'separator') {
				configItems = document.createElement('menuseparator');
			} else {
				configItems = ExternalSubMenuPopup.appendChild(document.createElement('menuitem'));
				configItems.setAttribute('class', 'menuitem-iconic');
				configItems.setAttribute('label', this.toolbar.configs[i].name);
				configItems.setAttribute('image', this.toolbar.configs[i].image);
				if (typeof this.toolbar.configs[i].command == 'function') {
					Services.console.logStringMessage(this.unescapeHTML(this.toolbar.configs[i].command.toSource()));
					configItems.setAttribute('oncommand', this.unescapeHTML(this.toolbar.configs[i].command.toSource()) + '.call(this, event);');
				} else {
					configItems.setAttribute('oncommand', this.toolbar.configs[i].command);
				}
				configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
			}
			if (this.toolbar.configs[i].subdir && gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir])
				gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
			else
				ExternalSubMenuPopup.appendChild(configItems);
		}

		if (this.autohideEmptySubDirs) {
			for (let[name, popup]in Iterator(gExternalSubMenu.subdirPopupHash)) {
				if (popup.hasChildNodes()) {
					continue;
				} else {
					gExternalSubMenu.subdirMenuHash[name].setAttribute("hidden", "true");
				}
			}
		}

		if (this.moveSubDirstoBottom) {
			let i = ExternalSubMenuPopup.childNodes.length;
			while (ExternalSubMenuPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0) {
				ExternalSubMenuPopup.appendChild(ExternalSubMenuPopup.firstChild);
			}
		}
		this._isready = true;
	},
	onpopupshowing : function () {
		if (!this._isready)
			this.loadSubMenu();
	},
	optionsShowHide : function () {
		if (gContextMenu) {
			var isViewable = true;
			var SubMenu = document.getElementById("ExternalSubMenuID");
			if (gContextMenu.onLink || gContextMenu.onImage || gContextMenu.onTextInput || gContextMenu.onMailtoLink) {
				isViewable = false;
			}
			if (gContextMenu.isContentSelected) {
				isViewable = true;
			}
			if (SubMenu)
				SubMenu.hidden = !isViewable;
		}
	},
}
	gExternalSubMenu.init();
