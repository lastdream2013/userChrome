// ==UserScript==
// @name            SidebarMod.uc.js
// @description     Firefox侧边栏增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @author          NightsoN
// @note            v20130428: bug fixed by lastdream2013, add useful site
// @version         0.5
// ==/UserScript==
(function () {
  if (!document.getElementById('sidebar-box')) return;
	if (!window.SidebarMod) {
		window.SidebarMod = {
			operaLikeToggler: true,//是否显示Opera风格屏幕边缘侧边栏开关条
			sitelist:[
				{
					name: 'firefox内部功能',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jY3MzyvkcRzH8e8/4UK23cukSRoys5sDNU6yF1oHB6U4+f1jEW2b7GEvLoQDJfKjYWTGWmSVCXtYwxgkFq2vyI8vazKz49f3O9/Pcw/TTmlWedfj8n693m/J3Rxn2u00yGe2ZK6/vnmWM1syu50G2d0cZ5J22g2yOOyBwDr82XyewDrisIeddoMsnQ6a4Kgb5M9RAjP5BGbyEfst0flRN4otBck3boG9Rtirf+RmLoezlQHOVga4mcuJytlrxDduQbqym+Hn+yhXY1lc+q659F1zNZb1/47djHRpS4HtakKeYgKODAKODPz2NBTvEA+qyoOqoniH8NvTInnIUwzb1VzaUpAuBpNhq5ygMx3lty/C5w/wb3z+wKMs6EyHrXIuBpORlH4TbJSgLuUR9HagahqqphHS9ciDkK5H9kFvB+pSHmyUoPSbkJTeJFgvR3iKuJ2yoh5M8NSoBxPcTlkRniJYL0fpTUI6705ErFUilgsQywXcTWY++eBuMjPSE2uVnHcnIp12GRGeGsT3d4jFXIKuUjQtFHWsaSGCrlLEYm6466nhtMuIdNKWgFitRXdlo01ncLMzghACAF1xoytuAIQQ3OyMoE1noLuyEau1nLQlIB23GhDuevRZK6rTzL2yia4so84XojrMYfOF6Moy98omqtOMPmtFuOs5bjUg/fr0Cm2hDP3bWzRHKg/DRtTRJEITFkJfXodNWFBHk3gYNqI5UsPdhTL2Wl4ieRviZH+fFc1VgfjR9CyaqwJ/nxVvQ5wsuapiTGt1sfJuUzyHH188y/6HeNbqYmVXVYzpLyy1L7aWlTc/AAAAAElFTkSuQmCC',
					childs: [
						{
							name: '书签',
							url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jZ2TW0xSARzGz5MvubVqrc1w3lAmoGZOikuui6E03VzLzFVW693nHnqwl9ZWaz21tZo9UNKoKIUkNW8BgjcsEUoPahDIuXDOkSPQ6qGvB1pbTVz1vX7/77f/vv/+BLGF1jy6GtqtPbnVzJaiPVqSntAK/xWm3No2ztsIbrYR0fGDXf8MiLk0vBg4jY1AOyKjtd/8ZkXO34cdmi7Oa0By8Tw2Au1gXMcQHqg2bTrMjCpymSndJcqjM1FuTSDmUqcy4bMQfQ1Yn9YgMdcKarQOIWtl+lOvklx9rrAEn8k6g6aSfIKe1C0I/maIwTNIrXQgtXIR6eAFbCw0QpisAO8sB+eshTDZAt7ZBHbkOGL2Qwi/rMHS41I2U5hLs8zPNyEduoxk4AjEuf1Yn66EMCEHN14G9k0xGHsBaFsh4iMNiPSpQD4qEfwPJDsJgiAIv1mREx1Tfea8J5AiO5CY3QfBowTvkCE+IgXzuhC0TYL4mAGRvgNYMkqTvvtFe37rwm9W5EaGamjR3w7xnT6z+lgp2KFi0P35oG1FYIf1WDIWf/F15+VvWmjYXnWVmaiHON8G7q0M8eGSzOrWvWAGVFizavChu8CS9XwhW5Ux7jEgMWMA56gG7zwKzqEH068E1VuGmE2Hhbt5c1kBq70Vbn6qGQnvKQieFlCDhxF9pQY7rAc7WA/KWof527tjWQErL+QhYboFUbsapKn066JRavz4sPBO4J4ktWyUI2pRw3tjRzo74Gl5knwiS5I90lt/eu9v7ur0Xt8en7m27XtWANkjPZfV/Cn3lZw2cyvx6y9+AKTve7YwH3ozAAAAAElFTkSuQmCC'
						},
						{
							name: '历史',
							url: 'chrome://browser/content/history/history-panel.xul',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLklEQVQ4jZXST0sbQRzG8UkM/kFUjEEPkXgIhFzEg0d79ND3lZsnLQSKh4hvIB6sEiRViBvWzaZaClVpss1oME2JRkowm3V2/fagJhZrpQ88l/kNn2GGEaIXXywWW1xeXi5Eo9G3QoiAEML30MDc3Nyb1dVVPRaLLT6s9VIWAl0IzK0tarUaxuYmuhCUH6oLwWEmQ61W49P2dnfWPbksBF8GBjjWNKrVKl81jc99fVz5/Vz5/Rz5fBzn81SrVY41jaMe4OsC34aHSa+vI6UkvbbGYSjEWTDI2egoxaEh0qnU/SyV4uRvQGNsjI/xOO+np8nOzGBFIlTCYb5PTnISDLI1MsK7wUE+9PdT8/meA62JCX4uLFCfn+fH7CzVeJyzaJRKJIIVDlOemqIUClEeH+cqEPgTMAwD13VfrFIK27axbRsA13UxDONl4ObmBtM0aTabFAoFdF0nk8kAcHd39zpgmiYbGxsopXAch3q9Ti6XQynF7e0tnU6Hg4OD54BSqouk0+nu5mw2y8XFBe12m1arxfX19cvAYx+Ber3Ozs4OUkoqlQqWZVEqldB1/XXAcRx2d3eRUmJZFq7r4nkeUkpM0+z+RGEYBkop7ymglKLT6dBqtWg0GpRKJTzP4/z8HIBisdgDstkszWbzl1LKe/qYjuPQbre5vLzk9PQUKSUAtm0/XuE+yWSSvb099vf3/1lN08jn8+RyOZLJZA9IJBLaysoK/9OlpSUphBC/AZRXmz31YpJUAAAAAElFTkSuQmCC'
						},
						{
							name: '扩展',
							url: 'chrome://mozapps/content/extensions/extensions.xul',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACpElEQVQ4jYWSP2gTYRjGn8sf77t/w5E63KWXkCgmlrRBlEIGJ6GWBHHpJB3smkWQDKWKkwhdXNTiLLh1cSt0sINpS4e2wSKpJSEp7SXI0Tbel0tIcvc5FVts67s98Dy/9+Hl5XDJFAoFkk6nszzPRxljwXa73drd3V2en5+vnvUFLgMQQmZisdiCpmlgjOHg4ACU0h+Tk5N3lpaWev8FCILgI4TgFGBZFnieH+i6zp31+S8Kz83NkZGRke+6rluEkIf9fh+O45Q6nc5jVVXbmUwmYBgGVyqVvHMNpqenuWw2642OjkIURRBCIAgCGGMIhUJpQRBqjDEwxlAulxGJRB6cA4yNjfHj4+OIx+P/tAqHw+e067owTfN+IJ/P85IkPZUkidN1/bPneZedBQDQbrfRbDaxt7eHo6MjFkilUrlEIvFRFEWIoigIgnBleGNjA9vb27crlcoTx3EqAZ7no+FwGIZhoNPpvL0K0Gg0sLW1tVAoFMoAXmUyGS7guu41z/MgCAKuCgMApRT1er17qtfW1lhgMBicMMZAKYVt21AUBbIsXwiQZRmGYcQBYGJiIhYMBuFPpVLHAJ41Gg1QSg0Az0Oh0NmNqNfroJRCURT4/f5kLpe7p6rqB1mWj/3FYvGY47g3tVrtteM4neHh4ZeapoFSivX1daysrCysrq5+Ozk5+eXz+ZLJZBLRaPSWKIowTfNrAAAWFxf7AJDP54nrugAA0zSxubmZmJ2d/QkAU1NTXCQS+QLgkaZpME0TjLG/ryxJEqeqalCW5Reu66JUKqFYLLaazWaREOIbGhq6QQh5x/M8LMtCuVxGpVJZPv1ErtvtXtvZ2bmuKMpMtVq9a9s2Dg8Pf/d6vZuDwYBZlhWu1WrvW60WADDbttv7+/uf/gDt9izlrTPxAAAAAABJRU5ErkJggg==',
						},
						{
							name: '下载', 
							url: 'chrome://mozapps/content/downloads/downloads.xul',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAvxJREFUeJxtkz1sG3UYxn/vne/T9n04aZu2adOGqC0wEJREKiKtOoAEE7B0yAIpEhJFYkOCrRNDmKjEwkAlBpAQZWAsSytYIIJOfJUgnKZK44TY+Ozz+Xy+/zEkNRXwTu8rPc+j9+sR/hv+4sriF+fmzs1EcTSQXNBN3b5+7frNe5/fWwaG/8N5KGymrn77flcpVWQqK4ZqWCiliovvXVwDvH/DSw+ShYXnXjo1M/vYevdHfytrmLcGt2h0Gkgm2JpNr9SvXXjmhbemDj/ev3Hzs9X7G2s3AGSf711Z+fDOgenw0OagTnJmi0PHDtKIGkhfkFT47dffecp4lsA8zE/f/LJ2deWdeaC934EdRHqz8uTCBJ41wZ1BxO32bbbjbSQSJBa6ecwHf7xLbzdl2X97HKiOBAxDD6bHHzXWN/4kPrFFvaiz2lllp72DtIR8NydpJOQ7OZfm3mSyc9IGKgAagGU5oefWjGBzip+/2mC9VWc33yVKItpxm27cRWWKF48tcWn6MpZrGaWSHY4EXLccGqYuSdJntnOeoz+cJosyMPYQooTlo5dZOvIq8aCHWynrpmkEoys4jh2UTJMjxycxjBKT96eI6zFfhp9SSku8XH6DV868juWbaKLR7mVYlhP2ep09AS8IQ8tyOFCroCSnUra5Iiuc3T1LNfS5MPY8uZXhWhb9NMNxbZxyOWi19jsoV71aydRoRm0mJ8YRAVUolsJlFJDSo6zb9AcZaTrAdSzKVS8cjVAbOzg+6CckSQ/TdqjYJmXXok+CJhoUQrvXJ8uG7DS2MSsenu//s4PA9yd8z0YY0IuaxO2CAtAERARNBF3XMPQSrutgmDrVql976JX18JNrH7O9tUUQBDiOi1I5UdTCsmygoOL5nH5ijs2ozvGxR5BC90YCadK5e35xkb+aLU5Oz+B5PkJBmsaYpoOIYJoGlufR7d7lVOUEWZo0R15wXXd2fv7p1zRNF6Xy4oHBNE0DQKm9Os9zdNEkyzJZ/f7rj4bD4Xd/A+G/JUWnoF34AAAAAElFTkSuQmCC',
						}
					]
				},
				{
					name: '信息',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdklEQVQ4jZXST0iTARjH8fcizk2ms6REw5EQ+ScQQZdz83Xbu70TBREkYqAoOh3UxDRNMvw3/0ydpuXUKWklmHaIvGRgHeY1nJ4reaUOngJBqOO3g5SJO9gDn+PveR54HiGm3Zir6hcV9biEJiifi3pcQtUvKjHtxlxB1SsqrZs+1iLLvN45n7XIMq2bPlS9oiLE+a141psRV6q48cIZVcaik4sLx648cyKuVOFZbyZu1IYQOyaRt1RKzqIcVcaCTOOHAH9qevcNqSGZvKVSYsckhNhhG9kLclSZ8w6SpuyEv+/ybyVO2clekIkdtiGoBqxkhRxkhRzon9q5MC6RPCFx6bGE/KqV8LfTYYDEgERWyIFqwIqg7rOQOWsnfVLCve7n8NcR+4cHbO2fBJd337Ol7LCl7OB+6yd9UiJz1o66z4Kg6S4hJ+hA57OcmbQc2SBn8jZpYzZSRqykjFjRT9i4Pm0nJ+hA012CoO4SMQbLSOwWzzbY3iA7cItUv4XLA8fSx6xceyJhDJah7hIR1J3FyDMVpA1ZaFgd5PDnEfs/Dgh/jfxt9PLTO8J7EcJ7ERpWB0kbsiDPVKDuLEbQdJipnKsiY9xKqq8EXaeJpIdmLj4y45y+Q/hL5MxmCR0mKueq0HSYEeLbTLhCLq6OWs/Q+y3o7hex9Xn79BVajbhCLuLbTAjaliLq5mvR+y1RpfaIND7vP3mkj6skPzBRN1+LtqUIIcFrpHqmBkOgnPTBkqhSuszovIXovIUktxdhCJRTPVOD9q4RQesxKAU9Thrm6rm35D2Xhrl6CnqcaD0GRdC483O1TQYl0XOT/6FtMigad37uby9nXNPBZi5oAAAAAElFTkSuQmCC',
					childs: [
						{
							name: 'Wikipedia',
							url: 'http://zh.m.wikipedia.org/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jcWTwY3EIAxFR6MUETpwDaPcQwekBVICOUIRLiGUQBqYlAAdhB6I/h5GQZPdaLXSrrQHDljW8/e3fSt7wW/e7f8BYQlQg4LsJcISUPYCP3vIXsJMBjFFlL3ATAZqUIgpIqYIPWqoQb0UOOtARBVQ9gLZSxARYorIW4azDsyMshfkLUOPGsz8AsQUIVoBPWrkLaPsBcwM0Qr42WN9rtCjrvADcPJADQqiFVifKw7oocJZBz/7CghLqP/be1C0As66msjMaO4N1KBO1Z11td3TFGQvIXtZjYspont0kL2sOTFFmMlcj9FZh+beVHkH4N1gZq5mXu4BEUENCnnL8LOHHjW6R1dNc9ZVoy8Bzjp0jw5mMvCzr5KJCMx88ugS4GcPIgIR1VbCEmrsmNK3q/zZzLIX6FGDiH52C2EJXyrFFE+b+mfH9AGWL1wAegygIwAAAABJRU5ErkJggg=='
						},
						{
							name: '百度知道',
							url: 'http://wapiknow.baidu.com',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII='
						},
						{
							name: 'sina微博',
							url: 'http://weibo.cn/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVQ4jb1SW0gUYRQ+TAsSZA+xL5Lu7R9nptBIzJJQKCFKicAHo4cowi5gkBCtbMXiPvQQbJnrziAVCUW91IN0ISiCTXYLglYSfIkC3ZnFWt3LjLZ5a/+vB1stCiGCDhwO/Od83/l+zkf0v0IPUlU2RCfTIWqNdNC6vyawVLpmqTRqaZS1VJrKqrT/j4N9RCUJJh3VPYo6zqTm4nuASMhq1JC5ShWWRt3TGs2memnLL+BxJ9utM3lM90jcEBUkmPSx2Bs6tLbCDNGwqZKZDVGDpdJjK0y3l8GGW243RGXREBUUU2fKqCFKxw1RfmBI0otkneOgeVnoslS6Z4WpY1qjESIiSrjlNoPJheLmVeq7SW/JvlyYOk2VLlgqvaLhMrfTEOVpQ1SQ3FqLrL8b+SdPMfc2jtloDNb1G/i0p3lJkagMfdixYT0R0UQPbTPD1EQJJt/UPRKfPHIM36bSPJfLQdM0HggEEI/HOQDwhQWeOdf1Q4k8Ne5kO1f+LirpiYZdKOTzSKVScLlcICIIggCbzYZYLAYAKMx8gbGpuqjk5YpBRGU+0+XjABAMBnljYyP6+/t5S0sLiIj7/X5wzjlfXESyumbpOh7p+U8E8qPPB1rBCwUMDAzA6/UiEonAZrNBEAREo1EAwMydu0vXYXJhzCXuXSZ4XV6+UffI7zPnL2LBtLjP50NlZSWvr6/H4OAgL+S/wupTuSFtRoLJ8wkmnfjNfQ/t9lKdyZeSNdtT6c6zMHt6YV7pQfr0GSRr6qCL8pwhyvdHKljVqn5vI1rzrMxRG3e4D8cd7NSw093+xsmabtntpasC/yW+A9uHY8MWzyGVAAAAAElFTkSuQmCC'
						},
						{
							name: 'Twitter',
							url: 'https://mobile.twitter.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABtElEQVQ4jc2SsUsbURzHf+DQRbxF19zSQSg0B67FbCVbF+f4HzR19wpdKqEaSofSg4AcBtNQQ6YmYBKFKgSOloRwxmDwLMlpQLn3Qi5Hohm+HRo1Vy/q2AdfePD9fb783pdH9F8cxphwnxfOVqKB9f3dxXRpvcq5eO1VORdJM7nkV/bKXiGMMcGv7JVJ0UHqCShWg/Ah3w5nK1H/l91SqtZaoPyJFaR4E+Knwm/N5NJowGrxeIniTdAWu1XyHKTomEqa9mL2KEEG6z6nLQZKtECRAkbXfFs0oy54ROFf9lcAs1QwrJdvSs63GzNWA73fhvhx2/BtHDTHBQB4SkREP886L0jR7w4lWn/lAUu5dv3mnQAmXRs8Qq81lnC1bfDevKw7qpC27McEGLw37wpo2faMlDw8oOT5g3BI62YAPHEFAJgAMBc77kdCWjczDpZy7fqFczXn+eM0k0tysbHm26yfjoN5bxAAMOEC5Z3Dd8LKd0aRAuhz+U7zQtqyZd1RPeHh+qLVHwRTjctlWXfUV/udHyGtm5F1R001Lpet/iAIQPSE/+lgejj4DMDs8D59L0hEfwC1m8lBvoNIXAAAAABJRU5ErkJggg=='
						}, 

					]
				},
				{
					name: '购物',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYElEQVQ4jZXQT0jTcRjH8e9FPEY3L4LoJS8ylZWGNhGdSIYuHTKGNtQt2ZoudSbKHMzCfwsZHdLpUqdzujRtJSFlGtYlLSz/HRr8okNCeLJ52OndIfqR1WE98IKH5/PAw/crEmxKRaqzRMob1HLlXk1c8ga1pDpLpASbUiFSutWSb93H2v4q6wfxWdtfxbfuI6VbLYkLfRW4V9y0LNi5HrTEpWXBjnvFTd7AVUShuwpT0Ez9TOM/3Xh4k/bHXX/NTUEzhe4qRMO4nd7nbhzLLmqnjbLA1hyOZReLH8OcxE5oDDWdymunjVwa0CD2IhK/6lXkNTp/HR1PnABsfnnP/IclAFwr/Uxuzsi9zl9Hbl85osZro/+lh2jsBIDQ9iJtYQcAu4cHhLYXAWgLO9g9PJB3tJPXUN4pQ2T1lFI5UYNnYwSAaOyEinE94b1neDaG0QeMeDaGqRjXy0c8GyNUTtSQ1VOKyHCpqfYbqAtZ5adYlzooe6A75faLu3JeF7JS7TeQ4VIj0p1F6KfqKR7Tsv11F4A3n99SPKaVafwGIkc//2phZ5niMS36qXrSnUWINEchhoAJ1Wgl9Y9a5SuRI4mJd3PM7zzl8Ps3AD4dSVyerEU1WokhYCLNUYhI7irAFDST49WQ49XQvtLLcSzK73UcizK6NSvv5Hg1mIJmkrsKEEmd+Vhmm8gcLj+lIdwl+zPLHC7HMttEUmc+4qz9IpZAMyqfjnP3y+Ki8umwBJo505aLSLQqpdIhPbZgK/aFW3GxBVspHdKTaFVKQhgVigRztpRoO8//SDBnS8KoUPwAYqeVlXMPRPUAAAAASUVORK5CYII=',
					childs: [
						{
							name: '淘宝网',
							url: 'http://m.taobao.com',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg=='
						},
						{
							name: '京东',
							url: 'http://m.jd.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAy0lEQVQ4jc3TIQqEUBDGcS/hBcQDyB5gwWyxvmI1bdxL2IxbtlpeNngCwbBgEAxbVFgwiDaD8N/0BEVYXIsDX5wfzDCjpbrBkWjnA16XK4UrSHWDwhWLZKb1G2iCEIBUN1jX1A80QbgPUA257dDFCQCfx3M/oKKQv4HS8wHmPe0GClccA963OwC57WwDXZww9cMmkJkWY1UzVvVyB5lpUXo+bSQBaCM5A20kKVxBE4SMVQ1A6flLQM019QNtJOeDWVcXJ/PsJ/6FvfkCxwFl51kLjdoAAAAASUVORK5CYII='
						},
					]
				},
				{
					name: '邮箱',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9klEQVQ4jZXRTUsiAQDG8flIfsQuER16O0hFQrYIaR7cxrVJIZvJl1wrUEbQsBzDl8acad5HC7b/HhaCdpddO/xOz//2CNH9o0gyl9cKle9UG62FFCrfSebyWnT/KCIciqea6Xj8eHv7FNPxOBRPNeHbeQU3CLG9gGfXX4jtBbhByGmphpArX2E6Hk+W8ymm45ErXyHsnJRRR8+MDAvdtBcyMizU0TM7J2WE5YSI3J2Qaw256U8YPpn/dNP/1crdCcsJESEpFZHqKvELldR1j2yzT+tBZ6BPP2g96GSbfVLXPeIXKlJdJSkVEfKlGo4fIjfabIoKMUUlXu0gNXvcDXXuhjpSs0e82iGmqGyKCnKjjeOH5Es1BEm5JJy/Yrk+90OdlFxnNSOzfa6yp7TYU1psn6usZmRScp37oY7l+oTzVyTlEiFbLBHMXrC8AMsLGEwMquotW8dnrIgVVsQKW8dnVNVbBhPjvQtmL2SLJYRMQcEP50xt951uWnS0AWm5Rlqu0dEG6Kb1ofHDOZmCgpCWinjBjEfT+oM2nqCNJ3/dvGBGWioiJLMF3CD8732/c4OQZLaAsJ8WMWyX8dTk4fFpIeOpiWG7xFJfEdZjCa3R7mLYDo4fLMSwHRrtLuuxhCYsbUQja7sHWvRLis9Y2z3QljaikZ9ZxYTIjL7hqgAAAABJRU5ErkJggg==',
					childs: [
						{
							name: 'Gmail邮箱',
							url: 'https://mail.google.com/mail/x/1cj43rhn0qhbt/?ltmpl=ecobh&nui=5&btmpl=mobile&shva=1',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4jdWPsQ3AIAwEGYtZ2IZpvIGHoaRLm47q0wCyiY2SKspL3/mOJ4T/p8SI0TNnNKJtz5whGSUoMQLMcMOM9T7I14+UfEmHj5TUiikA4EsWGIAtMCUGvBWAWUkULFbZglrRiJREwo0IqNURDLgfjO/I2fLmJlhhN11iLngcb8GbTsHnuQAHliL7fehqZAAAAABJRU5ErkJggg=='
						},
						{
							name: 'hotmail邮箱',
							url: 'https://login.live.com/?pcexp=false',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOklEQVQ4jWP47if3HxdmYGBgqN/F8B8XZmBgYGAYNWAwGEA5WPL+P07MwMDwfyfDf1x41IDBYwCFAABNnuSDUZI3LgAAAABJRU5ErkJggg=='
						},
						{
							name: '网易邮箱',
							url: 'http://m.mail.163.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgoAX4z8DwHxsmWTM+MaI0Y2PjNQSfIrIMIDks8CkkKxwojglcBhLlf3SDSPIGTDEuPkWuwGkAvpAnJIbXMEKuIegFfOJUAQBXtbVLrN/2QwAAAABJRU5ErkJggg=='
						},
						{
							name: 'QQ邮箱',
							url: 'http://w.mail.qq.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVQ4jWWTXWxTdRyG/5jYC+ONhBjCxoWROD7cDHKBkw9ZhBQ3CMNlqBCNQFyiy0bWqRVNlPiVsKzJsBdsxrBlgChj2Qc0RWA2c5hmUGDUlkE/JrpubHbnnJ719HRtz+njBYkf25P87t7nd/W+QsyD26KIwKOO3N2NPj18xDg1/KFhdVX5XnLtcJT0bSian/+/PFpgI/yCrv3ZydSkzFhMoeLiW6zu3UCNp4am4SZ9m3u3baF4Vlj4vdzN+LvosdNMxXVkRUOWJM74T7Lz0uus7dvMocF6zoddvOE56F5zdo3l3weR9S1IbRj3bUh/TTCrzZHNZCCfh2yGsfhvfHW9iVd/2sPHvx5m8I+rbHNXOh7KflGM+r1BrBZ9vIOkZoBpYgK9vhiNXbfpv/kAslm894do/OUQzb5mTo7+YKzt3bRaEFnXQuIURKrQ4tcxARPY3+XH8oUb8ZmLRw73cykwDcBoLIB9qJG2kVasF6sdgom6u0w2YkZ2oauTAJwbmUYc9SCaBxHHriK+HqC22w9APgPe6BD2IRv7rhwICmL1GSJlmJEdZFIqhgl7+kMI5zDiuA/R6kM4r/Fi+00GQhJGziCpaBy/8Q2vuHcnBGM7M4wWYobKID2NL6bz+Ld+FrUHEO0BxIkAizqCPNY6QoNXhnwOPaHjCQ+w+cL2pCD4RJiAgFAZ2dkoJtBzR0a030OcHnt4HWFqu/2YQNY0SappbkSvsenC9qBIhiuc2fAqUhE7iiIDeXruyGztj9HglWnwyljPT9DglRkISUjjEVRZ4+d7Htb1bWkRWjRaPNHZZoxrc0hqCk3TwMxh5gww8gAYQHYqgtrWRKJ8C5r9I476jhnFvaXFQggh5Keedk6dO8EDJU5cn0PNGKSBNKDNTDJ7uYvEvkrkpcuRFy8l/XwpPe9ZW/5pYlAIi1xY6Fbq9jPzYytx1xlmur9Ddn6KUldF4uXnUDY+i/rmVtSK9SRKStzB6mqLmI/0ZIFNKV2lJ9+xkrK/RurI2+jN9aQ7Pmeu80uSNVW6VLB84Zj+S3zJsiJl5UqHunfXrdQn76N9UEuisvyWsuIZR3zJsgVz/hsDb4s1Ix8u4wAAAABJRU5ErkJggg=='
						},
						{
							name: '139邮箱',
							url: 'http://wapmail.10086.cn/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4jWNgGAUMdl2H/8MwNjG7rsP/pbvv/mdgYGCQ7r6LKU6MATA5XOIM6AZgcyE+NoYBJLuAJ3fLf57cLXADYHxkDAsDbOIYBiADXHJwcWwm4nIBVnFiFMKiEZc4ZYA7e8t8ZIxNLHnPL6ziKbt+LWDgzt2UgIwZGBgwxDDEs7fEI4szsGduVGfPXqcGcxUynz17nRp75kZ1dJezZ25UZ8/cqA4AXbcUT3TS3DcAAAAASUVORK5CYII='
						},
					]
				},
				{
					name: '翻译',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACiElEQVQ4jZWRy0obcRSHZzdZTjQXJXjJxMnkKip2dHJTlCRWjVlojJdNW9GCupxNq+LCIoqioG+QhXWtfYG/2I07LYJCID7C5Am+rpxFaWl74KzO+b7zgyN5vd6+YFBtJJK9DA6++adOJHsJBtWG1+vtk7q6go2N9U2ODo84PT7h9PiE3Z1dqvNVyjNlyjNlqvNVdnd2nfnR4REb65t0dQUbUjQaY3VllaWFRSqzcwz092NZFkIIXksIgWVZDPT3U5mdY2lhkdWVVeLxBFIy2UtpeppioUhPKMT9/T1/KiEEXo+HYqFIaXqaZLIXKRaLM1Gc+CsM4Pf7cckyPaEQE8UJYrE4kq5HyKYzGIaBS5b5srcHgG3bGIaBYRiOoJDP45JlLMsim86g6xEkTdOI6DpCCAzDoFKpOMD5+TkuWca2bQBeXl7w+/0IIYjoOpqmIalqiJCq/hFwyTK1Ws2Rvh4IqSqqGkLq7g46gl+B36W6urpyBN3dQaSOjk7Cmua8rVKpOIAQglqt5qR63RFCENY0Ojo6kQKBAMPGEDtb2wB8vbjA5/HQbDb58fCAbdv0qCqXl5d8v70FYGdrm2FjiEAggNTW1k4ukyUejfH89ESz2cQcGubw4MCJvfXpMx/evefu7o7npyfi0Ri5TJa2tnYkn8/HSCZLNBKhkM9Tr9fZ39/n7OzMEdzc3DD5dpJ6vU4hnycaiTCSyeLz+ZA8rR5SpkkynkDXNNJmio9ra3y7vnYEj4+PLC8tkzZT6JpGMp4gZZp4Wj1IbndLI6yFSZspRnM5RnM5xsfGKE1NUS7NUC7NUJqaYnxszJmnzRRhLYzb3dKQFEXpUxR3w624+Z9WFHdDUZS+n8aRSE09k0IMAAAAAElFTkSuQmCC',
					childs: [
						{
							name: 'google翻译',
							url: 'http://translate.google.com/m/translate',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC'
						},
						{
							name: '有道词典',
							url: 'http://dict.youdao.com/m',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg=='
						},
						{
							name: '海词词典',
							url: 'http://3g.dict.cn/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jY3Tz2vTYBzH8SB487I+U8RdxUzqhky8qCBDcOrJk/gHTBCPipTRNjAtKgh9oNXhaQOZ0B1EkLRYS5kV3Nb1hzSt1k27NGvRNa2lTZMmLcrHw5aOWFED72Nez/N9kochHJ0hHEX6+BFLhKMgHIXNTX/Y3HTJ5vZy+6bu7Wd+fwhHcXN5DamTdkvOTAmuTBmuTAnXFjOYCIRxyPMYxO29bwEGp/04/HwVidNjllheAMsLsAezGI/mcSNRhCMl4sSTBRCOzvQB8XOnLJmA2TAv4PLbdTgz5W3E3MngtB8sL2D54jhYXsBoKIf1Z0+RqLdR7f7ESl3Dg/w3HAtlwfICzi9+giMlbo/j9A71AJYXMPYqh3fVFmSjC1nv7GZ0EZMVjO4gk/ENXFqIYICjHgvgW9tCRe+goBlWQO+gonfwMP8VLC/gbDSP67EcbBx9bwE+NFQUNAOzchuzchuBmo43Db0HJL8rO2NmcTu5AZvb2+gBR4MCSi0NQmsXMJuT28irBkRF7S12KyWCcLRl2UG80sAX1cBcVe+rqBqIVxpgeQEjoSwmY9n+Ee5kNlFWNKw0DczX9F6rioGyoqEYnYLkIzgT+YiJwOv+Q7QHswhJMkpNFZuqjoLWgaTqKDVVbOTDkPwHIPkIJB/582c0EVdaRFiq4HOtjmBxC46UiOTVvb2XJR9B48UFWH6k/yl5ZY8FkXwE/wSGeQH2l2mMzEdw8O6jPoQxr/Pfsrnp0gBHPcTpHWIYhjERhmGYX1cvojf/ywBHAAAAAElFTkSuQmCC'
						},
						{
							name: '在线字典',
							url: 'http://www.chazidian.com/m/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=='
						},
					]
				},
				{
					name: '其他',
					favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5UlEQVQ4jZXG70uTCQDA8eePcCR4NKcgAxkI3YvDg/BFrOZo1pGsX1zMwnDtmqQvnGYMWReu02Y5y/zRUlPTRT49On8uDaVVktXl9O6snvBHJ+flzGd7MWR8752vdy8+8BHSCt05mUVNsq7Uxz5Hb1J0pT4yi5rktEJ3jqCxNMoVnSHaRxfxjf+ZlPbRRSo6Q2gsjbKQZW3F0fGSUzcnOe55mpRTNydxdLxE+0s7QtZFH+b6ILaWKQrcI+hdAYq8QU54xtG7AuhdAU54xrG1TO0q8gYx1wfJuuhDyLS2Ybo2wvKXf2gQZ8lzSgzPLhH6/QN5Tok8p4Q4EyayGdnVP72A6doImdY2BM35FoyuAENzy7xa+ExutUi99A5lW6GgdpjcapFvW99wPZrjrHeCWDTGT3XjGF0BNOdbEDTnmjnoHKSs8wXKtkL+1SHuBOZIJBKU33uG9c5T4vE4xz0TvFn8xGT4C987BjjoHERzrhlBbbnNgWqJH69IJBIJSlunCH9cZW0zxqPpMN7B1/yxtkVV5zTxeJyZt0scqR3mQLWE2nIbYe+ZRvSXJbIv+Qm+X2P67RKxaIzKnllW/t5g/uMq3tEw2Zf8/FAl8v7zBoHQAvrLEnvPNCKknb7FoaonaO19VDx4RWQzwvzyV7T2Pja2FGLRGEfcY2jtfWjtfVxonUHZVjhU9YS007cQUk82YKwUybD1sv+KBEBDYJ4MWy9j71ZZ+Rolt/IxP3tGybD1UtI0wc7ODsZKkdSTDQgq8w1MDpH0km7SS7oJr2xiuDpMekk3Zfdf0B/6xIXmSdbX17ne/5xnc3+x8m8Uk0NEZb6BkFJYR4FjAHVxF+riLsy/je1eZ3+IoWYIdXEXbROLKNsK8noEQ80QBY4BUgrrEFKOujGU+9FZe/jubEdSdNYeDOV+VEdrEfaYXHK25S7GMj/HKsSkGMv8ZFvussfkkgVVvjMn9XCNnHr4V/6fGlmV78z5D2sApLsqut5jAAAAAElFTkSuQmCC',
					childs: [
						{
							name: 'hao123',
							url: 'http://m.hao123.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4jaWS0RHEIAhEKcZmrgDLsBnLsACaoZi9D4XZEE3m5phhNJh9kI2CTXQb+GiN9SklVCJo9vzyKwAADLOrYcRRrp0BK0PstQXhRgFoVi8Hx3VTmwD9F3CaIH3WySvpDgBgZBqbePGAxAsw0KzO/PEXApiADOk2u3Ub0LVXGwi/KALgEBcXsqSQBSU9ixLAxVnEwOTlBGgaNQt8r9QgQEzlKVyUO98mAACjKXrqkq/C7Vpk8s6Tp/gCvDQkV4O+/+MAAAAASUVORK5CYII='
						},
						{
							name: 'Wolfram|Alpha',
							url: 'http://m.wolframalpha.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAByUlEQVQ4jZ2SP28TQRDFx0jIiRNsbmccHPtu506JcEMFUkCRUDqqFCkoKPINEEViCUhHgVLyGVKmQkIgN9R0hjZEPt/OmT8miSLkNJHiyJvC9iXCnIV40uvmNzNvdgEm6OvM3PobgOlJNYksQKYzXVr6NgSaANkYvZ8d8ldGNUJ8tzk7W0xtIg6/Fqf8KXRuPYkweCrE1pBfD9Ffi8nfFdLhlxyVUxvsF72HMflWiNNc/yv4CuBaU6l8pCqPBXU/rUFE+kNEQbVd8Bb2bpZ8AACIC9qJUO8I6mNBfS7Ett/9PWYhtoK6L6h7UZGPDmbm1y+vTUFVUL8fTTreeD7w5suBa1uXm6B7so/e2vgBp6YCUX53Qn4rxDZWencM7uRLS4b051FRagRiK8rttUivJvBhtrho0HtniH8J6l4SYfPFwLWtPyLoc4P6hyheTl4AADINKOciFTwyyGdp6xvieuh4d76ryoMw7y6ORQnnFpYFh1OITxMQuSvEtqW8t6mfCACgXahsG+K6Qfd+jO6zIbzXulG53Xa8bUO60QTIpvGZMDd/rwFwHQCgAeWcIe60yd8YFRhyVz4CFCZucVURBbWTLFX/GfgfXQA2JSG687sO8AAAAABJRU5ErkJggg=='
						},
						{
							name: '快递查询',
							url: 'http://wap.kuaidi100.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jY3T329TBRjG8f4PxJtKXDS7wYiJLpksyNZmg2SJJO5icVwskhBJjMluqAkabnCpRiNIswapE5jDIVtWkbVbkOKcGxAkQoF2/d216zln7VnLbNf2nPbstF8vjkIWbrx4rt73/eTNm7ymN0ajDM7LHH9U5stkjdFck4t5tsVXbOIrNvlF3uJ8SmHAJ7NnIgWagMk6nWHw9wI2f5m61sCVrD6HjOaaeAo67pzG+ZTCu3NrWKYy2JeSmLrdGQbnZQqbCiVVxx5Tcaxu4RR1zko6TlHndFrjVELlR6GGK1nlk782sExl6LgUNzY4tihQUnWCQp6ToSpfxGt8vVJ/GntMxeYvM5ZWccYqfPaw+AzYN7nKpqKhaA0+uvs3Nn+Zq8EUJVXnRKDCyVCVE4EKQ/eKOGMVvlre5NP7Rfb+lDaAPRNG88xjkff/eEJda1BSdf5MZrH5y9j8ZQLrFQ7dlKlrDZTaFkpti7bxFdrH4phaXVFKqs6BqyL9N3IoWgNNb3L09gZHb29weEEmKOQJCnkUrcHxu+soWoO3L4Z5/fsoppccQUqqzv6fRd7xSDSbUFJ11sp1qnWdkqrznjvCsUUBRWug/LthqyvKrnNhTC3f+FG1Jh2X01imMvRek8gWq5RUncT6Jj0/3MdyJcXH954wdKfAkDdAqyvKzpGwAbw5EUHTm+y+kKBtfIWOy2n2Ta5inc5gnc7QPhZn6E6BD2/lObKYp9udocUZwewIGUCXRySwXmH3hQQtZx6z61yYV7+L0T4WZ3Be5shinsMLModuyvTfyNE7J7Fj+MEzwOKV+PaRjMUr0TMrcfD6Gn2+LAM+Y2jAJ9Pny3Lw+ho9sxIWr0SXR8R8ZtkAOmdEPvg1gcUrbYt11gCtsxKvjSefq3d5RF4ZWcZkdoTYMfyAtispOmfEpw1vudO8fDbCi6cCmB0hXvj84ba6xSsx/FsE086RMGZH6H/nP6RzRjS+EU3AvpRk72SCbneG3jmJPl+W/gWZgVsy/QvGDXrnJPZfW6XjUhz7UhI0ATSBfwCpexjs7guJ/AAAAABJRU5ErkJggg=='
						},
						{
							name: '天气预报',
							url: 'http://wap.weather.com.cn/wap/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnElEQVQ4jXWT2UtUcRTH/Rdui8k1HaV1Kltsg3opeigKhIJKITXKoiSISCN7EMJosbQFLNJSsawMizYlkR7vuIyWWS7TqDmLM3d0Jkidae4s99PD4LVp6sAPfpzlwzlfzonjD/N9MzN89jzGVRswxOswzF2IUb+O/swc5NrHhH0+/ra4mY/9zl2GC4qw367AcukaoxcvY71cirW0HNuNW9iu32Tg0BHs5XdQg6FogPNhLZIgYr9dwcTL17jqG5DrngDgedeM414Vzgc1DJ05hySIDB4+DqoaAYR+TtKuW4YkiNrrTt+Cp7kFgB/vW+lO3xIVlwSR8WeNEcDEi1dRgf4D2YS9Xqa6PmLOP42nuYWQ10vf3syovC979kUA1is3NGdHqp6Ax8NUTy9+i422hFQcldWooRCBCTcdqXottz15aQRgKbmiOa1Xy5j+0kd74mLCfj8DWbn4TGas18pQxhzYSm9quYZ4HagqcY7Kas3pt1gZLS5BEkQU2cXQ6UIUp4zp6Em+F5egyC4M85KQBBGjPj3SwaSxG0kQ6VySBsDnHbsjAKeM6Vg+3gETw4UX6FqzGYCebTs1rQDi1HAY48r1dC5Jw9s3gGF+Mm0LUlADQXp3ZuB+24Rc8whJEJls76Q/KxdJEBmruD+7B8MFRTEKh/0KbeIiRoqK8VtsSHMSMcTrkASRtoRUFKc8C5ju6Y0CuJ4+50frh8isK9JRg0H6D2Zr8ZGi4thVHszJQxJEulZvQg0GMR05oRXIj57iMw9hiNfRkaIn4HbHAgLj43SlbcRxrwq/za61OyOwIrsYzMljvKHx38cE8GtkFPOpM3zevitmdT9t3YH7TdP/r3HGwoqCs7qOrxn76Vi0EsO8JIzL1+KqfxZTDPAbErj2EvvFq1YAAAAASUVORK5CYII='
						},
						{
							name: '火车票查询',
							url: 'http://t.qunar.com',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jZXQz0sTYBzH8c9ETcvKRE1Xf0WHCDpIh44d8tCpS0FQES4aQ4JISiOTQm3qdAtxTrfQ+QubuZxmpi2bYZpjZkUHO1heLA1WCe8OY2q2BD/wgofn+3yfh+8jScofmCs8OPiB7cgfmCuUJBn7ZyIH/LNsJa8/knDf2D8TkdEXRm2TqCWEml+x/1EYo29dRvc0O7qmkSuEXKF/6pI7xPvlKPGoKUhO9xS7OyaRY5SU9tdsjFrGyemeIq8nRmmecY4PzeJf+AbAyeFZVPWE5NaXJEqOdwK5XpDrnSDXO4GyPUGSnM9RbWDtUGjxe8LmeNJdY6S7Rsn2BFGWc4Qs5wi7GodRee+WjfGsRFdR1WOynCMo0xEgLsM+gG51ImsfJ3x/z3468Jal6Or6X1iayXQE0J7aPjZTWTtHPM8AOOYdQ5YmZGniy4+faxe0Rj6j8g6UUdnDRil3u9hbHRtlanGJHKsPQ0UnKnHjjsxzqHmIlV+rVIy/Qzceop132tko9XYbuuYEwP9xgYKWQXTTjS7UAGCs7qFy8E1sDLMDpZW62cxQ4kJnKwEoaPQjUz2HG3w8/fQVFdnQFTtdkfnYBanXnSSi89WxV4rq2Ffmjq1PlcVqF++zHP2NLtWg5KsP+B+du4eK7cjSgM5UxPaK7eSVujhq60VmGzKYbcEkSz3bIXMdMlkxmG1BSZJM1rDhcg3bIZM1LEl/AEUzpfWySDZbAAAAAElFTkSuQmCC'
						},
						{
							name: '百度地图',
							url: 'http://wapmap.baidu.com/',
							favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPUlEQVQ4jZ2TvaqDMBiGvYhchOBtOOUGDmRy7JgrOEjnDt5Bhy7ByUkKhjN4FrN3UIRO1l0QXYT3DIcvGG2hdHhJyM+T50vUC6ICn4ZxBS+ICozz8lF8kT0HXK53MK5wud4xzgvyqoeIS7Td9B6A9HyRoe0mMK7AuIKIS2ddKLULMPVgJwiQV70FHE7mtcHhZMC4Qig1TD1AxCVMPaDtJoi4tCXkVe+YWgCdwriyG7elkVko9d5grT3OC5K0gS8yMK6QpI1zF4yrvQHpmXpAkjbOYoKIuLR30XbTPyCUGm032dBd0ClbCJVnAUFU7DaTEdXOuLIlHM+31wA6ifrr8fV8XvUugLToAzL18DTbV3IMTD1A/TwQSo2v71/bUp9e6Hi+WaBjQCHYOwmiAh7javebhlI7rS8y267DuMIfGyH1Cj0fcYcAAAAASUVORK5CYII='
						},
						
					]
				},
			],

			makeButton: function (sitelist, parent) {
				var i,
					len = sitelist.length,
					item,
					btn,
					menu,
					menupopup,
					menuitem,
					frag = document.createDocumentFragment();
					insertpoint = document.querySelector('#sidebar-header .tabs-closebutton');
				for (i = 0; i < len; i++) {
					item = sitelist[i];
					if (item.childs) {
						if (!parent) {
							btn = frag.appendChild(document.createElement('toolbarbutton'));
							btn.setAttribute('tooltiptext', item.name);
							btn.setAttribute('type', 'menu');
							btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
							menupopup = btn.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						} else {
							if (item === 'sep') {
								parent.appendChild(document.createElement('menuseparator'));
							} else {
								menu = parent.appendChild(document.createElement('menu'));
								menu.setAttribute('label', item.name);
								menu.setAttribute('class', 'menu-iconic');
								menu.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
								menupopup = menu.appendChild(document.createElement('menupopup'));
								SidebarMod.makeButton(item.childs, menupopup);
							}
						}
					} else if (parent) {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menuitem = parent.appendChild(document.createElement('menuitem'));
							menuitem.setAttribute('label', item.name);
							menuitem.setAttribute('tooltiptext', item.name);
							menuitem.setAttribute('url', item.url);
							menuitem.setAttribute('class', 'menuitem-iconic');
							menuitem.setAttribute('src', item.favicon);
							menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
						}
					} else {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
						btn.setAttribute('url', item.url);
						btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
					}
				}
				insertpoint.parentNode.insertBefore(frag, insertpoint);
			},

			makeSplitter: function () {
				var sidebarBox = document.getElementById('sidebar-box'),
					splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
					sidebarBoxArrow;
				splitter.setAttribute('id', 'sidebar-box-splitter');
				splitter.setAttribute('onclick', 'toggleSidebar();');
				sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
				sidebarBoxArrow.id = 'sidebar-box-arrow';
				sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
				//sidebarBoxArrow.className = sidebarBox.collapsed ? 'right' : '';
			},

			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
					sidebar = document.getElementById("sidebar"),
					sidebarTitle = document.getElementById("sidebar-title"),
					sidebarSplitter = document.getElementById("sidebar-splitter"),
					sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
					lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewBookmarksSidebar';

				//if (!commandID && sidebarBox.collapsed) {
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						sidebarSplitter.hidden = false;
						//setToolbarVisibility(sidebarSplitter, true);
						//setToolbarVisibility(sidebarBox, true);
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						sidebarSplitter.hidden = true;
						//setToolbarVisibility(sidebarSplitter, false);
						//setToolbarVisibility(sidebarBox, false);
						if (sidebarBoxArrow)sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}

				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;

					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}

				sidebarBox.hidden = false;
				sidebarSplitter.hidden = false;
				//setToolbarVisibility(sidebarSplitter, true);
				//setToolbarVisibility(sidebarBox, true);
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';

				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);

				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else
				fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);

				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);

				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function () {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				if (this.operaLikeToggler) {
					this.makeSplitter();
				}
				this.modifySidebarClickBehaviour();
				var css = ('\
				@-moz-document url(chrome://browser/content/browser.xul){\
					#sidebar-box-splitter {\
						background-color: #E8ECF6!important;\
						border-style: none!important;\
						cursor: default!important;\
						min-width: 0!important;\
						opacity: 0.8;\
					}\
					\
					#sidebar-box-splitter:hover {\
						background-color: #BFC4D2!important;\
					}\
					\
					#sidebar-box-arrow {\
						margin-top: -20px;\
					}\
					\
					#sidebar-box-arrow[class="right"] {\
						width: 0;\
						height: 0;\
						border-top: 4px solid transparent;\
						border-bottom: 4px solid transparent;\
						border-left: 4px solid #4B5660;\
					}\
					\
					#sidebar-box-arrow:not(.right) {\
						width: 0;\
						height: 0;\
						border-top: 4px solid transparent;\
						border-bottom: 4px solid transparent;\
						border-right: 4px solid #4B5660;\
					}\
				}\
@-moz-document url("chrome://mozapps/content/extensions/extensions.xul")\
{\
.addon:not([selected]) :-moz-any\
(\
    .description-outer-container,\
    .control-container,\
    .addon-control.update,\
    .include-update\
  ),\
.addon:not([selected]) .status-container > hbox \
{\
visibility: collapse !important;\
}\
.addon:not([selected]) .advancedinfo-container \
{\
margin-top: -20px !important;\
}\
}\
\
#categories:not([last-selected="category-availableUpdates"]) + #view-port-container .addon:not([selected="true"]) .update-available {\
position: absolute !important;\
left: 0 !important;\
margin-top: -9px !important;\
margin-left: -8px !important;\
width: 16px !important;\
height: 16px !important;\
font-size: 0 !important;\
}\
#categories:not([last-selected="category-availableUpdates"]) + #view-port-container .addon[selected="true"] .update-available {\
position: relative !important;\
margin-top: -13px !important;\
margin-left: -11px !important;\
padding-left: 12px !important;\
}\
#categories:not([last-selected="category-availableUpdates"]) + #view-port-container .addon .update-available > * {\
margin-top: 12px !important;\
}\
\
\
/* Smaller font */\
.addon .name-container {\
font-size: 12px !important;\
}\
\
\
/* Buttons - Move to the left */\
.advancedinfo-container {\
margin-top: -5px !important;\
position: absolute !important;\
}\
.description-outer-container {\
width: 100% !important;\
}\
.include-update {\
margin-bottom: -1px !important;\
}\
.status-container,\
.control-container {\
-moz-box-pack: start !important;\
}\
.update-available {\
-moz-box-align: start !important;\
}\
\
\
/* Extensions section - Always show "Settings" button, to reduce mis-clicking on "Disable"  */\
#categories[last-selected="category-extension"] + #view-port-container .control-container .addon-control.preferences[hidden] {\
display: -moz-box !important;\
opacity: 0.5 !important;\
background: -moz-linear-gradient(rgba(251, 252, 253, 0.95), rgba(246, 247, 248, 0) 49%, \
                                     rgba(211, 212, 213, 0.45) 51%, rgba(225, 226, 229, 0.3)) !important;\
background-clip: padding-box !important;\
border: 1px solid rgba(31, 64, 100, 0.4) !important;\
border-top-color: rgba(31, 64, 100, 0.3) !important;\
box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25) inset,\
            0 0 2px 1px rgba(255, 255, 255, 0.25) inset !important;\
}\
\
/* Icons - Fix sizes */\
.addon[selected] .icon-container,\
.addon[selected] .icon {\
width: 32px !important;\
height: 32px !important;\
}\
.addon:not([selected]) .icon-container,\
.addon:not([selected]) .icon {\
width: 16px !important;\
height: 16px !important;\
}\
.icon-container {\
margin: 0 !important;\
margin-top: 2px !important;\
padding: 0 !important;\
}\
\
\
/* Messages - Move nicer */\
.addon > :-moz-any(.warning, .error, .pending) {\
margin-left: 0 !important;\
}\
\
\
/* Show updated date on selected add-on */\
#list-view:not([type="userstyle"]) .addon[selected="true"] .date-updated {\
display: -moz-box !important;\
}\
\
/* "(Inactivated)" & "(Update)" - Remove */\
.disabled-postfix,\
.update-postfix {\
display: none !important;\
}\
\
/* Labels - Remove */\
.category-name {\
display: none !important;\
}\
\
\
/* Fix badges */\
.category-badge {\
margin-left: -10px !important;\
margin-bottom: -26px !important;\
padding: 0 !important;\
padding-left: 2px !important;\
padding-right: 2px !important;\
}\
.category-badge:-moz-any([value="1"], [value="2"], [value="3"], [value="4"], [value="5"], [value="6"], [value="7"], [value="8"], [value="9"]) {\
padding-left: 6px !important;\
padding-right: 5px !important;\
}\
\
\
/* Create popup bar */\
@media all and (max-width: 37em) { /* (*) */\
#categories {\
position: fixed !important;\
left: 0 !important;\
z-index: 1 !important;\
margin: 0 !important;\
padding: 5px !important;\
background-color: rgba(204, 217, 234, 0.95) !important;\
border: 1px solid grey !important;\
border-left: none !important;\
border-radius: 0 5px 5px 0 !important;\
-moz-transition: margin-left 0.5s !important;\
}\
#categories:not(:hover) {\
margin-left: -55px !important;\
-moz-transition: margin-left 0.5s 200ms !important;\
}\
#categories .category {\
width: 50px !important;\
padding: 0 !important;\
}\
#categories .category image {\
margin: 0 !important;\
margin-left: 8px !important;\
}\
#categories .category[selected]\ {\
border: 1px solid rgb(195, 206, 223) !important;\
border-radius: 5px !important;\
}\
}\
\
\
/* Whole page - Less padding */\
#addons-page {\
padding: 8px !important;\
}\
\
/* Add counter of enabled/disabled add-ons */\
.addon {\
counter-increment: enabled !important;\
}\
.addon[active="false"] {\
counter-increment: disabled !important;\
}\
#categories:not(:-moz-any(\
    [last-selected="category-search"],\
    [last-selected="category-discover"],\
    [last-selected="category-availableUpdates"],\
    [last-selected="category-recentUpdates"]\
  )) + #view-port-container #addon-list::after {\
content: counter(enabled) "/" counter(disabled) !important;\
position: fixed !important;\
left: 46% !important;\
top: 33px !important;\
cursor: default !important;\
}\
\
/* Back & Forward buttons - Make sure that they are displayed */\
#header > .nav-button {\
display: -moz-box !important;\
}\
\
\
/* Tools button - Fix margins */\
#header-utils-btn\
{\
margin: 0 3px !important;\
}\
\
/* Flexible Searchbar, allowing for a less wide window */\
#header-search {\
-moz-box-flex: 1 !important;\
max-width: 20em !important;\
}\
\
/* Add-on detail pages - Remove wasted space */\
#detail-desc-container {\
position: absolute !important;\
}\
#detail-desc-container > vbox:first-child{\
margin-left: 10px !important;\
margin-bottom: 25px !important;\
}\
#detail-icon{\
margin: 0 !important;\
margin-right: -5px !important;\
margin-top: 5px !important;\
}\
.detail-view-container{\
padding: 1px !important;\
padding-right: 11px !important;\
}\
#detail-name-container{\
overflow: visible !important;\
}\
#detail-contributions > hbox{\
-moz-box-orient:vertical!important;\
}\
\
/* Add-on detail pages - Stack tables */\
#detail-grid > rows > row:-moz-any(.detail-row-complex:not([hidden]), .detail-row:not([hidden])[value]),\
#detail-updates-row > hbox > *\
{\
display: inline !important;\
}\
#detail-grid > rows > row:-moz-any(.detail-row-complex:not([hidden]), .detail-row:not([hidden])[value]) > label.detail-row-label{\
width: 100% !important;\
}\
#detail-grid > rows > row > :nth-child(2){\
margin-left: 20px !important;\
}\
#detail-grid > rows > row:-moz-any(.detail-row-complex:not([hidden]), .detail-row:not([hidden])[value]) > label:not(.detail-row-label){\
margin-left: 25px !important;\
}\
#detail-rows > setting {\
width: 100% !important;\
}\
#detail-rows > setting > vbox {\
-moz-box-ordinal-group: 2 !important;\
}\
#detail-rows > setting[collapsed] {\
display:none!important;\
}\
#detail-controls > spacer {\
display: none !important;\
}\
				');
				var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
				var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
				if (!sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
					sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
				}
			}
		};

		SidebarMod.init();
	}
})();
