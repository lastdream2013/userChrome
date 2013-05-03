// uAutoPagerize 的配置文件。Ver 0.2.2 以上专用。
// 本体更新時に設定を書き換える手間を省くためのもので、無くても問題ない。

// 排除列表
var EXCLUDE = [
	'https://mail.google.com/*'
	,'http://www.google.co.jp/reader/*'
	,'http://b.hatena.ne.jp/*'
	,'http://www.livedoor.com/*'
	,'http://reader.livedoor.com/*'
	,'http://fastladder.com/*'
	,'http://**mail.yahoo.co.jp/*'
	,'http://maps.google.co.jp/*'
	,'*/archives/*'
];

// 自定义站点，优先级最高
var MY_SITEINFO = [
	{
		url : '^https://mobile\\.twitter\\.com/[^/]+/status(?:es)?/\\d',
		nextLink : 'id("tweets-list")/div[@class="list-tweet"][1]/div[@class="list-tweet-status permalink"]/a[@class="status_link"][2]',
		pageElement : 'id("tweets-list")',
	},
	{
		url : '^http://www\\.dm5\\.com/m\\d+/',
		nextLink : 'id("s_next")/a',
		pageElement : 'id("showimage")',
	},
	{
		siteName : '顶点小说',
		url : '^http://www\\.23us\\.com/html/.+\\.html',
		siteExample : 'http://www.23us.com/html/26/26627/16952316.html',
		nextLink : ' //dd[@id="footlink"]/descendant::a[text()="下一页"]',
		pageElement : 'id("amain")/dl/dd/h1 | id("contents")'
	},
	{
		url : '^http://bbs\\.iiikl\\.net/forum\\.php\\?forum_id=.*',
		nextLink : '//a[@class="next"]',
		pageElement : '//tr[@class="topic_list_row"]',
		exampleUrl : 'http://bbs.iiikl.net/forum.php?forum_id=82&class_id=0&page=2'
	},
	{
		"url" : "^http://[^.]+\\.getuploader\\.com/",
		"nextLink" : "//li[contains(concat(\" \", @class, \" \"), \" current \")]/following-sibling::li[contains(concat(\" \", @class, \" \"), \" page \")]/a",
		"pageElement" : "id(\"primary\")/table/tbody/tr|id(\"thumbnail\")"
	},
	{
		url : '^http://list\\.tmall\\.com/search_product\\.htm',
		nextLink : '//a[@class="ui-page-next"]',
		pageElement : 'id("J_ItemList")',
		insertBefore : '',
		exampleUrl : 'http://list.tmall.com/search_product.htm?spm=3.1000473.332931.1.IYk3dO&q=&area_code=310000&sort=s&style=g&vmarket=0&from=sn_1_cat-qp&active=1&cat=50024400'
	},
	{
		url : '^http://f\\.ppxclub\\.com/.*',
		nextLink : '//a[@class="nxt"]',
		pageElement : '//div[@class="pl bm"] | id("threadlist")/div',
		exampleUrl : 'http://f.ppxclub.com/147006-1-2'
	},
	{
		siteName : '百度贴吧',
		url : '^http://tieba\\.baidu\\.(cn|com)/f',
		nextLink : '//div[@class="pager clearfix"]/descendant::a[@class="next"]',
		pageElement : '//ul[@id="thread_list"]',
	},
	{
		siteName : '百度空间',
		url : '^http://hi\\.baidu\\.com',
		nextLink :
		{
			startAfter : '?page=',
			mFails : [/^http:\/\/hi\.baidu\.com\/.+/i, '?page=1'],
			inc : 1,
			isLast : function (doc, win, lhref)
			{
				var script = doc.querySelector("#pagerBar > script");
				var m = script && script.textContent.match(/pageSize.*'(\d+)'[\s\S]*curPage.*'(\d+)'/);
				if (m && (m.length == 3))
				{
					if (parseInt(m[2]) >= parseInt(m[1]))
						return true;
				}
			}
		},
		pageElement : '//div[@class="mod-realcontent mod-cs-contentblock"]',
		exampleUrl : 'http://hi.baidu.com/gelida',
	},
	{
		name : '水木社区',
		url : '^http://www\\.newsmth\\.net/nForum.*',
		nextLink : '//a[@title="下一页"]',
		pageElement : '//div[@class="b-content"] | //div[@class="b-content corner"]',
		exampleUrl : 'http://www.newsmth.net/nForum/#!board/TouHou'
	},
	{
		siteName : '软件淘',
		url : '^http://www\\.65052424\\.com/',
		nextLink : '//a[@class="next"]',
		pageElement : '//div[@id="content"]',
		exampleUrl : 'http://www.65052424.com/page/7',
	},
	{
		siteName : 'OperaChina',
		url : /http:\/\/(?:bbs\.operachina\.com|oc\.ls\.tl)/i,
		nextLink : 'auto;',
		pageElement : '//table | //article[@class="post blue"]'
	},
];

// 本体に組み込まれている MICROFORMAT を利用するか？
USE_MICROFORMAT = true;
