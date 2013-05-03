// ==UserScript==
// @name           externalAppButtonEx.uc.js
// @namespace      ithinc#mozine.cn
// @description    External Applications button 
// @include        main
// @author         ithinc &  lastdream2013
// @charset        UTF-8
// @version        20130504.1.1.3 delay load exefile, may speedup firefox startup  
// @version        20130414.1.1.0 updated by  lastdream2013 : support submenu
// @version        20130402.1.0.1 modified by lastdream2013
// @version        20091216.1.0.0 Final release
// @version        20091215.0.0.2 Handle toolbar apps and menu apps separately
// @version        20091212.0.0.1 Initial release
// ==/UserScript==

var gExternalAppbuttonEx = {
	autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: false,  //把主菜单下的子目录移动到最下面
	insertafter: 'urlbar-icons',  ////urlbar-icons  status-bar addon-bar searchbar TabsToolbar alltabs-button go-button
      subdirPopupHash: [],
      subdirMenuHash: [],
      toolbar: {
     //在这里定义好主菜单下子目录的名字,以及图标(可定义或留空,好图标不好找....)； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
        subdirs: [
            {name: 'windows工具',  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADvUlEQVQ4jZXUX0wUBBzA8R+JY4czRxzcGWqZD5SgIgoJd0doSoaMKwSXYIqYhAP/gWPDdGlPbllYE9haohAC4/gXjoADNVI4FQyUvxegEHZ3HCogKYvavj2E3ms8fB9/n+338PuJiDh5RedGLNleYF0SW8is2l5g9YrOjRARJxER50XbLlhjztzlQLGVgyU2kossJBdZSCmxkmKwklJqJbVyhMNlNg6V2jhYYuNAsZWYM3dZtO2CVUScRURcvLaeI/L0ACvSe/BJ6yQ1b5CO358y9vQfuv94RnrRMKs+68HveC9+x8yszOhlRXoPkacH8Np6DhFxERFRLNRnE/6FGZ+DHXgnt9LSN4FtfBrL+DQjE9N8ZxwmLf8eG0528dahO7y5vx3flHbCjvewUJ+NiChERFzV4Zm8d6wD78Tb6FJbePBwmiH7XwyN/tfOL2/Rfu8JoxN/0/rbE0w9E1xpf8z6I7dRh2ciIq4iIq6em06xKb2NN+KukZbTyZ17k5i6H9M7/JS7g5NsTLtMn2UK84Nn9FumGLBO8fm5LkL2N+G56ZQDUoaeYP2BW7wec5WVH9fzmr6EZVHF+O0oZX/mTQ5900L7wKSj/knWJxnRJV1DGXrCAblpMwjdZ2JxRC25l+5jHppkaGSKmhtWQj6tQ3/kKlXXLdzoHqe5Y4yvL3bhtbmcd5KacNNmOKAFgYfR7LpK6J4GWrrG+aX9EY1tjzB1jrE5uYGjWW0s1xezPPIiyzbn4as38OrGSnQJjSwIPOyA5q/eR0BMDemnW6m/YX/Rjz9beD+pjtbuccxDf/Jr7xi9g5PszLiOKqSS4B1XmL96nwOa55tAwAdV5Ff0UVDVT0nNfYzNdk6evU3GVzcxmuwYm+3Um+zUNdnwDjOg0pQT/FE983wTHJDCO5Y1kRWoAr/HbVUWr/idJXS7gbBdlZTWDtLY8pDGFjuNt+zklppxX5OHR1AZ66JrUXjHOiCXpVEEfHgJ9zWFKAMK8QgsQrn2B9z9z5N49AoVxvuY2kYprDKj31uFu38+ygADgVHVuCyNckBzF0ewLroazyADKk0ZKl05al05Kp0Bj7fPo1ybjbv/t7j7Z6EMzEUVXIJnkIF10dXMXRzxAlLMUb874rMlB028Ec1uI9qEBrSfXEab2IB2bz2aPbUEJVQTHP8TmvhaNLvr0MQb8dmSwxz1BvvzE3ERN/84Jw+t/SWljtnk5KG1iZt/3POjdRaRl0VELSKLZpl6ZtZZZp6S84yqmNn3/6SYmXEWEad/AVgWg/PjJEAaAAAAAElFTkSuQmCC"},
            {name: '常用工具', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADmklEQVQ4jZXUyU8TaBiA8ZeEhMBhjsZEQqCUsohhXwREoKVDpAlBR1oBkSWyVDA2CJQCLYRAo0ABURCQJSJrtYAKKmLgIi6cTQyiXnSYIRP/hWcO4MhlEj08t/f9Jd/h/URE3BQF9TplsW0noKSZX0lZbNtRFNTrRMRNRMRdWWTbKZhew/xyi/pXWzS+/oD1zTbNb7dp2fxEy+Ynmt9uY32zTePrD9S/2sL8couC6TWURbYdEXEXEfEIKLSiX9hEc/MZ2v4VMgZXOTX8gsyRNXSj6+hG18kcWePU8AsyBlfR9q+gufkM/cImAYVWRMRDRMRTeaGJrOkNUjuXUDuWSe99irZvhYxbz8no3+/Wc7R9K6T3PkXtWCa1c4ms6Q2UF5oQEU8RES9lfgOZY+skt7pIsS+Sdv0R6o7HaLqWSO9eJr17GU3XEuqOx6Rdf0SKfZHkVheZY+so8xsQES8RES//3Aa0faskWGZJst7nRIuL5NZ5TrYtkNK+SEr7IifbFkhunedEi4sk630SLLNo+1bxzz0AKQwWUu1PiDVNEF87RYJ5hkTLLImNcyQ1OUlqcpLYOEeiZZYE8wzxtVPEmiZItT9BYbAcgHLqSbI9JNI4QvTlcWJMd4mtniD26j3iaiaJq5kk9uo9YqsniDHdJfryOJHGEZJsD1Hk1P+A/M7WEV/nIqxkgIiyISIrRoi6NEpU5RjRVeNEV40TVTlG1KVRIitGiCgbIqxkgPg6F35n6w5AZ2qJMc0RqO8iOK+HkPM3CLs4RFjpMOFldwgvu0NY6TBhF4cIOX+D4LweAvVdxJjm8DtT+wPyza4hwjiDKrud7S//oNJ3EVo4QGjRbY4VD3KseJDQotuEFg6g0nftzWS3E2GcwTe75gCUVUN46RT+OhvvPu+iOm0nMMdBoKGboHO9BJ3rJdDQTWCOA9VpO+8+7+KvsxFeOoVv1gHIR1dNePkkCp2V5Y33fPz6jY9//k9fv7G88R6Fzkp4+SQ+uuoDUOYVjpudBBmuofqjmaAcG8GGVkJy2zia387R/HZCctsINrQSlGPbmzFc47jZiU/mlf8gT29t5d9x5lHSOhdRd7hI63CicTwgvceFtncebe886T0uNI4HpHU492Y6F4kzj+L9e9Xu9xPxOBSvzzuiMe56a4x4ayp+MiNH1OV/HYrX530/WncR+U1EDouI9y92eH/XXfY/Jfd91XP/vT+T5/6Ou4i4/QuMxVcZdYKnaAAAAABJRU5ErkJggg==" },
            {name: '网络工具',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADsklEQVQ4jZXUS0wTBhjA8Y+ExMDBZCMqpS2FMh6lUmBTD0v0uMWMg8linMEHIYsHl7BEE2JQeT/EAWGkqQalSDoq70ehvNfW1gryfgghZTOByVqBhW0xGnf57zBcd5yH//H7Jd/h+0REQoyFyoy75Rp/fYWG9+luucZvLFRmiEiIiEioqTjaP+s8iX/1HP7V8wR8Fwn4sni5ls3Ln77+p7VsAr4sAr6L+FfP4189x6zzJKbiaL+IhIqI7DMVqXk+cZwFeyqLg2ksDX/Ms5FPWB49wvLoEZYG01kYSGPensriUDqLg2ks2FN5PnEcU5EaEdknIhJmzFfj8xxjtieFOZuBhf5UFuxpLA6mM9NrYHPFxF9vtnmxbGSqS8+czcBsTwo+zzGM+WpEJExEJLw2T8WK4yhT7XqmOw8z221grtfAnC2V8VY9b1/7efvaz5tXv+Bt1jHdeZipdj0rjqPU5qkQkXARkfDqXCVLI+mMW3U8bU1msl3PVMdhxlt0OJsSWXpcwh/b8yy6S3A0JvC0NZlxq46lkXSqc5VB6PaVKObtBjwPEvBaknjSnMS4VcejBzp+D0zyuCuT1pp4bMZ4frz3EV5LEp4HCczbDdy+EhWEKnIUzHTrcdXH4W6Ix9OYgLshHmfTp/y5vcirXR9b6y52A9OMmLS4G+Jx1ccx062nIkcRhEovK5jsSGTMGIvjjhZXfRxjplgmurLY3fSyNn2fCVsO7odfMlCrwXFHy5gxlsmOREov/wcqvhTJxMMEhms0jNbFMGaMpb9azeqTOnbWXfzqs9PxXQqdt9QMfR/DaF0MwzUaJh4mUHwpMggVZB/Ca4mjv1LNUHU0fbdUOO5/xs6GmwVHJZurPawvdWCr1DBQFc1QdTT9lWq8ljgKsg8FoRsXDuJp0tJXpqK3VInX+hW/vZjk5xkL5rwYeo2fs7PhZcVTja1cycBtNX1lKjxNWm5cOBiErp09gNscQ3exktbrCjae9bHsMdFcpKf5ZhRNeQo8bTlsLPfTlq/AVqaiu1iJ2xzDtbMHgtDV0xE4zVq6SpS03FRgzlVwL1eBtVBJb5WGzspoGq9HYb6moKUgip4yFV0lSpxmLVdPR/wLhX17KuJlW1Us7mYdrh+ScFiScFp0eFqSedKewuO2FFzWZJwWHY+sOtzWJNzNOtqqYsk5FbH17kT2nTmxP/ObLz7YupzxIe9Z4MyJ/ZnvjjZURPaLSKSIqN6zyL3ZUNl7SqF7atjevv+nsL2ZUBEJ+Rs6+oxWuBqWjQAAAABJRU5ErkJggg=="},
            {name: '编辑工具',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADt0lEQVQ4jZXUT0wTBhTH8UdCQvCwxAtD4x8UCypVxIAoilhEMiOJBxKjAQIiBmVIGbbUxtqOyIrWIRTRWFAobeWfUiilojCULR4Gjj+ZqCAXQwygmBg1nr87gOtVD7/Te++TvMN7IiIBCrU+LVJjmovUlPF9Mc0p1Po0EQkQEQmMKDHNZXYPoBmdRDs2xbnxV+jHp9GOTlI6NkXp2BTa0Un049OcG3+FdmwKzegkmd0DRJSY5kQkUEQkSFFsJL1/CJWrl+TmB6S09qFy+Cj942/efPrCm09f0A0MoXL4SGntI7n5ASpXL+n9QyiKjYhIkIhI8IYzBg71PCHxtockuxeVw0divZuZj5853uLjeIuPmY+fSax3o3L4SLJ7Sbzt4VDPEzacMSAiwSIiy8IL9KR2PCLhxj322NzsvdXFTusdJubfk+P0kOP0MPH2PTutd9h7q4s9NjcJN+6R2vGI8AI9IrJMRGTZ+nwdyS19xF9tZpe1jYTau8RZGsl3eZle+MD0wgdOubzEWRpJqL3LLmsb8VebSW7pY32+zg+ty9OSZO8hpqyeHZcdxP/uIt7iYJuxlgrvIBXeQbYZa4m3LNZ2XHYQU1ZPkr2HdXlaPxSWe5Y4aysFDV62X7hJtNFGrLmRrYbrVHQ/pqL7MVsN14k1NxJttLH9wk0KGrzEWVsJyz3rh9ZmFxNjdvJydoGR17OkXmoi2mQjSlfDRfcAF90DROlqiDbZSL3UxMjrWV7OLhBjdrI2u9gPrcksQnm+DufgMO6hf9mstqDUXWNjSSWm9oeY2h+ysaQSpe4ayl+u0P3Pc5yDwyjP17Ems8gPrT5WyGZ9HWEZGn5rv091z19Eqq8QobZgbO3F2NpLhNpCpPoK1p4/KW+7T1iGhs36OlYfK/RDq44UoDQ2EZ5rZGOeAdfgUzqHJjha6aCio5+Kjn6OVjrwDD/HNfiUTScvEJ5rRGlsYtWRAj+0Mj2fLWUOFKfNhJ80oThhILfGiW/kBc9m5nk2M49v5AW5NU4UJwyLPafNbClzsDI93w+tOJxHXFUbUZpqokqrUWqr2FRkJrKwnMiff11MYTmbiswotVVElVYTpakmrqqNFYfz/oeCf0zLfhtrtrHP7kFl97C/yUOKvYuUxk4ONHRwoKGDlMZOUuxd7G9a7Nln9xBrthF6KOfd1xMJWr47LSPkp6x3IQezCDmY+Y3JIuRg5vzy3WkZX482UER+EJFQEVn1nQldmg2UpacUuKQGL+37LQlemgkUkYD/AEq2dU4D+CN7AAAAAElFTkSuQmCC"},
            {name: '图像影音',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADm0lEQVQ4jZXU3U8TVhiA8ZekicGLJSaTcCFqzNA4EzXGkKhZGiLq6gcyFOlkWFtcaKmytVhXAlTLR1kjgwY/Kh91VRxi3Yg4Nxt1mMxNGStYKYNSKiJTUcRtZn/AswvqmixezItfck5yzpOci/eIiCRs3qPfmqktntyu+4Q3kaktnty8R79VRBJERBRbNMZJ9/ku/HeC+HuCXPvlHjd6B/ghEKI7MMiN3gH8PXe5ersf/527+HuC+O8EcZ/vYovGOCkiChGRWao8PZ7L3djc7dibO6hu9eE4/TWfe7/B4fHxxdlO+oai9A1FKT/Rhr25A5u7Hc/lblR5ekRklohI4kb1Php9V7G6zlB2rA3bya+wu89T1dRBWeMZBkfHefHyb+pOX6TU9SVlx9qwus7Q6LvKRvU+RCRRRGR2eraG2rZLmJxNWOpasdS1UnK0eWZ9tJlbgQGqj3vZX+nCVOvm4NEWTM4matsukZ6tQURmi4jMVmbuxt7iw2hvxFDRwBGXl5s9QX4KhKj3XOBIg4fvum8TGAjTcaUbQ3k9Rnsj9hYfyszd8dBa1U5KXefQHnRgdZ7i0dPnPHk2zeNn0zz/4y+m/3zJk6kXPHo6xeOpaWz1HnSWWkpd51ir2hkPpWVsx+zwoi4q58atXiJjvzNyf4LIgwkiDx7FTDByf4LW9kvkGsrQmKoxO7ykZWyPh1YpVRhsJ8nUmrk3NEpoOEooPPZalfUt7Nj3GblFFRhsJ1mlVMVDy9dloLM28P7u/fwcCNEXGqE/FKF/8D9CETq6rrFtr5kPCg6hszawfF1GPLQ0TUm+2cmGnELO+q7QGxwiMBB+rVD4Pk1tnWxSG8k3O1mapoyHUleuIfdADet3FGKwVNM/OMLd3yIx0ZiZff/gCBe/vU569sfkHqghdeWaeGjhstXkFNnZsEvPe9s0tHd+z3B0nOHoQ8Ixw9GHDEfHCYWj7CooIT27gJwiOwuXrY6HUpasQF1cxaYPjazPKUSVW8iV6z8yNDqG90IXDafOcvP2r4TCUcwVTpRZWjaqi1AXV5GyZMW/ocTkRe8+y9JZ0B8+gcF2Ap21jnxTFR+ZKtlrqUF7yEG+qZK8T4+wp8SBvuIY+sPHydJZSF60dOrViMyak7QgLykldWru/MXMTZnx9rzU15o7L3XmzPzFJM1/5+mcpAV5r4ZWISJviUiyiMx7Q8mxuwqJfUqKWDUx9t7/IzF2RyEiCf8AaBijWJqLC6wAAAAASUVORK5CYII="},
            {name: 'separator'},
            {name: '常用目录' , image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADo0lEQVQ4jZXUX0hUaRjH8ScQSlHPsDrnvKfTTCNjiPlnxiCZdGwEExK7kC6iaPcm6KIwcKYk+iPU1lIUtGWbuo3aWlvTjmUUQdCahmFBejai0l2iXZssS5LdbVdiI/juRVN2WRe/q/f9fXjfi+cREZm1J8NacUBzTxx0uPmcHNDcE3syrBUiMktEJGW/5pq4uXIVYw0NPA6HSYTDJCIRnkQiPNmy5V0iERKRCIlwmMfhMGMNDdxcuYr9mmtCRFJERGbvc7i4V1fHkM/HsN+PvWgRt30+hvx+hktKGC4pYcjvZyh5Nuz3M+Tzca+ujn0OFyIyW0Qkda9jHnZtLYNFRQwWFnKjoIBfm5r49+FD3k5P83Z6mr/v3mV02zZuFBQwWFjIYFERdm0tex3zEJFUEZG03Q6LWzU1XF+4kJ/z8kjE47yZmmJ6bIzR1lZ+j8X47/lz3kxNkYjHub54Mf35+dyqqWG3w0JE0kRE0po0i4Hqaq7m5XEpN5fX4+P80dPD6eJiTnm9nPJ6+bG4mKe9vbweH2f08GEu5+YyUF1Nk/YRtF2bS29VFZe9XmIeD69GRoi63dyor+efR4/oyc/nTE4O55Yt49XICBMDA8Tnz6e3qort2twZaKtmcqWykvM5OXS5XEzZNj1VVdxsbOTPO3eIeTz85PHQv2EDU7bNb7EYP7hcXKmsZKtmzkCbNcXFUIiY203Ushg9cYLTpaVcq69ncnCQWzt3cnvXLv568ICnvb2cXb6cTsviYijEZk3NQA2aojsYpMuyOG6afGeatJgm1xsbedbXx0vb5qVtc6+jg2hpKc1K0WlZdAeDNHwMbdIMzpaV0a4UnaZJu1K0GQZ9jY2MX73KkQUL+Nbj4aDTSbOu064UUaU4W1bGJs2YgTZqOqeXLKFN14kaBp1eL780N5Po6+NZfz+HnE7alOK4YdChFFHDoE1/19mo6TPQes1JVyDAMV2nxTBotixe3r/PC9vm2o4dHDEM2pMvPa4UrYbBMV2nKxBgveacgdZlZnMyEKDFMGhVikNOJ99kZ/N1djYHdJ02pegwTaKmyfdK0aoULYbByUCAdZnZH6DUL9OzXhz1+YkHg3QHg8SDQc6UlxMrL6e7ooILoRAXli7lfEUF5yoqPtw56vPzVXrW5PsRmV0zJ3Pt6vSsyTUZWazO+OKTsiYji9XpWc9r5mSufT+0KSKSKSJKROZ9ZlSymyLJpZSSVFOT//2UpCY7KSIy638DQTApm60jPAAAAABJRU5ErkJggg=="},
            {name: 'firefox目录',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADqUlEQVQ4jZXUW0gbVhzH8SMIYgvzGijTLIu2Tjtb4yXqbC0olFKQUkr7UBTEzc3U2BgxiBSUgujEXrBzs1ovVbxk8RJvXe06ZlpNnErUxLsWLU7Ba72MPfTtu4fY6WP78INz+PH/wHn4HyGEcPJQPUiQ3C5bk2h+5pNyu2zNQ/UgQQjhJIQQzhL1o7UrXWPcsq2TbttAbd9AM7FB5uQm2ilHMic30Uw4unTbBrds61zpGkOifrQmhHAWQggXSXopl/qWiNJPoGyyoWyyEam3E9MyyYWOWS50zBJrnOFc+zQxrVNEGyaJ0k9wqW8JSXopQggXIYRwlageEtf7BmW9jfBqK/3Luwyt7hNZP8Z5wzTnDdOc+3WKGP0U3zRNEtUwgbLeRlzvGySqhwghXIUQ4ph36j1iu2YJe2IlpMzMy4VN+ha3CK0cJLrRTnSjnagGG5H1NpR140TUjBH2xEps1yzeqfcQQhxzQCnFxLROoygbJvj+K74u+o3g4ueE/DRA6OMRQh+PoCgfRvHLMCFlQ5wp/QtF2TAxrdN4pxQfgZILiWyyE3zfQtCPf7Ky/56V/fecLjk863qmmd38F/vaPyQ2jBJU9IrIJjveyYWHkFdSAWF145wu6icgrxfryh7WlX0C8rqxru5jXd3nxcw6LaN/M7a6x+8z6wTkvSSsbhyvpIIj0M27KCpG+SrfhL+um4HFHQYWd/DPNmBZ3MGyuENwjp4zOXoGDu7+2T0oKkbxunn3CHQjj+DSEU7m/oE8y4hpbgvTwhZybTOmhXeYFt7hl2VArjU4urktZBltBJeO4HUj7xDyvHaHoJIh/LJf8IW6FdPcNqb5bWTqJl7Pb/N6fht5Vgdfao2Obm4LaZqBoJIhPK/dOQJdzSWwcBB55nOkaS1Y3+5ifbuHVNWIdXkP6/IeMo0RWUabo1vaxfc7PYGFg3hezT2EPBJ0BBSYkal7kH5vwCe5Gt9va5GqmpGmPkWa+hRZhhFZehs+ydV8nlSFT0ozAQVmPBJ0h5D7ZS2Bhf3IM7rx03Tip2nHT2vEX9fNSV2nIznP8Nf14KdpR65uRa7uJLCwH/fL2v8hV7eL6o1T+S2cLTcTUmFGUWkhrMpCeM0gEbVDRNQOEV4zSFiVBUWlhZAKM2fLzZzKb8HtYsbmhxVxOa68nugWp9p0j1fhHpf2cYlX4Rb/w/px5fXED0vrLIT4TAhxQgjh+4k5cTDrLA4+JecD1fXgvR8T14MZZyGE03+JH4zfQFZkowAAAABJRU5ErkJggg==" },
            {name: 'firefox配置文件',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADn0lEQVQ4jZXUbUwUdBzA8R8bG4MXvfIFOZyC98CBQpjIJQjh2QHyMPEm4AGipGzHM+wETjh5GB2jxgiiENBpUHoQteWLIBjCbM2ZLh7UCoU0RCHIJCW0evHtBae39SpefF7+vttv+//+IiIuylRLnN/hyjm/I5WsyeHKOWWqJU5EXEREXP0yrHPpZ/ow949xfGCMssEJLEM3qLh0E+vIqopLN7EM3aBscILjA2OY+8dIP9OHX4Z1TkRcRUTcNOnlGM4NE1llJ7LKzq6KT4ioPE9kjR2d7TN0th50th5213YTWWMnsqabyCo7hnPDaNLLERE3ERF3X2MZcS39hFs6Cbd0stN8mj+f/03jl1ewfjpM18gE++t7WPnrHwZHpwkrPUu4pZO4ln58jWWIiLuIiIc6yUxU/UVCizsILe5gR04z84+X+f3pMx4vP+PR0xWerDxn/vEyFWf7eKOwldDiDqLqL6JOMiMiHiIiHipDEXuqe9HmtrDD1ER8WRszC0urFpeYWfzDYYnb9xcINjWizW1hT3UvKkORM6Tcl0dYaRfBxxp47dA72AevMTm7wOTsIpOzi9x2mJxd5M6D39iWWUfwsQYiys+j3JfnDCniswnJaSfQWE334Hf8NLPA+NQDxqceMj79H1MPmXv0hEBjNWHFH6OIz3aGfGKy2H60ma1JVpLNTahicvl86BpXb911+IVvx3/m6q27pJU1o02rYGuSFW12Gz4xWc6Qtz6ToIwG/BMt7Eo7yfc/3kOhN1H5YQ+XR+9weXSKb8amUETloIotRJNYgn+ihdffbsJbn+kMbdJlEJT+LpoEMwq9ifSSJqbvL3L9h3vUtX/BEUszI9cnUUUX4L//BP6JJ9AkmAk69B6bdBnO0MaIVAJSbKhiClFG5eGzOwvvN4/yQddXWN+/QJb1I7r7rpB1sh3fWDOahFJUMYUEpNjYGJHqDG0IS2bLgVoU+lwU+lxU+nw260wYsuuwtfbSeuFr2uwDpBQ1oo4uxjfWjEKfy5YDtWwIS3aGvLQGAox1qKLzUUXno95bhDquGGVUHpvfyn5JGVOAJr4E33gzquh8Aox1eGkNL0Pu64MTfg08WE2IqRVtzim0eW3szG8ntKCN0KL21RdfuEqb14425xQhplYCD1azfnv8wosTcVunDk/1DNq78Oq2WNbCMyh2fp06PPXF0bqKyCsi4ikiXmvk6Zh1Fcen5Oqoujv2/T/cHTOuIuLyL3Tiaqq+A005AAAAAElFTkSuQmCC" },
            {name: 'separator'},
            {name: 'firefox常用功能',  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADq0lEQVQ4jZXUW0wTZhTA8UNCYuBhiQmZNUwiUfF+t1wLvUFbWwqFVi4tK0ipQItFXKGFQEEMZE6iomLIyB7MDNFJjGwMMYQsJpvZ1MzFyECzzG0uQZoo2abP/z2I6+t4+D98D+eXnIfziYjEpas0hTka3UKOVs+K0ugW0lWaQhGJExGJz1RrFk4MXODyzVtcGZ9idOI21yanGZua4cZyY1MzXJucZnTiNlfGp7h88xYnBi6QqdYsiEi8iMiqjFw1JwdHaAh24gtFCHT00tTeQ1O4m0BH79t3uJum9h4CHb34QhEagp2cHBwhI1eNiKwSEUlQZqsI95/FE2jF2xLG09zKwKVPefholqWlv3j5aokHPz2if3AIT3Mr3pYQnkAr4f6zKLNViEiCiEji/swsjkf6cDcGcHr9XL1xk79fv2H+6S+MjU8wNj7B7Nw8/7x+w/Xxr3B6/bgbAxyP9LE/MwsRSRQRSdyjzMAX6sLhrqPn1AAvXy3x+dXr2JzVlLoOU+o6jK2ymv6BcywuRjl9fgiH24Mv1MUeZUYM2rXvAJ5AEIujkjvffsfdH+5jcVRg/7CW0qpayqq9OD2NlLk9lLpqKHQ4KXHW4AkE2bXvQAzavnsvrvqj5FtLmJ2b59LIZxhLyiitOoy1vIrf/njO78//5PzwCHX+ZqrqGjDby3HVH2X77r0xaMuOnRyqrkNtNHPv/gMuDo9QUFiCtcyFocjO3e/v4azxojcXk2+x0fvxabQmK4eq69iyY2cMStu6DVulm2ydgdGrXzB5exqN0YKp5BDag1YCwTZyDSbURgttnREePX5Mjt6IrdJN2tZtMWhD2mYsjkqyNHpq6/3c//EhrR1dqI0WtAetVB9p4JMzg8x8c4e5J08ZGh4hI0+HxVHJhrTNMSh14yZMNgc5OgPKHDXdvX38/OQJp86co7i8AlW+kSxtARl5OpTZeW9TaTDZHKRu3BSD1q1PxWyvQJVvIkdvRJmrobbex5dfT/Lrs2csRqOxFqO8WIySnqfDbK9g3frUGJSckkJZjRdDUSnGYjumYgd6czFaUyFakxWtyYrGWEiewUxugYm8AhNqo5myGi/JKSn/QQmK5OTFonIXR1pCNATb8bV14QtF8IciNIW78YcjNLZ2cuSjdrzHQtQ1B/Eea6Oo3IUiOTn67kRWrU5Kcq1RKKJr1q5lJb2vULxYnZTkene08SLynogoROSDFaZYno2X5U8pfllNWN73/5SwPBMvInH/AlIIOOfCXNavAAAAAElFTkSuQmCC"},
            {name: 'about', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADe0lEQVQ4jZXUb0gUZhzA8Z8giAYKvQiLRWh2eDPNhKvAU8/TS+/yTwqJVJL4h5XKUMQdp3TzTwQqipDhG9EIK2aOxpxjbKDeeaemnt5dFiuRrcI7PXVbo6L25rsXnrs3vZgvPvA8DzxfeF78HhGRoOOVAzknqu56E6uH2IsTVXe9xysHckQkSEQkOOHqoLdsyIlpwkPjpIfrFi9m6zottnVa7Ru02jdosa1jtq5z3eKlcdKDacJD2ZCThKuDXhEJFhEJia/op/jBKrp2J1mdLvTdbs71PCHn1jK5vU/J7X1Kzq1lzvU8Qd/tJqvTha7dSfGDVeIr+hGREBGR0LjSPgruPCejzYHu5iJZ7U6yO50YulwYut07ulxkdzrJaneiu7lIRpuDgjvPiSvtQ0RCRUTClBd7yOt9RlrjHFrzPJktDnRtDjJbF9A2z6NtnifdPIfm+mMymx1ozfOkNc6R1/sM5cUeRCRMRCRMcaEDfYcbdf00acZZUr6aQd0wTfbXs4w+9rL15iO/b7yj69sVkuttpBlnUddPo+9wo7jQEQjFnL9BZssSZ2qsqKrG+aJnkb7RVSyuDXx/fcSz/QHPHx/Y+vsfmvrdnKqe4EyNlcyWJWLO3wiEog1mNCYHqsoJTpX/zMuN97zefM9v6+9YWXvLytpbXvj9YH9NUulPqCon0JgcRBvMgdARnZHkujnii8eo6ZhhaeVPll74rbzZ4d/P/7pNWaud+OIxkuvmOKIzBkKH02o5fW0GZf4jZlyb2J2b2N1bnzTt2mLa5UOZ/4jT12Y4nFYbCB1KrkJVbkOhv8+o5SWTCz4mHTssfrv7yQUfY9ZXKPT3UZXbOJRcFQhFqipIKpki5uw9Cqu/40frK+aWtz/pl5k1ir78npiz90gqmSJSVREIHUgsIfGyBYXhIUczBonW9BGl6SU6/TbRWr/02ztnmj6OagdQGB6SeNnCgcSSQGh/XBEnr4yjzB0hNneE2LxhlPnDfF7wDXGFw8QV7qyV+cPE5g0TmzuCMneEk1fG2R9X9F8oNOJY/kZC8SDqWgvqOgspDVZSjVNoTDa0TXa0TXY0JhupxilSGqyo6yyoay0kFA8ScSzPtzsiIfsOpl4Kj9b7IqIM7EV4lGF938HUS7tDGywi4SISKSKf7VGk/26w+D+lYH811P/e/yPUfydYRIL+BSkIj6JbQMVJAAAAAElFTkSuQmCC" },
        ],
        	
        //1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)； 
        //2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
        //3. 这里定义的可以重复. 例如IE浏览器我想出现在windows工具下面, 又想出现在子菜单下面,   那么就定义二次:
        //    {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: 'windows工具' },
        //	  {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'] },
        //    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
        apps: [
       {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: 'windows工具' },
            {name: '记事本', path: 'C:\\Windows\\notepad.exe', subdir: 'windows工具'},
            {name: '计算器', path: 'C:\\Windows\\System32\\calc.exe', subdir: 'windows工具'},
            {name: '命令行', path: 'C:\\WINDOWS\\system32\\cmd.exe',  subdir: 'windows工具'},
/*         
            {name: 'HyperSnap 7', path: 'E:\\software\\HyperSnap 7\\HprSnap7.exe',  subdir: '常用工具'},
            {name: 'Photoshop', path: 'E:\\software\\Photoshop7.0\\Photoshop.exe', subdir: '常用工具'},
            {name: 'separator', subdir: '常用工具'},
            {name: 'Total Commander', path: 'E:\\software\\Total Commander\\TOTALCMD.EXE', subdir: '常用工具' },
            {name: 'Everything', path: 'E:\\software\\Everything\\Everything.exe', subdir: '常用工具' },
            {name: 'HostsX', path: 'E:\\software\\HostsX\\HostsX.exe', subdir: '常用工具'},
            {name: 'Lingoes', path: 'E:\\software\\Lingoes\\Lingoes.exe', subdir: '常用工具'},
            {name: 'PDFXCview', path: 'E:\\software\\PDF Viewer\\PDFXCview.exe', subdir: '常用工具'},

            {name: 'Goagent', path: 'E:\\software\\ProxyTools\\goagent\\local\\goagent.exe', subdir: '网络工具'},
            {name: 'opera', path: 'E:\\software\\Opera\\opera.exe', args: ['%u'],  subdir: '网络工具'},
            {name: 'Becky!', path: 'E:\\software\\Becky!\\B2.exe', subdir: '网络工具'},
            {name: 'QQ', path: 'E:\\software\\QQ2013\\Bin\\QQ.exe', subdir: '网络工具'},
            {name: 'AliIM', path: 'E:\\software\\AliWangWang\\AliIM.exe', subdir: '网络工具'},
            {name: 'Fetion', path: 'E:\\software\\Fetion2012\\Fetion.exe', subdir: '网络工具'},
            {name: 'Thunder', path: 'E:\\software\\Thunder7.2.11.3788JayXon\\Program\\Thunder.exe', subdir: '网络工具'},

            {name: 'foobar2000', path: 'E:\\software\\Foobar2000\\foobar2000.exe', subdir:  '图像影音'},
            {name: 'PotPlayer', path: 'E:\\software\\PotPlayer\\PotPlayerMini.exe', subdir:  '图像影音'},
            {name: 'Imagine', path: 'E:\\software\\Imagine\\Imagine.exe', subdir:  '图像影音'},
            {name: 'i_view32', path: 'E:\\software\\IrfanView\\i_view32.exe', subdir:  '图像影音'},
            {name: 'Inpaint.exe', path: 'E:\\software\\Inpaint\\Inpaint.exe',  subdir: '图像影音'},
            {name: 'MangaMeeya', path: 'E:\\software\\MangaMeeya\\MangaMeeya.exe',  subdir: '图像影音'},
            {name: 'openCanvas', path: 'E:\\software\\openCanvas\\oC55.chs.exe',  subdir: '图像影音'},
            
            {name: 'EmEditor', path: 'E:\\software\\EmEditor\\EmEditor.exe', subdir: '编辑工具'},
            {name: 'SublimeText2', path: 'E:\\software\\SublimeText2\\SublimeText.exe',  subdir: '编辑工具'},
            {name: 'AkelPad', path: 'E:\\software\\AkelPad\\AkelPad.exe',  subdir: '编辑工具'},
            {name: 'SourceInsight', path: 'E:\\software\\SourceInsight\\Insight3.exe',  subdir: '编辑工具'},
            {name: 'WinHex', path: 'E:\\software\\WinHex\\WinHex.exe',  subdir: '编辑工具'}, 

            {name: 'Software', path: 'E:\\software', subdir:'常用目录'}, 
            {name: 'Downloads', path: 'I:\\Downloads', subdir:'常用目录'}, 
            {name: 'TDDownloads', path: 'I:\\TDDownload', subdir:'常用目录'}, 
*/
            {name: 'profile', path: '\\', subdir:'firefox目录'}, 
            {name: 'chrome', path: '\\chrome', subdir:'firefox目录'}, 
            {name: 'CSS', path: '\\chrome\\CSS',  subdir:'firefox目录'}, 
            {name: 'SubScript', path: '\\chrome\\SubScript',  subdir:'firefox目录'}, 
            {name: 'UserScriptLoader', path: '\\chrome\\UserScriptLoader',  subdir:'firefox目录'}, 

            {name: 'userChrome.css', path: '\\chrome\\userChrome.css',  subdir:'firefox配置文件'},
            {name: 'userContent.css', path: '\\chrome\\userContent.css',  subdir:'firefox配置文件'},
            {name: 'prefs.js', path: '\\prefs.js',  subdir:'firefox配置文件'},
            {name: 'user.js', path: '\\user.js',  subdir:'firefox配置文件'},
         
           // 建议把要放在子目录下的程序定义在上面, 下面的定义放在主菜单下的最常用的程序
/*            {name: 'separator'},
            {name: 'HyperSnap 7', path: 'E:\\software\\HyperSnap 7\\HprSnap7.exe'},
            {name: 'Photoshop', path: 'E:\\software\\Photoshop7.0\\Photoshop.exe'},
            {name: 'Everything', path: 'E:\\software\\Everything\\Everything.exe'},
            {name: 'HostsX', path: 'E:\\software\\HostsX\\HostsX.exe'},
            {name: 'separator'},
            {name: 'Goagent', path: 'E:\\software\\ProxyTools\\goagent\\local\\goagent.exe'},
            {name: 'Thunder', path: 'E:\\software\\Thunder7.2.11.3788JayXon\\Program\\Thunder.exe'},
            {name: 'EmEditor', path: 'E:\\software\\EmEditor\\EmEditor.exe'},
            {name: 'SourceInsight', path: 'E:\\software\\SourceInsight\\Insight3.exe'},
            {name: 'separator'},
            {name: 'Software', path: 'E:\\software'}, 
*/ 
            {name: 'chrome', path: '\\chrome'}, 
        ],
        //   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
        //    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
        configs: [
           {name: 'separator'},
           {name: 'about:firefox', command: "openAboutDialog();", subdir: 'about' },
           {name: 'about:about', command: "getBrowser().selectedTab = getBrowser().addTab ('about:about')", subdir: 'about' },
           {name: 'about:addons', command: "getBrowser().selectedTab = getBrowser().addTab ('about:addons')", subdir: 'about' },
           {name: 'about:cache', command: "getBrowser().selectedTab = getBrowser().addTab ('about:cache')", subdir: 'about' },
           {name: 'about:config', command: "getBrowser().selectedTab = getBrowser().addTab ('about:config')", subdir: 'about' },
           {name: 'about:memory', command: "getBrowser().selectedTab = getBrowser().addTab ('about:memory')", subdir: 'about' },
           {name: 'about:mozilla', command: "getBrowser().selectedTab = getBrowser().addTab ('about:mozilla')", subdir: 'about' },
           {name: 'about:plugins', command: "getBrowser().selectedTab = getBrowser().addTab ('about:plugins')", subdir: 'about' },
           {name: 'about:robots', command: "getBrowser().selectedTab = getBrowser().addTab ('about:robots')", subdir: 'about' },
           {name: 'about:support', command: "getBrowser().selectedTab = getBrowser().addTab ('about:support')", subdir: 'about' },
            

           {name: '选项', command: "openPreferences();", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADE0lEQVQ4jaXMTUhqaQDG8RfufmZ2bYpDSYkfCzlConCyz4XaIUQPBKVtMsjVDEjQIsl4tbA61GRGC4PatIo+IMvoSOmx9JxFQYtcFCG0nbu9cN/0mUXM4sJlYJgH/ruHHyGEEEmSviwuLv7yX5Ik6QshhJBIJGI5OjrSVVX9WqlU/lJV9eu/9c/n+PhYj0QiFiKK4lq9Xsfa2hoSiQQopaCUYnl5GclkEpRSpFIppFIpUEqRSCSwurqKer0OURTXSDAYlHVdb5pMpu+dnZ0tk8nU6u7ubrW1tbU4jmtxHNdqb29vdXR0tCwWS6urq6tlMpm+a5rWDAaDMgkEArKu63C73WxoaAgOhwOCIIBSitnZWWxubmJqagozMzOwWCwYGBhAf38/0zQNgUBAJn6/X9Y0DYODg8xut2N+fh5LS0t4enrCw8MDKpUKyuUy0uk0KKXweDzo6+tjuq7/CLjdbuZyuZBIJPDx8YGXlxdks1nEYjHs7+/j7e0Nl5eX4Hkevb29rFarwe/3y2RsbEzWdR08z7OFhQU8Pj7i+fkZk5OT4DgORqMRVqsVlFJkMhns7OwgHo+zUqn0CYiiKN/f38PlcrHp6WlomoatrS1wHIdcLgdN0zAyMgJZlvH6+or393ecnJywWq0GURQ/gUqlAqfTydbX13F7e4tYLIaenh5omoZGo4F4PI5yuYxms4m9vT2Mj4+zarUKn88nE5/PJ9/d3cHhcLCJiQmoqorDw0MYjUZIkoRoNIq5uTk0Gg3kcjkIgoBwOMxKpdIn4PV610ulEmw2GwuFQkgmk6hWq9jd3YXT6YTBYMDKygpubm4QDochSRJOT0+Zoijwer3rxOPx/KmqanN4ePibwWBgoVCIbWxssIODA3Z2dsZkWWbRaJTJsszS6TRzuVzMarV+U1W1OTo6ukkEQfg9n8+jUCigUCigWCzi/Pwc+XweiqLg+voaiqLg6uoKxWIRiqLg4uIC+XwegiD8QQghv5rN5pjdbs/yPJ+x2WzbPM9v8zy/bbPZflbGbrdnzWZzjBDyG/m/+xsCyiIj0Yng5AAAAABJRU5ErkJggg==", subdir: 'firefox常用功能' },
           {name: '书签管理', command: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');", image: "chrome://browser/skin/places/allBookmarks.png", subdir: 'firefox常用功能' },
           {name: '历史', command: "PlacesCommandHook.showPlacesOrganizer('History');",  image: "chrome://browser/content/abouthome/history.png", subdir: 'firefox常用功能' },
           {name: 'separator', subdir: 'firefox常用功能' },
           {name: '重启', command: "Application.restart();", subdir: 'firefox常用功能' },

           // 建议把要放在子目录下的功能按钮,定义在上面, 下面的定义放在主菜单下的最常用的功能按钮,
           {name: '下载管理', command: "BrowserDownloadsUI();", image: "chrome://browser/skin/places/downloads.png" },
           {name: '附加组件', command: "getBrowser().selectedTab = getBrowser().addTab ('about:addons')", image: "chrome://mozapps/skin/extensions/extensionGeneric-16.png"},
           {name: 'about:config', command: "getBrowser().selectedTab = getBrowser().addTab ('about:config')", image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABxElEQVQ4jZXQzYsScRzH8d/f16lTFCwRdOoSUYddtlrUaXTVEdR1xqfysLtUrC2EujNjbplPjIGtJIZB6YLMjqu105/w7tQhMB8+99f7C18hVpiiKGiaRjqdJplMsor5B6dSKWzbxnVdVFVdL6CqKuPxmMlkgmmaxOPx9QKapmHbNt1uF0VREEKISCRCOBxmd3d3eSyRSDAcDmk2m4RCIYLBIPl8nsFggCzLiwOyLBOLxej3+7TbbSqVCuVymVqtRqPRQJKk+QE5bSLnPhGNRrEsi06ng2VZtFot6vU61WoVn883Hz/TDLLmhOSJQ/j1N3q9HqVSiUAggCzLSJKE1+udjyXNIKs7VLq/KZ+5hI/HbGd6+P3+5c/yqQYp3eHdmcvL6pT900sK7V94Ds656/+4OOBN6CSLDuXPLocfpqjFC56bE45bP9nKjbjjNf8f2Eno7BUcjI7L4fspe4ULMrrDm8aMzRcjbnuMxde3ckP0zhX7p5fE3tqkTxzy9RmPsiM2dpZgIYS4r32n0L4iY0xIFh2O6jMeZkfceroCFkKIe4qF5+Cco9qMV9UZD1I/uPl4Rfx3G7LFdd9Xrj35wo3t9fAfyK1fDftrXK0AAAAASUVORK5CYII="},
		   {name: '错误控制台', command: "toJavaScriptConsole();", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADbklEQVQ4jZXUS09TCRTA8UPShMBi1i7mQ7hhNcQMPmaiqVFDDDHER4ghWmxa+6BXevuilIulra0tfV36flFoeYmYGF3wCQQLOt+AGb/EfxaC3erivzy/5CzOEREZmLHYjLZZ5dTmesEvNauczlhsRhEZEBExWByzp7tv3/HpqMfh52MOeyccHX+hd/KV3sk/Z33l6PgLh70TDj8f8+mox+7bd1gcs6ciYhARGTTbHXw8OKCx3qXV2aS9uc3G9i6dnTd0d/fo7u7R2XnDxvYu7c1tWp1NGutdPh4cYLY7EJFBEZEhk/U5++8/UG60qLba1Nc7NDe+o2vdLda6W7Q6mzQ3utTXO1RbbcqNFvvvP2CyPkdEhkREhqdnzGzt7ZMtVdCrdYr1JqVGi0qrTXVtneraOpVWm1KjRbHeRK/WyZYqbO3tMz1jRkSGRUSGp56YaG/tkMjqpPQimUKZXKlKvlxDr9TRK3Xy5Rq5UpVMoUxKL5LI6rS3dph6YupDDx9PU2tvEI6niKUyxNM5ElmdZG6VVL5AKl8gmVslkdWJp3PEUhnC8RS19gYPH0/3oclHU5TqTRbCMbRYgnA8SeT1CtFkmlgqQyyVIZpME3m9QjieRIslWAjHKNWbTD6a6kMT9x+wUqqgLmj4tWWC4SihyCsWo3G0WAItlmAxGicUeUUwHMWvLaMuaKyUKkzcf9CHxu9NEknrOD0B5gIh1KCGN/QSv7ZMYClCYCmCX1vGG3qJGtSYC4RwegJE0jrj9yb70O27EyzG01gVFYfqx+UL8iIQwh3UUBeWUBeWcAc1XgRCuHxBHKofq6KyGE9z++5EHzLeGWd+OcEzh4JVUbG7fTg9gR/gOeD0BLC7fVgVlWcOhfnlBMY7433o+s1b+JeiPLXYMTsUrC439jkvTtXHrMfPrMePU/Vhn/NidbkxOxSeWuz4l6Jcv3mrD129YWQ+Esdkc2J2KlgVN3a3B6fqw+UN4PIGvkNuD1bFjdmpYLI5mY/EuXrD+AMaunTtr//m/EGS+QLpfIHsaolcsYJerlGo1ClU6ujlGrlihexqiXS+QDJfYM4f5NK1v7+dn8jgxZGRydE/x76Njl1hdOzyT3aFP8Yu/3txZGTy/GgNIvKbiFwQkd9/sQtnswY5e0qGM3XobN+faehsxiAiA/8DDnCW2sYeE5QAAAAASUVORK5CYII=" },
		   
		],
	},
	_externalAppPopup : null,
	_isready : false,
	init : function () {
		this.handleRelativePath(this.toolbar.apps);
		var navBar = document.getElementById(this.insertafter);
		if (!navBar)
			return;

		ExternalAppBtn = document.createElement("toolbarbutton");
		ExternalAppBtn.setAttribute("id", "ExternalAppBtn-btn");
		ExternalAppBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		ExternalAppBtn.setAttribute("label", "扩展程序按钮");
		ExternalAppBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");

		ExternalAppBtn.setAttribute("tooltiptext", "扩展程序按钮,可以自定义扩展程序和功能");
		ExternalAppBtn.setAttribute("type", "menu");
		ExternalAppBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADVUlEQVQ4jXWTW0xTBwCGT3xYzPa2bA/bmw/L4mUuGiGZGVAXSuu4pI1DgUJpUaQUUwdUkHOwHIqVMV2LB+wWWGm1FRWstCilFOlaS1uhdiBiEKhAIjertOkWB5Kxf28mGvme/+/t/whiE8qPZ39SVHKMrdEwxY2NTRyapj/cbPsW7e1tSVf02uZAoH8sHA692th4hfn5Z6+vGAz3FLXVYlpNf7ypXEVVkp03fl6LhXvw36oDqzE7Vl74sRIJIxpbw/XO2xAKi9zWa9bP33W3HBUflZOV+esP7ysx/4jE7KgcsyMUhvpJ1NQ3QKbsA6UJIF3YBPahsj+LC05++cYWiY7EZWbyIjUUB25LLoYHchH0VWJyjMSMvwFa/SWkSruQKLQhVdIBVuYFJHAk1u3bEz4jCIIgUtIyWni8FJyticf9vu/h92VgKEhj/KEGI14DjL0DaLg6gppWJyitGQdyddjPLV9L5mTlELIi0Rcc7sGlg/x4MEwcQn4hpsbEmHxKYnauFU5PFxStc9gjiuJT9gTSZA58ndGKeHYZuKmH1YQgK6vgAIeFZMFOKHVJCE7+gqlwByYW2jE42gZr/02oLq6AXxDDN5lTEFEW7PjuAuJY+WBzUzsJPv8HeVp2CriyvVDekeHSxEncXKXge92GgZEOmEw6WPVBXNYGcdlkx+laHb6KO4VvWXykp6ebCUWtQlx2TgKeKhGyHgHybQlgZiTojlTD4f8J057reHzNhcCvbgzrnKjLb0LyvizwMo6Aoig9QZLkbuMfLdHyTjF+7BVC2nMIqns5sIyS8NmlWNZV4WWdBksVDJZ/a4ZNroCysBTWLgsMLToBwRKxtv7ezZhvhQyo6JKgxHwYKlshbthOYM4iQYwuREwqw3KRFPONFfCepjDt8SIajTjf3Js+T+72zNgetQzXI5vZD6FiG5hTO/FUdxzhcyVYKC3EYmM5FpuViHTfwb/RaMztdie+dUVTh2nH9PLE6JOlAIzGM1ALEuAtzsFCfRWea5X4W88A9j6sh0Lo7baUvrcFdZN6n3fI5fwnurjx19gDrLucgN0B9N0FBn144RlcsBuNJE3TH2waVF5e3kd1dHVar9nMjLtctnGH4+6w+ZbVqtVWq+TyXe/u/wc9vB58jJA72wAAAABJRU5ErkJggg==)";
		navBar.insertBefore(ExternalAppBtn, navBar.firstChild);

		var ExternalAppPopup = document.createElement('menupopup');
		ExternalAppPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalAppbuttonEx.onpopupshowing();');
		this._externalAppPopup = ExternalAppPopup;
		ExternalAppBtn.appendChild(ExternalAppPopup);
		setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
			gExternalAppbuttonEx.loadSubMenu();
		}, 2500);
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
					'\
					#ExternalAppBtn-btn {\
					-moz-appearance: none !important;\
					border-style: none !important;\
					border-radius: 0 !important;\
					padding: 0 2px !important;\
					margin: 0 !important;\
					background: transparent !important;\
					box-shadow: none !important;\
					-moz-box-align: center !important;\
					-moz-box-pack: center !important;\
					min-width: 18px !important;\
					min-height: 18px !important;\
					}\
					#ExternalAppBtn-btn > .toolbarbutton-icon {\
						max-width: 18px !important;\
					    padding: 0 !important;\
					    margin: 0 !important;\
					}\
					#ExternalAppBtn-btn dropmarker{display: none !important;}\
							    ') + '"'), document.documentElement);
	},
	loadSubMenu : function () {
		if (this._isready)
			return;
		if (this._externalAppPopup == null)
			return;
		var ExternalAppPopup = this._externalAppPopup;
		for (var i = 0; i < this.toolbar.subdirs.length; i++) {
			if (this.toolbar.subdirs[i].name == 'separator') {
				ExternalAppPopup.appendChild(document.createElement('menuseparator'));
			} else {
				var subDirItem = ExternalAppPopup.appendChild(document.createElement('menu'));
				var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
				subDirItem.setAttribute('class', 'menu-iconic');
				subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
				subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
				gExternalAppbuttonEx.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
				gExternalAppbuttonEx.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
			}
		}

		for (var i = 0; i < this.toolbar.apps.length; i++) {
			var appsItems;
			if (this.toolbar.apps[i].name == 'separator') {
				appsItems = document.createElement('menuseparator');
			} else {
				appsItems = document.createElement('menuitem');
				appsItems.setAttribute('class', 'menuitem-iconic');
				appsItems.setAttribute('label', this.toolbar.apps[i].name);
				appsItems.setAttribute('image', 'moz-icon:file://' + this.toolbar.apps[i].path + '?size=16;');
				appsItems.setAttribute('oncommand', "gExternalAppbuttonEx.exec(this.path, this.args);");
				appsItems.setAttribute('tooltiptext', this.toolbar.apps[i].name);
				appsItems.path = this.toolbar.apps[i].path;
				appsItems.args = this.toolbar.apps[i].args;
			}
			if (this.toolbar.apps[i].subdir && gExternalAppbuttonEx.subdirPopupHash[this.toolbar.apps[i].subdir])
				gExternalAppbuttonEx.subdirPopupHash[this.toolbar.apps[i].subdir].appendChild(appsItems);
			else
				ExternalAppPopup.appendChild(appsItems);
		}

		for (var i = 0; i < this.toolbar.configs.length; i++) {
			var configItems;
			if (this.toolbar.configs[i].name == 'separator') {
				configItems = document.createElement('menuseparator');
			} else {
				configItems = ExternalAppPopup.appendChild(document.createElement('menuitem'));
				configItems.setAttribute('class', 'menuitem-iconic');
				configItems.setAttribute('label', this.toolbar.configs[i].name);
				configItems.setAttribute('image', this.toolbar.configs[i].image);
				configItems.setAttribute('oncommand', this.toolbar.configs[i].command);
				configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
			}
			if (this.toolbar.configs[i].subdir && gExternalAppbuttonEx.subdirPopupHash[this.toolbar.configs[i].subdir])
				gExternalAppbuttonEx.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
			else
				ExternalAppPopup.appendChild(configItems);
		}

		if (this.autohideEmptySubDirs) {
			for (let[name, popup]in Iterator(gExternalAppbuttonEx.subdirPopupHash)) {
				if (popup.hasChildNodes()) {
					continue;
				} else {
					gExternalAppbuttonEx.subdirMenuHash[name].setAttribute("hidden", "true");
				}
			}
		}

		if (this.moveSubDirstoBottom) {
			let i = ExternalAppPopup.childNodes.length;
			while (ExternalAppPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0) {
				ExternalAppPopup.appendChild(ExternalAppPopup.firstChild);
			}
		}
		this._isready = true;
	},
	onpopupshowing : function () {
		if (!this._isready)
			this.loadSubMenu();
	},

	handleRelativePath : function (apps) {
		for (var i = 0; i < apps.length; i++) {
			if (apps[i].path) {
				apps[i].path = apps[i].path.replace(/\//g, '\\').toLocaleLowerCase();
				var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;
				if (/^(\\)/.test(apps[i].path)) {
					apps[i].path = ffdir + apps[i].path;
				}
			}
		}
	},

	exec : function (path, args) {
		args = args || [];
		var args_t = args.slice(0);
		for (var i = 0; i < args_t.length; i++) {
			args_t[i] = args_t[i].replace(/%u/g, gBrowser.currentURI.spec);
		}

		var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		file.initWithPath(path);
		if (!file.exists()) {
			Cu.reportError('File Not Found: ' + path);
			return;
		}

		if (!file.isExecutable()) {
			file.launch();
		} else {
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			process.init(file);
			process.run(false, args_t, args_t.length);
		}
	},
};
    gExternalAppbuttonEx.init();
