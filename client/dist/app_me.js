webpackJsonp([0],{137:function(e,t,n){"use strict";function o(){function e(){var e=(0,i.default)(".fullpage__menu__share > a"),t=e.parent().find("ul");t.hasClass("fullpage__menu__share--open")?(e.find("i").removeClass("ion-close-round"),t.removeClass("fullpage__menu__share--open")):(e.find("i").addClass("ion-close-round"),t.addClass("fullpage__menu__share--open"))}(0,i.default)(".fullpage__menu__share > a").on("click",e)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=o},138:function(e,t,n){"use strict";function o(e){function t(t){t&&t.preventDefault(),(0,l.ScrollStop)(e,!0);var n=(0,i.default)(this).attr("href").replace("#","");(0,i.default)('.section__modal[data-modal="'+n+'"]').addClass("section__modal--open")}function n(){if((0,i.default)(".section__modal--open").length>0){(0,l.ScrollStop)(e,!1);(0,i.default)(".section__modal--open").removeClass("section__modal--open")}}var o=window.mitt;(0,i.default)(".open-modal").on("click",t),(0,i.default)(".section__modal__close-modal").on("click",n),o.on("close:esc",n)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(52);t.default=o},139:function(e,t,n){"use strict";function o(e){function t(t){t&&t.preventDefault(),(0,l.ScrollStop)(e,!0),(0,i.default)(".fullpage-nav").addClass("fullpage-nav--open"),(0,i.default)(".fullpage__menu").addClass("fullpage__menu--dark")}function n(t){(0,i.default)(".fullpage-nav--open").length>0&&((0,l.ScrollStop)(e,!1),(0,i.default)(".fullpage-nav").removeClass("fullpage-nav--open"),(0,i.default)(".fullpage__menu").removeClass("fullpage__menu--dark"))}var o=window.mitt;(0,i.default)(".indicator").on("click",t),(0,i.default)(".fullpage-nav__close").on("click",n),(0,i.default)(".fullpage-nav a").on("click",n),o.on("close:all",n),o.on("close:esc",n)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(52);t.default=o},140:function(e,t,n){"use strict";function o(e){function t(t){(0,i.default)(".section__post--open").length>0&&((0,l.ScrollStop)(e,!1),(0,i.default)(".section__post--open").removeClass("section__post--open"),(0,i.default)(".section__close-post").removeClass("section__close-post--open"))}function n(t){(0,l.ScrollStop)(e,!0),t.addClass("section__post--open"),(0,i.default)(".section__close-post").addClass("section__close-post--open")}function o(e){var o=(0,i.default)(this).closest(".fp-tableCell").find(".section__post");o.hasClass("section__post--open")?t.call(this,o):n.call(this,o)}var a=window.mitt;(0,i.default)(document).on("click",".section__open-post",o),(0,i.default)(document).on("click",".section__close-post",o),a.on("close:esc",t),a.on("close:all",t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(52);t.default=o},141:function(e,t,n){"use strict";function o(e){function t(t){if(t.length>0){(0,l.ScrollStop)(e,!1);t.find("iframe").attr("src",""),t.removeClass("section__video--open")}}function n(n){(0,l.ScrollStop)(e,!0),n.addClass("section__video--open");var o=n.find("iframe"),i=o.data("src");o.attr("src",i),a.off("close:esc",function(){return t(n)}),a.on("close:esc",function(){return t(n)})}function o(e){e&&e.preventDefault();var o=(0,i.default)(this).closest(".fp-tableCell").find(".section__video");o.hasClass("section__video--open")?t(o):n(o)}var a=window.mitt;(0,i.default)(document).on("click",".section__open-video",o)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(52);t.default=o},142:function(e,t,n){"use strict";function o(e){function t(){(0,i.default)(".map-points").attr("width",(0,i.default)(window).width()),(0,i.default)(".map-points").attr("height",(0,i.default)(window).height()),((0,i.default)(window).width()<767||(0,i.default)(window).width()<991)&&((0,i.default)(".map-points").attr("viewBox","250 0 1920 1080"),(0,i.default)(".map-points__spots").attr("transform","translate(-40, 100)"))}function n(t){t&&t.preventDefault();var n=(0,i.default)(this).data("content");(0,i.default)(".spot-content."+n).length>0&&((0,l.ScrollStop)(e,!0),(0,i.default)(".spot-content."+n).addClass("spot-content--open"),(0,i.default)(".section__close-spot-content").addClass("section__close-spot-content--open"))}function o(t){t&&t.preventDefault(),(0,l.ScrollStop)(e,!1),(0,i.default)(".spot-content").removeClass("spot-content--open"),(0,i.default)(".section__close-spot-content").removeClass("section__close-spot-content--open")}function a(t){(0,l.ScrollStop)(e,!0),(0,i.default)(".section__close-nineveh-general").addClass("section__close-nineveh-general--open"),(0,i.default)(".nineveh-general-content").addClass("nineveh-general-content--open")}function s(t){(0,i.default)(".section__close-nineveh-general--open").length>0&&((0,l.ScrollStop)(e,!1),(0,i.default)(".section__close-nineveh-general").removeClass("section__close-nineveh-general--open"),(0,i.default)(".nineveh-general-content").removeClass("nineveh-general-content--open"))}var r=window.mitt;t(),(0,i.default)(window).on("resize",function(){t(),e.reBuild()}),(0,i.default)(".map-points__spot").on("click",n),(0,i.default)(".section__close-spot-content").on("click",o),(0,i.default)(".nineveh-general-point").on("click",a),(0,i.default)(".section__close-nineveh-general").on("click",s),r.on("close:esc",s),r.on("close:esc",o)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(52);t.default=o},143:function(e,t,n){!function(t,o){var a=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",a,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(44)):t.lazySizes?a():t.addEventListener("lazyunveilread",a,!0)}(window,function(e,t,n){"use strict";if(e.addEventListener){var o=/\(|\)|'/,a={contain:1,cover:1},i=function(e){var t=n.gW(e,e.parentNode);return(!e._lazysizesWidth||t>e._lazysizesWidth)&&(e._lazysizesWidth=t),e._lazysizesWidth},l=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!a[t]&&a[e.style.backgroundSize]&&(t=e.style.backgroundSize),t},s=function(e,n,o){var a=t.createElement("picture"),i=n.getAttribute(lazySizesConfig.sizesAttr),l=n.getAttribute("data-ratio"),s=n.getAttribute("data-optimumx");n._lazybgset&&n._lazybgset.parentNode==n&&n.removeChild(n._lazybgset),Object.defineProperty(o,"_lazybgset",{value:n,writable:!0}),Object.defineProperty(n,"_lazybgset",{value:a,writable:!0}),e=e.replace(/\s+/g," ").split(/\s*\|\s+|\s+\|\s*/g),a.style.display="none",o.className=lazySizesConfig.lazyClass,1!=e.length||i||(i="auto"),e.forEach(function(e){var n=t.createElement("source");i&&"auto"!=i&&n.setAttribute("sizes",i),e.match(/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/)&&(n.setAttribute(lazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&n.setAttribute("media",lazySizesConfig.customMedia[RegExp.$2]||RegExp.$2)),a.appendChild(n)}),i&&(o.setAttribute(lazySizesConfig.sizesAttr,i),n.removeAttribute(lazySizesConfig.sizesAttr),n.removeAttribute("sizes")),s&&o.setAttribute("data-optimumx",s),l&&o.setAttribute("data-ratio",l),a.appendChild(o),n.appendChild(a)},r=function(e){if(e.target._lazybgset){var t=e.target,a=t._lazybgset,i=t.currentSrc||t.src;i&&(a.style.backgroundImage="url("+(o.test(i)?JSON.stringify(i):i)+")"),t._lazybgsetLoading&&(n.fire(a,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(e){var o,a,i;!e.defaultPrevented&&(o=e.target.getAttribute("data-bgset"))&&(i=e.target,a=t.createElement("img"),a.alt="",a._lazybgsetLoading=!0,e.detail.firesLoad=!0,s(o,i,a),setTimeout(function(){n.loader.unveil(a),n.rAF(function(){n.fire(a,"_lazyloaded",{},!0,!0),a.complete&&r({target:a})})}))}),t.addEventListener("load",r,!0),e.addEventListener("lazybeforesizes",function(e){if(e.detail.instance==n&&e.target._lazybgset&&e.detail.dataAttr){var t=e.target._lazybgset,o=l(t);a[o]&&(e.target._lazysizesParentFit=o,n.rAF(function(){e.target.setAttribute("data-parent-fit",o),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit}))}},!0),t.documentElement.addEventListener("lazybeforesizes",function(e){!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==n&&(e.detail.width=i(e.target._lazybgset))})}})},144:function(e,t,n){!function(t,o){var a=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",a,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(44),n(357)):t.lazySizes?a():t.addEventListener("lazyunveilread",a,!0)}(window,function(e,t,n){"use strict";var o,a=n&&n.cfg||e.lazySizesConfig,i=t.createElement("img"),l="sizes"in i&&"srcset"in i,s=function(){var e=Array.prototype.forEach;return function(n){var o=t.createElement("img"),a=function(e){var t,n=e.getAttribute(lazySizesConfig.srcsetAttr);n&&(n.match(/\s+(\d+)(w|h)\s+(\d+)(w|h)/)&&(t="w"==RegExp.$2?RegExp.$1/RegExp.$3:RegExp.$3/RegExp.$1)&&e.setAttribute("data-aspectratio",t),e.setAttribute(lazySizesConfig.srcsetAttr,n.replace(/\s+\d+h/g,"")))},i=function(t){var n=t.target.parentNode;n&&"PICTURE"==n.nodeName&&e.call(n.getElementsByTagName("source"),a),a(t.target)},l=function(){o.currentSrc&&t.removeEventListener("lazybeforeunveil",i)};n[1]&&(t.addEventListener("lazybeforeunveil",i),o.onload=l,o.onerror=l,o.srcset="data:,a 1w 1h",o.complete&&l())}}();if(a||(a={},e.lazySizesConfig=a),a.supportsType||(a.supportsType=function(e){return!e}),!e.picturefill&&!a.pf){if(e.HTMLPictureElement&&l)return t.msElementsFromPoint&&s(navigator.userAgent.match(/Edge\/(\d+)/)),void(a.pf=function(){});a.pf=function(t){var n,a;if(!e.picturefill)for(n=0,a=t.elements.length;n<a;n++)o(t.elements[n])},o=function(){var i=function(e,t){return e.w-t.w},s=/^\s*\d+\.*\d*px\s*$/,r=function(e){var t,n,o=e.length,a=e[o-1],i=0;for(i;i<o;i++)if(a=e[i],a.d=a.w/e.w,a.d>=e.d){!a.cached&&(t=e[i-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(n=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*n),t.d+(a.d-e.d)*n>e.d&&(a=t));break}return a},c=function(){var e,t=/\s/,n=function(t,n,o,a){e.push({c:n,u:o,w:1*a})};return function(o){return e=[],o=o.trim(),o.replace(/\s+\d+h/g,"").replace(/(([^,\s].[^\s]+)\s+(\d+)w)/g,n),e.length||!o||t.test(o)||e.push({c:o,u:o,w:99}),e}}(),u=function(){u.init||(u.init=!0,addEventListener("resize",function(){var e,n=t.getElementsByClassName("lazymatchmedia"),a=function(){var e,t;for(e=0,t=n.length;e<t;e++)o(n[e])};return function(){clearTimeout(e),e=setTimeout(a,66)}}()))},d=function(t,o){var i,l=t.getAttribute("srcset")||t.getAttribute(a.srcsetAttr);!l&&o&&(l=t._lazypolyfill?t._lazypolyfill._set:t.getAttribute(a.srcAttr)||t.getAttribute("src")),t._lazypolyfill&&t._lazypolyfill._set==l||(i=c(l||""),o&&t.parentNode&&(i.isPicture="PICTURE"==t.parentNode.nodeName.toUpperCase(),i.isPicture&&e.matchMedia&&(n.aC(t,"lazymatchmedia"),u())),i._set=l,Object.defineProperty(t,"_lazypolyfill",{value:i,writable:!0}))},f=function(t){var o=e.devicePixelRatio||1,a=n.getX&&n.getX(t);return Math.min(a||o,2.5,o)},p=function(t){return e.matchMedia?(p=function(e){return!e||(matchMedia(e)||{}).matches})(t):!t},_=function(e){var t,o,l,c,u,_,g;if(c=e,d(c,!0),u=c._lazypolyfill,u.isPicture)for(o=0,t=e.parentNode.getElementsByTagName("source"),l=t.length;o<l;o++)if(a.supportsType(t[o].getAttribute("type"),e)&&p(t[o].getAttribute("media"))){c=t[o],d(c),u=c._lazypolyfill;break}return u.length>1?(g=c.getAttribute("sizes")||"",g=s.test(g)&&parseInt(g,10)||n.gW(e,e.parentNode),u.d=f(e),!u.src||!u.w||u.w<g?(u.w=g,_=r(u.sort(i)),u.src=_):_=u.src):_=u[0],_},g=function(e){if(!l||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=_(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(a.srcAttr,t.u),e.setAttribute("src",t.u))}};return g.parse=c,g}(),a.loadedClass&&a.loadingClass&&function(){var e=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(t){e.push(t+a.loadedClass),e.push(t+a.loadingClass)}),a.pf({elements:t.querySelectorAll(e.join(", "))})}()}})},159:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n(68);var a=n(18),i=o(a);n(44),n(69),n(143),n(144);var l=n(140),s=o(l),r=n(141),c=o(r),u=n(142),d=o(u),f=n(139),p=o(f),_=n(137),g=o(_),v=n(138),m=o(v),y=n(70),z=o(y);window.mitt=(0,z.default)(),window.lazySizesConfig=window.lazySizesConfig||{},window.lazySizesConfig.init=!1,(0,i.default)(function(){function e(){lazySizes.init()}function t(e,t,n){var o=t-1;(0,i.default)(".section:eq("+o+")")}function n(e,t){var n=t-1,o=(0,i.default)(".section:eq("+n+")"),l=o.data("story"),s=o.data("index"),r=o.data("redirect"),c=(0,i.default)(".indicator"),u=fp_options.titles.filter(function(e){return e.story==l});c.find(".indicator__story").text(l),c.find(".indicator__index").text(s),u[0]&&u[0].title&&c.find(".indicator__title").text(u[0].title),r&&r.length>0&&(window.location=r),o.find(".bs-counter").length>0&&a.emit("runCounter")}function o(){i.default.fn.fullpage.moveSectionDown()}var a=window.mitt;(0,i.default)(".section__content").on("click",function(){return a.emit("close:all")}),(0,i.default)(document).keyup(function(e){27===e.keyCode&&a.emit("close:esc")}),(0,i.default)("#fullpage").fullpage({menu:"#fullpage-menu",recordHistory:!1,lazyLoading:!1,navigation:!1,normalScrollElements:".section__post__content, .spot-content__container, .nineveh-general-content__container, .section__modal__content",afterRender:e,afterLoad:n,onLeave:t});var l=i.default.fn.fullpage;(0,s.default)(l),(0,c.default)(l),(0,d.default)(l),(0,p.default)(l),(0,m.default)(l),(0,g.default)(),(0,i.default)(document).on("click",".section__down",o),""!==window.location.hash&&(0,i.default)(".intro").addClass("intro--close"),setTimeout(function(){(0,i.default)(".intro").addClass("intro--close")},fp_options.introDelay)})},357:function(e,t,n){!function(t,o){var a=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",a,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(44)):t.lazySizes?a():t.addEventListener("lazyunveilread",a,!0)}(window,function(e,t,n){"use strict";var o,a=t.createElement("img");!("srcset"in a)||"sizes"in a||e.HTMLPictureElement||(o=/^picture$/i,t.addEventListener("lazybeforeunveil",function(e){if(e.detail.instance==n){var a,i,l,s,r,c,u;!e.defaultPrevented&&!lazySizesConfig.noIOSFix&&(a=e.target)&&(l=a.getAttribute(lazySizesConfig.srcsetAttr))&&(i=a.parentNode)&&((r=o.test(i.nodeName||""))||(s=a.getAttribute("sizes")||a.getAttribute(lazySizesConfig.sizesAttr)))&&(c=r?i:t.createElement("picture"),a._lazyImgSrc||Object.defineProperty(a,"_lazyImgSrc",{value:t.createElement("source"),writable:!0}),u=a._lazyImgSrc,s&&u.setAttribute("sizes",s),u.setAttribute(lazySizesConfig.srcsetAttr,l),a.setAttribute("data-pfsrcset",l),a.removeAttribute(lazySizesConfig.srcsetAttr),r||(i.insertBefore(c,a),c.appendChild(a)),c.insertBefore(u,a))}}))})},52:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ScrollStop=void 0;var o=n(18),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.ScrollStop=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log(t),t?(e.setAllowScrolling(!1),e.setKeyboardScrolling(!1),(0,a.default)("body").addClass("scroll-stoped")):(e.setAllowScrolling(!0),e.setKeyboardScrolling(!0),(0,a.default)("body").removeClass("scroll-stoped"))}}},[159]);