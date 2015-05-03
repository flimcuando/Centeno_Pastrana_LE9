XctMenu = {};
XctMenu.sdata = {
	stylePath : window.location.protocol
			+ "//www.honeybuy.com/style/css/lang-v1.css",
	extensionUrl : window.location.protocol
			+ "//i.xingcloud.com/proxy/language_selector_ex.js",
	selectors : [ {
		url : "http://www.honeybuy.com",
		code : "en",
		name : "English"
	}, {
		url : "http://de.honeybuy.com",
		code : "de",
		name : "Deutsch"
	}, {
		url : "http://pt.honeybuy.com",
		code : "pt",
		name : "Portugu\u00eas"
	}, {
		url : "http://ru.honeybuy.com",
		code : "ru",
		name : "P\u0443\u0441\u0441\u043a\u0438\u0439"
	} ],
	useDefaultStyle : true,
	originalLang : "en",
	originalUrl : "http://www.honeybuy.com"
};
(function() {
	var i = window.DomReady = {};
	var h = navigator.userAgent.toLowerCase();
	var c = {
		version : (h.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
		safari : /webkit/.test(h),
		opera : /opera/.test(h),
		msie : (/msie/.test(h)) && (!/opera/.test(h)),
		mozilla : (/mozilla/.test(h)) && (!/(compatible|webkit)/.test(h))
	};
	var d = false;
	var e = false;
	var g = [];
	function a() {
		if (!e) {
			e = true;
			if (g) {
				for ( var j = 0; j < g.length; j++) {
					g[j].call(window, [])
				}
				g = []
			}
		}
	}
	function f(j) {
		var k = window.onload;
		if (typeof window.onload != "function") {
			window.onload = j
		} else {
			window.onload = function() {
				if (k) {
					k()
				}
				j()
			}
		}
	}
	function b() {
		if (d) {
			return
		}
		d = true;
		if (document.addEventListener && !c.opera) {
			document.addEventListener("DOMContentLoaded", a, false)
		}
		if (c.msie && window == top) {
			(function() {
				if (e) {
					return
				}
				try {
					document.documentElement.doScroll("left")
				} catch (k) {
					setTimeout(arguments.callee, 0);
					return
				}
				a()
			})()
		}
		if (c.opera) {
			document.addEventListener("DOMContentLoaded", function() {
				if (e) {
					return
				}
				for ( var k = 0; k < document.styleSheets.length; k++) {
					if (document.styleSheets[k].disabled) {
						setTimeout(arguments.callee, 0);
						return
					}
				}
				a()
			}, false)
		}
		if (c.safari) {
			var j;
			(function() {
				if (e) {
					return
				}
				if (document.readyState != "loaded"
						&& document.readyState != "complete") {
					setTimeout(arguments.callee, 0);
					return
				}
				if (j === undefined) {
					var k = document.getElementsByTagName("link");
					for ( var l = 0; l < k.length; l++) {
						if (k[l].getAttribute("rel") == "stylesheet") {
							j++
						}
					}
					var m = document.getElementsByTagName("style");
					j += m.length
				}
				if (document.styleSheets.length != j) {
					setTimeout(arguments.callee, 0);
					return
				}
				a()
			})()
		}
		f(a)
	}
	i.ready = function(k, j) {
		b();
		if (e) {
			k.call(window, [])
		} else {
			g.push(function() {
				return k.call(window, [])
			})
		}
	};
	b()
})();
String.prototype.trim = function() {
	var b = this, b = b.replace(/^\s+/, "");
	for ( var a = b.length - 1; a >= 0; a--) {
		if (/\S/.test(b.charAt(a))) {
			b = b.substring(0, a + 1);
			break
		}
	}
	return b
};
var XctUtil = {
	bindEvent : function(a, c, b) {
		if (a.addEventListener) {
			a.addEventListener(c, b, false)
		} else {
			a.attachEvent("on" + c, b)
		}
	},
	getElementsByClassName : function(a, b) {
		if (a.getElementsByClassName) {
			return a.getElementsByClassName(b)
		} else {
			return (function c(m, k) {
				if (k == null) {
					k = document
				}
				var h = [], g = k.getElementsByTagName("*"), d = g.length, l = new RegExp(
						"(^|\\s)" + m + "(\\s|$)"), f, e;
				for (f = 0, e = 0; f < d; f++) {
					if (l.test(g[f].className)) {
						h[e] = g[f];
						e++
					}
				}
				return h
			})(b, a)
		}
	},
	hasClass : function(a, b) {
		return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
	},
	addClass : function(a, b) {
		if (!this.hasClass(a, b)) {
			a.className = a.className.trim() + " " + b
		}
	},
	removeClass : function(a, c) {
		if (this.hasClass(a, c)) {
			var b = new RegExp("(\\s|^)" + c + "(\\s|$)");
			a.className = a.className.replace(b, " ")
		}
	},
	firstElementChild : function(c) {
		if (c.firstElementChild) {
			return c.firstElementChild
		} else {
			var b = c.children;
			for ( var a = 0; a < b.length; a++) {
				if (b[a].nodeType == 1) {
					return b[a]
				}
			}
		}
	},
	preventDefault : function(a) {
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			a.returnValue = false
		}
	}
};
var XctLanguageSelector = {
	langSelectorId : "xc-lang-selector",
	menuClass : "xct-menu",
	menuOnClass : "xct-on",
	triggerClass : "xct-trigger-link",
	triggerDropdownClass : "xct-trigger-dropdown",
	createSelector : function() {
		var a = document.getElementById("xc-lang-selector");
		if (a == undefined) {
			return
		}
		if (a.innerHTML != "") {
			return
		}
		a.innerHTML = this.generateMenu();
		if (!!XctMenu.sdata.useDefaultStyle) {
			this.writeCss()
		}
		this.bindDropdownEvent();
		this.writeExtension()
	},
	generateMenu : function() {
		var c = "";
		var b = XctMenu.sdata.selectors;
		if (b) {
			c += '<ul style="display: block; overflow: visible;" class="xct-menu">';
			c += '<li class="xct-trigger"><a class="xct-trigger-link"><span class="xct-lang">'
					+ this.currentSelectorName() + "</span></a>";
			c += '<ul style="display: none; " class="xct-trigger-dropdown">';
			for ( var a = 0; a < b.length; a++) {
				c += '<li class="xct-item"><a class="xct-link" href="'
						+ b[a].url
						+ '" style="display: block; "><span class="xct-link-label">'
						+ b[a].code.toUpperCase()
						+ '</span><span class="xct-link-text">' + b[a].name
						+ "</span></a></li>"
			}
			c += "</ul></li></ul>"
		} else {
			c = '<ul class="xct-menu"><li class="xct-trigger"><a class="xct-trigger-link"><span class="xct-lang">language selector is not existing, please setup</span></a><li></li><ul></ul></ul>'
		}
		return c
	},
	writeCss : function() {
		var a = document.createElement("link");
		a.setAttribute("rel", "stylesheet");
		a.setAttribute("href", unescape(XctMenu.sdata.stylePath));
		document.getElementsByTagName("body")[0].appendChild(a)
	},
	writeExtension : function() {
		var a = document.createElement("script");
		a.setAttribute("type", "text/javascript");
		a.setAttribute("src", unescape(XctMenu.sdata.extensionUrl) + "?xcv="
				+ new Date().getTime());
		document.getElementsByTagName("body")[0].appendChild(a)
	},
	currentSelectorName : function() {
		var c = window.location.host;
		var b = XctMenu.sdata.selectors;
		for ( var a = 0; a < b.length; a++) {
			if (b[a].url == c || b[a].url == "http://" + c
					|| b[a].url == "https://" + c) {
				return b[a].name
			}
		}
		return "error domain"
	},
	toggleDropdown : function() {
		if (this.isDropdownOpen()) {
			this.closeDropdown()
		} else {
			this.openDropdown()
		}
	},
	isDropdownOpen : function() {
		var a = document.getElementById(this.langSelectorId);
		var b = XctUtil.getElementsByClassName(a, this.menuClass)[0];
		if (b && XctUtil.hasClass(b, this.menuOnClass)) {
			return true
		}
		return false
	},
	closeDropdown : function() {
		var a = document.getElementById(this.langSelectorId);
		var b = XctUtil.getElementsByClassName(a, this.menuClass)[0];
		XctUtil.removeClass(b, this.menuOnClass);
		this.getDropdown().style.display = "none"
	},
	openDropdown : function() {
		var a = document.getElementById(this.langSelectorId);
		var b = XctUtil.getElementsByClassName(a, this.menuClass)[0];
		XctUtil.addClass(b, this.menuOnClass);
		this.getDropdown().style.display = "block"
	},
	getDropdown : function() {
		var a = document.getElementById(this.langSelectorId);
		var b = XctUtil.getElementsByClassName(a, "xct-trigger")[0].childNodes;
		for ( var c = 0; c < b.length; c++) {
			if (b[c].tagName.toLowerCase() == "ul") {
				return b[c]
			}
		}
	},
	bindDropdownEvent : function() {
		var b = this;
		var a = document.getElementById(this.langSelectorId);
		var d = XctUtil.firstElementChild(XctUtil.firstElementChild(a));
		var c = XctUtil.getElementsByClassName(a, this.triggerClass)[0];
		XctUtil.bindEvent(c, "click", function(f) {
			b.toggleDropdown()
		});
		XctUtil.bindEvent(d, "mouseover", function(f) {
			XctUtil.preventDefault(f);
			if (!b.isDropdownOpen()) {
				b.openDropdown()
			}
		});
		XctUtil.bindEvent(d, "mouseout", function(f) {
			XctUtil.preventDefault(f);
			if (b.isDropdownOpen()) {
				b.closeDropdown()
			}
		})
	}
};
window.DomReady.ready(function() {
	XctLanguageSelector.createSelector()
});