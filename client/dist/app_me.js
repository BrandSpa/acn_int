webpackJsonp([0],[,,,function(e,t,n){"use strict";function o(){}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(){function e(){var e=$(".fullpage__menu__share > a"),t=e.parent().find("ul");t.hasClass("fullpage__menu__share--open")?(e.find("i").removeClass("ion-close-round"),t.removeClass("fullpage__menu__share--open")):(e.find("i").addClass("ion-close-round"),t.addClass("fullpage__menu__share--open"))}$(".fullpage__menu__share > a").on("click",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(e){function t(){e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),$(".fullpage-nav").addClass("fullpage-nav--open"),$(".fullpage__menu").addClass("fullpage__menu--dark"),o.off("close:all",function(){return n()}),o.off("close:esc",function(){return n()}),o.on("close:all",function(){return n()}),o.on("close:esc",function(){return n()})}function n(){e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped"),$(".fullpage-nav").removeClass("fullpage-nav--open"),$(".fullpage__menu").removeClass("fullpage__menu--dark")}var o=window.mitt;$(".indicator").on("click",t),$(".fullpage-nav__close").on("click",n)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(e){function t(t){e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped"),t.removeClass("section__post--open"),$(".section__close-post").removeClass("section__close-post--open")}function n(n){var o=this;e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),n.addClass("section__post--open"),$(".section__close-post").addClass("section__close-post--open"),l.off("close:esc",function(){return t.call(o,n)}),l.off("close:all",function(){return t.call(o,n)}),l.on("close:esc",function(){return t.call(o,n)}),l.on("close:all",function(){return t.call(o,n)})}function o(e){var o=$(this).closest(".fp-tableCell").find(".section__post");o.hasClass("section__post--open")?t.call(this,o):n.call(this,o)}var l=window.mitt;$(function(){$(document).on("click",".section__open-post",o),$(document).on("click",".section__close-post",o)})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(e){function t(){e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped");var t=$(this).parent();t.find("iframe").attr("src",""),t.removeClass("section__video--open")}function n(t){e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),t.addClass("section__video--open");var n=t.find("iframe"),o=n.data("src");n.attr("src",o)}function o(e){var o=$(this).closest(".fp-tableCell").find(".section__video");o.hasClass("section__video--open")?t.call(this):n.call(this,o)}$(function(){$(document).on("click",".section__open-video",o)})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(e){function t(){$(".map-points").attr("width",$(window).width()),$(".map-points").attr("height",$(window).height()),($(window).width()<767||$(window).width()<991)&&($(".map-points").attr("viewBox","250 0 1920 1080"),$(".map-points__spots").attr("transform","translate(-40, 100)"))}function n(t){t&&t.preventDefault();var n=$(this).data("content");$(".spot-content."+n).length>0&&(e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),$(".spot-content."+n).addClass("spot-content--open"),$(".section__close-spot-content").addClass("section__close-spot-content--open"),$(document).on("click",".spot-content."+n,function(e){e.preventDefault(),$(e.target).attr("class")=="spot-content "+n+" spot-content--open"&&o()}))}function o(t){t&&t.preventDefault(),e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped");$(this).data("content");$(".spot-content").removeClass("spot-content--open"),$(".section__close-spot-content").removeClass("section__close-spot-content--open")}function l(t){t&&t.preventDefault(),e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),$(".section__close-nineveh-general").addClass("section__close-nineveh-general--open"),$(".nineveh-general-content").addClass("nineveh-general-content--open")}function s(t){t&&t.preventDefault(),e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped"),$(".section__close-nineveh-general").removeClass("section__close-nineveh-general--open"),$(".nineveh-general-content").removeClass("nineveh-general-content--open")}t(),$(window).on("resize",function(){t(),e.reBuild()}),$(".map-points__spot").on("click",n),$(".section__close-spot-content").on("click",o),$(".nineveh-general-point").on("click",l),$(".section__close-nineveh-general").on("click",s)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){!function(t,o){var l=function(){o(t.lazySizes),t.removeEventListener("lazyunveilread",l,!0)};o=o.bind(null,t,t.document),"object"==typeof e&&e.exports?o(n(1)):t.lazySizes?l():t.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,n){"use strict";if(e.addEventListener){var o=/\(|\)|'/,l={contain:1,cover:1},s=function(e){var t=n.gW(e,e.parentNode);return(!e._lazysizesWidth||t>e._lazysizesWidth)&&(e._lazysizesWidth=t),e._lazysizesWidth},a=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!l[t]&&l[e.style.backgroundSize]&&(t=e.style.backgroundSize),t},i=function(e,n,o){var l=t.createElement("picture"),s=n.getAttribute(lazySizesConfig.sizesAttr),a=n.getAttribute("data-ratio"),i=n.getAttribute("data-optimumx");n._lazybgset&&n._lazybgset.parentNode==n&&n.removeChild(n._lazybgset),Object.defineProperty(o,"_lazybgset",{value:n,writable:!0}),Object.defineProperty(n,"_lazybgset",{value:l,writable:!0}),e=e.replace(/\s+/g," ").split(/\s*\|\s+|\s+\|\s*/g),l.style.display="none",o.className=lazySizesConfig.lazyClass,1!=e.length||s||(s="auto"),e.forEach(function(e){var n=t.createElement("source");s&&"auto"!=s&&n.setAttribute("sizes",s),e.match(/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/)&&(n.setAttribute(lazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&n.setAttribute("media",lazySizesConfig.customMedia[RegExp.$2]||RegExp.$2)),l.appendChild(n)}),s&&(o.setAttribute(lazySizesConfig.sizesAttr,s),n.removeAttribute(lazySizesConfig.sizesAttr),n.removeAttribute("sizes")),i&&o.setAttribute("data-optimumx",i),a&&o.setAttribute("data-ratio",a),l.appendChild(o),n.appendChild(l)},c=function(e){if(e.target._lazybgset){var t=e.target,l=t._lazybgset,s=t.currentSrc||t.src;s&&(l.style.backgroundImage="url("+(o.test(s)?JSON.stringify(s):s)+")"),t._lazybgsetLoading&&(n.fire(l,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(e){var o,l,s;!e.defaultPrevented&&(o=e.target.getAttribute("data-bgset"))&&(s=e.target,l=t.createElement("img"),l.alt="",l._lazybgsetLoading=!0,e.detail.firesLoad=!0,i(o,s,l),setTimeout(function(){n.loader.unveil(l),n.rAF(function(){n.fire(l,"_lazyloaded",{},!0,!0),l.complete&&c({target:l})})}))}),t.addEventListener("load",c,!0),e.addEventListener("lazybeforesizes",function(e){if(e.detail.instance==n&&e.target._lazybgset&&e.detail.dataAttr){var t=e.target._lazybgset,o=a(t);l[o]&&(e.target._lazysizesParentFit=o,n.rAF(function(){e.target.setAttribute("data-parent-fit",o),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit}))}},!0),t.documentElement.addEventListener("lazybeforesizes",function(e){!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==n&&(e.detail.width=s(e.target._lazybgset))})}})},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var l=n(0),s=o(l);n(2),n(9),n(1);var a=n(6),i=o(a),c=n(7),r=o(c),d=n(3),u=(o(d),n(8)),f=o(u),p=n(5),_=o(p),g=n(4),v=o(g);window.lazySizesConfig=window.lazySizesConfig||{},window.lazySizesConfig.init=!1,(0,s.default)(function(){function e(){lazySizes.init()}function t(e,t,n){var o=t-1;(0,s.default)(".section:eq("+o+")").addClass("load-bgs")}function n(e,t){var n=t-1,o=(0,s.default)(".section:eq("+n+")"),a=o.data("story"),i=o.data("index"),c=o.data("redirect"),r=(0,s.default)(".indicator"),d=fp_options.titles.filter(function(e){return e.story==a});r.find(".indicator__story").text(a),r.find(".indicator__index").text(i),d[0]&&d[0].title&&r.find(".indicator__title").text(d[0].title),c&&c.length>0&&(window.location=c),o.find(".bs-counter").length>0&&l.emit("runCounter")}function o(){s.default.fn.fullpage.moveSectionDown()}var l=window.mitt;(0,s.default)(".section__content").on("click",function(){return l.emit("close:all")}),(0,s.default)(document).keyup(function(e){27===e.keyCode&&l.emit("close:esc")}),(0,s.default)("#fullpage").fullpage({menu:"#fullpage-menu",recordHistory:!1,lazyLoading:!1,navigation:!1,afterRender:e,afterLoad:n,onLeave:t}),(0,i.default)(s.default.fn.fullpage),(0,r.default)(s.default.fn.fullpage),(0,f.default)(s.default.fn.fullpage),(0,_.default)(s.default.fn.fullpage),(0,v.default)(),(0,s.default)(document).on("click",".section__down",o)})}],[10]);