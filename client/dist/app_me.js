webpackJsonp([0],{22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.stopScroll=function(e){window.mitt.on("stop:scroll",function(){$("body").addClass("scroll-stoped"),e.setAllowScrolling(!1)})},t.allowScroll=function(e){window.mitt.on("allow:scroll",function(){$("body").removeClass("scroll-stoped"),e.setAllowScrolling(!0)})}},23:function(e,t,n){"use strict";function o(){function e(){var e=$(".fullpage__menu__share > a"),t=e.parent().find("ul");t.hasClass("fullpage__menu__share--open")?(e.find("i").removeClass("ion-close-round"),t.removeClass("fullpage__menu__share--open")):(e.find("i").addClass("ion-close-round"),t.addClass("fullpage__menu__share--open"))}$(".fullpage__menu__share > a").on("click",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},24:function(e,t,n){"use strict";function o(e){function t(e){e&&e.preventDefault(),o.emit("stop:scroll");var t=$(this).attr("href").replace("#","");$('.section__modal[data-modal="'+t+'"]').addClass("section__modal--open")}function n(){if($(".section__modal--open").length>0){o.emit("allow:scroll");$(".section__modal--open").removeClass("section__modal--open")}}var o=window.mitt;$(".open-modal").on("click",t),$(".section__modal__close-modal").on("click",n),o.on("close:esc",n)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},25:function(e,t,n){"use strict";function o(e){function t(e){e&&e.preventDefault(),o.emit("stop:scroll"),$(".fullpage-nav").addClass("fullpage-nav--open"),$(".fullpage__menu").addClass("fullpage__menu--dark")}function n(e){$(".fullpage-nav--open").length>0&&(o.emit("allow:scroll"),$(".fullpage-nav").removeClass("fullpage-nav--open"),$(".fullpage__menu").removeClass("fullpage__menu--dark"))}var o=window.mitt;$(".indicator").on("click",t),$(".fullpage-nav__close").on("click",n),$(".fullpage-nav a").on("click",n),o.on("close:all",n),o.on("close:esc",n)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},26:function(e,t,n){"use strict";function o(e){function t(e){$(".section__post--open").length>0&&(i.emit("allow:scroll"),$(".section__post--open").removeClass("section__post--open"),$(".section__close-post").removeClass("section__close-post--open"))}function n(e,t){i.emit("stop:scroll"),e.addClass("section__post--open"),$(".section__close-post").addClass("section__close-post--open")}function o(e){function o(e){$(e.target).is(l)&&(console.log("post close outside"),t(l))}var l=$(this).closest(".fp-tableCell").find(".section__post");i.on("click:document",o),l.hasClass("section__post--open")?t.call(this,l,e):n.call(this,l,e)}var i=window.mitt;$(document).on("click",".section__open-post",o),$(document).on("click",".section__close-post",o),i.on("close:esc",t),i.on("close:all",t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},27:function(e,t,n){"use strict";function o(e){function t(e){if(e.length>0){i.emit("allow:scroll");e.find("iframe").attr("src",""),e.removeClass("section__video--open")}}function n(e){i.emit("stop:scroll"),e.addClass("section__video--open");var n=e.find("iframe"),o=n.data("src");n.attr("src",o),i.off("close:esc",function(){return t(e)}),i.on("close:esc",function(){return t(e)})}function o(e){e&&e.preventDefault();var o=$(this).closest(".fp-tableCell").find(".section__video");o.hasClass("section__video--open")?t(o):n(o)}var i=window.mitt;$(document).on("click",".section__open-video",o)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},28:function(e,t,n){"use strict";function o(e){function t(){$(".map-points").attr("width",$(window).width()),$(".map-points").attr("height",$(window).height()),($(window).width()<767||$(window).width()<991)&&($(".map-points").attr("viewBox","250 0 1920 1080"),$(".map-points__spots").attr("transform","translate(-40, 100)"))}function n(e){e&&e.preventDefault();var t=$(this).data("content");$(".spot-content."+t).length>0&&(a.emit("stop:scroll"),$(".spot-content."+t).addClass("spot-content--open"),$(".section__close-spot-content").addClass("section__close-spot-content--open"))}function o(e){e&&e.preventDefault(),a.emit("allow:scroll"),$(".spot-content").removeClass("spot-content--open"),$(".section__close-spot-content").removeClass("section__close-spot-content--open")}function i(e){a.emit("stop:scroll"),$(".section__close-nineveh-general").addClass("section__close-nineveh-general--open"),$(".nineveh-general-content").addClass("nineveh-general-content--open")}function l(e){$(".section__close-nineveh-general--open").length>0&&(a.emit("allow:scroll"),$(".section__close-nineveh-general").removeClass("section__close-nineveh-general--open"),$(".nineveh-general-content").removeClass("nineveh-general-content--open"))}var a=window.mitt;t(),$(window).on("resize",function(){t(),e.reBuild()}),$(".map-points__spot").on("click",n),$(".section__close-spot-content").on("click",o),$(".nineveh-general-point").on("click",i),$(".section__close-nineveh-general").on("click",l),a.on("close:esc",l),a.on("close:esc",o)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},29:function(e,t,n){!function(t,o){var i=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",i,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(3)):t.lazySizes?i():t.addEventListener("lazyunveilread",i,!0)}(window,function(e,t,n){"use strict";if(e.addEventListener){var o=/\(|\)|'/,i={contain:1,cover:1},l=function(e){var t=n.gW(e,e.parentNode);return(!e._lazysizesWidth||t>e._lazysizesWidth)&&(e._lazysizesWidth=t),e._lazysizesWidth},a=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!i[t]&&i[e.style.backgroundSize]&&(t=e.style.backgroundSize),t},s=function(e,n,o){var i=t.createElement("picture"),l=n.getAttribute(lazySizesConfig.sizesAttr),a=n.getAttribute("data-ratio"),s=n.getAttribute("data-optimumx");n._lazybgset&&n._lazybgset.parentNode==n&&n.removeChild(n._lazybgset),Object.defineProperty(o,"_lazybgset",{value:n,writable:!0}),Object.defineProperty(n,"_lazybgset",{value:i,writable:!0}),e=e.replace(/\s+/g," ").split(/\s*\|\s+|\s+\|\s*/g),i.style.display="none",o.className=lazySizesConfig.lazyClass,1!=e.length||l||(l="auto"),e.forEach(function(e){var n=t.createElement("source");l&&"auto"!=l&&n.setAttribute("sizes",l),e.match(/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/)&&(n.setAttribute(lazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&n.setAttribute("media",lazySizesConfig.customMedia[RegExp.$2]||RegExp.$2)),i.appendChild(n)}),l&&(o.setAttribute(lazySizesConfig.sizesAttr,l),n.removeAttribute(lazySizesConfig.sizesAttr),n.removeAttribute("sizes")),s&&o.setAttribute("data-optimumx",s),a&&o.setAttribute("data-ratio",a),i.appendChild(o),n.appendChild(i)},r=function(e){if(e.target._lazybgset){var t=e.target,i=t._lazybgset,l=t.currentSrc||t.src;l&&(i.style.backgroundImage="url("+(o.test(l)?JSON.stringify(l):l)+")"),t._lazybgsetLoading&&(n.fire(i,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(e){var o,i,l;!e.defaultPrevented&&(o=e.target.getAttribute("data-bgset"))&&(l=e.target,i=t.createElement("img"),i.alt="",i._lazybgsetLoading=!0,e.detail.firesLoad=!0,s(o,l,i),setTimeout(function(){n.loader.unveil(i),n.rAF(function(){n.fire(i,"_lazyloaded",{},!0,!0),i.complete&&r({target:i})})}))}),t.addEventListener("load",r,!0),e.addEventListener("lazybeforesizes",function(e){if(e.detail.instance==n&&e.target._lazybgset&&e.detail.dataAttr){var t=e.target._lazybgset,o=a(t);i[o]&&(e.target._lazysizesParentFit=o,n.rAF(function(){e.target.setAttribute("data-parent-fit",o),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit}))}},!0),t.documentElement.addEventListener("lazybeforesizes",function(e){!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==n&&(e.detail.width=l(e.target._lazybgset))})}})},30:function(e,t,n){!function(t,o){var i=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",i,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(3),n(62)):t.lazySizes?i():t.addEventListener("lazyunveilread",i,!0)}(window,function(e,t,n){"use strict";var o,i=n&&n.cfg||e.lazySizesConfig,l=t.createElement("img"),a="sizes"in l&&"srcset"in l,s=function(){var e=Array.prototype.forEach;return function(n){var o=t.createElement("img"),i=function(e){var t,n=e.getAttribute(lazySizesConfig.srcsetAttr);n&&(n.match(/\s+(\d+)(w|h)\s+(\d+)(w|h)/)&&(t="w"==RegExp.$2?RegExp.$1/RegExp.$3:RegExp.$3/RegExp.$1)&&e.setAttribute("data-aspectratio",t),e.setAttribute(lazySizesConfig.srcsetAttr,n.replace(/\s+\d+h/g,"")))},l=function(t){var n=t.target.parentNode;n&&"PICTURE"==n.nodeName&&e.call(n.getElementsByTagName("source"),i),i(t.target)},a=function(){o.currentSrc&&t.removeEventListener("lazybeforeunveil",l)};n[1]&&(t.addEventListener("lazybeforeunveil",l),o.onload=a,o.onerror=a,o.srcset="data:,a 1w 1h",o.complete&&a())}}();if(i||(i={},e.lazySizesConfig=i),i.supportsType||(i.supportsType=function(e){return!e}),!e.picturefill&&!i.pf){if(e.HTMLPictureElement&&a)return t.msElementsFromPoint&&s(navigator.userAgent.match(/Edge\/(\d+)/)),void(i.pf=function(){});i.pf=function(t){var n,i;if(!e.picturefill)for(n=0,i=t.elements.length;n<i;n++)o(t.elements[n])},o=function(){var l=function(e,t){return e.w-t.w},s=/^\s*\d+\.*\d*px\s*$/,r=function(e){var t,n,o=e.length,i=e[o-1],l=0;for(l;l<o;l++)if(i=e[l],i.d=i.w/e.w,i.d>=e.d){!i.cached&&(t=e[l-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(n=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*n),t.d+(i.d-e.d)*n>e.d&&(i=t));break}return i},c=function(){var e,t=/\s/,n=function(t,n,o,i){e.push({c:n,u:o,w:1*i})};return function(o){return e=[],o=o.trim(),o.replace(/\s+\d+h/g,"").replace(/(([^,\s].[^\s]+)\s+(\d+)w)/g,n),e.length||!o||t.test(o)||e.push({c:o,u:o,w:99}),e}}(),u=function(){u.init||(u.init=!0,addEventListener("resize",function(){var e,n=t.getElementsByClassName("lazymatchmedia"),i=function(){var e,t;for(e=0,t=n.length;e<t;e++)o(n[e])};return function(){clearTimeout(e),e=setTimeout(i,66)}}()))},d=function(t,o){var l,a=t.getAttribute("srcset")||t.getAttribute(i.srcsetAttr);!a&&o&&(a=t._lazypolyfill?t._lazypolyfill._set:t.getAttribute(i.srcAttr)||t.getAttribute("src")),t._lazypolyfill&&t._lazypolyfill._set==a||(l=c(a||""),o&&t.parentNode&&(l.isPicture="PICTURE"==t.parentNode.nodeName.toUpperCase(),l.isPicture&&e.matchMedia&&(n.aC(t,"lazymatchmedia"),u())),l._set=a,Object.defineProperty(t,"_lazypolyfill",{value:l,writable:!0}))},f=function(t){var o=e.devicePixelRatio||1,i=n.getX&&n.getX(t);return Math.min(i||o,2.5,o)},p=function(t){return e.matchMedia?(p=function(e){return!e||(matchMedia(e)||{}).matches})(t):!t},_=function(e){var t,o,a,c,u,_,g;if(c=e,d(c,!0),u=c._lazypolyfill,u.isPicture)for(o=0,t=e.parentNode.getElementsByTagName("source"),a=t.length;o<a;o++)if(i.supportsType(t[o].getAttribute("type"),e)&&p(t[o].getAttribute("media"))){c=t[o],d(c),u=c._lazypolyfill;break}return u.length>1?(g=c.getAttribute("sizes")||"",g=s.test(g)&&parseInt(g,10)||n.gW(e,e.parentNode),u.d=f(e),!u.src||!u.w||u.w<g?(u.w=g,_=r(u.sort(l)),u.src=_):_=u.src):_=u[0],_},g=function(e){if(!a||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=_(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(i.srcAttr,t.u),e.setAttribute("src",t.u))}};return g.parse=c,g}(),i.loadedClass&&i.loadingClass&&function(){var e=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(t){e.push(t+i.loadedClass),e.push(t+i.loadingClass)}),i.pf({elements:t.querySelectorAll(e.join(", "))})}()}})},45:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(10),l=o(i);n(3),n(7),n(30),n(29);var a=n(26),s=o(a),r=n(27),c=o(r),u=n(28),d=o(u),f=n(25),p=o(f),_=n(23),g=o(_),m=n(24),v=o(m),y=(n(22),n(8)),z=o(y);window.mitt=(0,z.default)(),window.fp_options=window.fp_options||{},window.lazySizesConfig=window.lazySizesConfig||{},window.lazySizesConfig.init=!1,(0,l.default)(document).ready(function(){function e(){lazySizes.init()}function t(e,t,n){var o=t-1;(0,l.default)(".section:eq("+o+")")}function n(e,t){var n=t-1,o=(0,l.default)(".section:eq("+n+")"),i=o.data("story"),s=o.data("index"),r=o.data("redirect"),c=(0,l.default)(".indicator"),u=fp_options.titles.filter(function(e){return e.story==i});c.find(".indicator__story").text(i),c.find(".indicator__index").text(s),u[0]&&u[0].title&&c.find(".indicator__title").text(u[0].title),r&&r.length>0&&(window.location=r),o.find(".bs-counter").length>0&&a.emit("runCounter")}function o(){l.default.fn.fullpage.moveSectionDown()}function i(){(0,l.default)(".intro").addClass("intro--close")}var a=window.mitt;(0,l.default)(".section__content").on("click",function(){return a.emit("close:all")}),(0,l.default)(document).on("click",function(e){return a.emit("click:document",e)}),(0,l.default)(document).keyup(function(e){27===e.keyCode&&a.emit("close:esc")});var r=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),u=r?".section__post__content, .spot-content__container, .nineveh-general-content__container, .section__modal__content":"";if(navigator.userAgent.match(/(IEMobile)/),(0,l.default)("#fullpage").fullpage({menu:"#fullpage-menu",lazyLoading:!1,navigation:!1,normalScrollElements:u,touchSensitivity:2,afterRender:e,afterLoad:n,onLeave:t}),(0,l.default)("#fullpage").length>0){var f=l.default.fn.fullpage;a.on("stop:scroll",function(){console.log("stop:scroll"),(0,l.default)("body").addClass("scroll-stoped"),l.default.fn.fullpage.setAllowScrolling(!1)}),a.on("allow:scroll",function(){console.log("allow:scroll"),(0,l.default)("body").removeClass("scroll-stoped"),l.default.fn.fullpage.setAllowScrolling(!0)}),(0,s.default)(f),(0,c.default)(f),(0,d.default)(f),(0,p.default)(f),(0,v.default)(f),(0,g.default)()}(0,l.default)(document).on("click",".section__down",o),""!==window.location.hash&&i(),setTimeout(function(){i()},fp_options.introDelay)})},62:function(e,t,n){!function(t,o){var i=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",i,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(3)):t.lazySizes?i():t.addEventListener("lazyunveilread",i,!0)}(window,function(e,t,n){"use strict";var o,i=t.createElement("img");!("srcset"in i)||"sizes"in i||e.HTMLPictureElement||(o=/^picture$/i,t.addEventListener("lazybeforeunveil",function(e){if(e.detail.instance==n){var i,l,a,s,r,c,u;!e.defaultPrevented&&!lazySizesConfig.noIOSFix&&(i=e.target)&&(a=i.getAttribute(lazySizesConfig.srcsetAttr))&&(l=i.parentNode)&&((r=o.test(l.nodeName||""))||(s=i.getAttribute("sizes")||i.getAttribute(lazySizesConfig.sizesAttr)))&&(c=r?l:t.createElement("picture"),i._lazyImgSrc||Object.defineProperty(i,"_lazyImgSrc",{value:t.createElement("source"),writable:!0}),u=i._lazyImgSrc,s&&u.setAttribute("sizes",s),u.setAttribute(lazySizesConfig.srcsetAttr,a),i.setAttribute("data-pfsrcset",a),i.removeAttribute(lazySizesConfig.srcsetAttr),r||(l.insertBefore(c,i),c.appendChild(i)),c.insertBefore(u,i))}}))})}},[45]);