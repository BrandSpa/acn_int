webpackJsonp([0],[,,,function(e,t,a){"use strict";function n(){}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,a){"use strict";function n(e){function t(t){e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped"),t.removeClass("section__post--open"),$(".section__close-post").removeClass("section__close-post--open")}function a(t){e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),t.addClass("section__post--open"),$(".section__close-post").addClass("section__close-post--open")}function n(e){var n=$(this).closest(".fp-tableCell").find(".section__post");n.hasClass("section__post--open")?t.call(this,n):a.call(this,n)}$(function(){$(document).on("click",".section__open-post",n),$(document).on("click",".section__close-post",n)})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,a){"use strict";function n(e){function t(){e.setAllowScrolling(!0),$("body").removeClass("scroll-stoped");var t=$(this).parent();t.find("iframe").attr("src",""),t.removeClass("section__video--open")}function a(t){e.setAllowScrolling(!1),$("body").addClass("scroll-stoped"),t.addClass("section__video--open");var a=t.find("iframe"),n=a.data("src");a.attr("src",n)}function n(e){var n=$(this).closest(".fp-tableCell").find(".section__video");n.hasClass("section__video--open")?t.call(this):a.call(this,n)}$(function(){$(document).on("click",".section__open-video",n)})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,a){!function(t,n){var l=function(){n(t.lazySizes),t.removeEventListener("lazyunveilread",l,!0)};n=n.bind(null,t,t.document),"object"==typeof e&&e.exports?n(a(1)):t.lazySizes?l():t.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,a){"use strict";if(e.addEventListener){var n=/\(|\)|'/,l={contain:1,cover:1},o=function(e){var t=a.gW(e,e.parentNode);return(!e._lazysizesWidth||t>e._lazysizesWidth)&&(e._lazysizesWidth=t),e._lazysizesWidth},s=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!l[t]&&l[e.style.backgroundSize]&&(t=e.style.backgroundSize),t},i=function(e,a,n){var l=t.createElement("picture"),o=a.getAttribute(lazySizesConfig.sizesAttr),s=a.getAttribute("data-ratio"),i=a.getAttribute("data-optimumx");a._lazybgset&&a._lazybgset.parentNode==a&&a.removeChild(a._lazybgset),Object.defineProperty(n,"_lazybgset",{value:a,writable:!0}),Object.defineProperty(a,"_lazybgset",{value:l,writable:!0}),e=e.replace(/\s+/g," ").split(/\s*\|\s+|\s+\|\s*/g),l.style.display="none",n.className=lazySizesConfig.lazyClass,1!=e.length||o||(o="auto"),e.forEach(function(e){var a=t.createElement("source");o&&"auto"!=o&&a.setAttribute("sizes",o),e.match(/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/)&&(a.setAttribute(lazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&a.setAttribute("media",lazySizesConfig.customMedia[RegExp.$2]||RegExp.$2)),l.appendChild(a)}),o&&(n.setAttribute(lazySizesConfig.sizesAttr,o),a.removeAttribute(lazySizesConfig.sizesAttr),a.removeAttribute("sizes")),i&&n.setAttribute("data-optimumx",i),s&&n.setAttribute("data-ratio",s),l.appendChild(n),a.appendChild(l)},d=function(e){if(e.target._lazybgset){var t=e.target,l=t._lazybgset,o=t.currentSrc||t.src;o&&(l.style.backgroundImage="url("+(n.test(o)?JSON.stringify(o):o)+")"),t._lazybgsetLoading&&(a.fire(l,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(e){var n,l,o;!e.defaultPrevented&&(n=e.target.getAttribute("data-bgset"))&&(o=e.target,l=t.createElement("img"),l.alt="",l._lazybgsetLoading=!0,e.detail.firesLoad=!0,i(n,o,l),setTimeout(function(){a.loader.unveil(l),a.rAF(function(){a.fire(l,"_lazyloaded",{},!0,!0),l.complete&&d({target:l})})}))}),t.addEventListener("load",d,!0),e.addEventListener("lazybeforesizes",function(e){if(e.detail.instance==a&&e.target._lazybgset&&e.detail.dataAttr){var t=e.target._lazybgset,n=s(t);l[n]&&(e.target._lazysizesParentFit=n,a.rAF(function(){e.target.setAttribute("data-parent-fit",n),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit}))}},!0),t.documentElement.addEventListener("lazybeforesizes",function(e){!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==a&&(e.detail.width=o(e.target._lazybgset))})}})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(0),o=n(l);a(2),a(6),a(1);var s=a(4),i=n(s),d=a(5),r=n(d),c=a(3);n(c);window.lazySizesConfig=window.lazySizesConfig||{},window.lazySizesConfig.init=!1,(0,o.default)(function(){function e(){lazySizes.init()}function t(e,t,a){var n=t-1;(0,o.default)(".section:eq("+n+")").addClass("load-bgs")}function a(e,t){var a=t-1,n=(0,o.default)(".section:eq("+a+")"),l=n.data("story"),t=n.data("index"),s=(0,o.default)(".indicator");s.find(".indicator__story").text(l),s.find(".indicator__index").text("/"+t),window.mitt.emit("runCounter")}function n(){o.default.fn.fullpage.setAllowScrolling(!1),(0,o.default)("body").addClass("scroll-stoped");var e=(0,o.default)(this).data("content");(0,o.default)(".spot-content."+e).addClass("spot-content--open"),(0,o.default)('.section__close-spot-content[data-content="'+e+'"]').addClass("section__close-spot-content--open")}function l(){o.default.fn.fullpage.setAllowScrolling(!0),(0,o.default)("body").removeClass("scroll-stoped");var e=(0,o.default)(this).data("content");(0,o.default)(".spot-content."+e).removeClass("spot-content--open")}(0,o.default)("#fullpage").fullpage({menu:"#fullpage-menu",recordHistory:!1,lazyLoading:!1,navigation:!0,afterRender:e,afterLoad:a,onLeave:t}),(0,i.default)(o.default.fn.fullpage),(0,r.default)(o.default.fn.fullpage),(0,o.default)(document).on("click",".section__down",function(){o.default.fn.fullpage.moveSectionDown()}),(0,o.default)(".indicator").on("click",function(){o.default.fn.fullpage.setAllowScrolling(!1),(0,o.default)("body").addClass("scroll-stoped"),(0,o.default)(".fullpage-nav").addClass("fullpage-nav--open")}),(0,o.default)(".fullpage-nav__close").on("click",function(){o.default.fn.fullpage.setAllowScrolling(!0),(0,o.default)("body").removeClass("scroll-stoped"),(0,o.default)(".fullpage-nav").removeClass("fullpage-nav--open")}),(0,o.default)(".fullpage--menu__share > a").on("click",function(){var e=(0,o.default)(".fullpage--menu__share > a"),t=e.parent().find("ul");t.hasClass("fullpage--menu__share--open")?(e.find("i").removeClass("ion-close-round"),t.removeClass("fullpage--menu__share--open")):(e.find("i").addClass("ion-close-round"),t.addClass("fullpage--menu__share--open"))}),(0,o.default)(".map-points__spot").on("click",n),(0,o.default)(".section__close-spot-content").on("click",l)})}],[7]);