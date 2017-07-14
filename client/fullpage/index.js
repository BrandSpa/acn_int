import $ from "jquery";
import "fullpage.js";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
import slidePost from  "./slide_post";
import slideVideo from "./slide_video";
import counter from "./counter";

//lazyload configuration
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

$(function domLoaded() {

  const emmiter = window.mitt;

  $(".section__content").on("click", () => emmiter.emit("close:all"));

  function handleAfterRender() {
    lazySizes.init();
  }

  function handleLeave(index, nextIndex, direction) {
    var next = nextIndex - 1;
    var $section = $(".section:eq(" + next + ")");
    $section.addClass("load-bgs");
  }

  function handleAfterLoad(section, index) {
    var next = index - 1;
    var $section = $(".section:eq(" + next + ")");
    var story = $section.data("story");
    var index = $section.data("index");
    var $indicator = $(".indicator");
    $indicator.find(".indicator__story").text(story);
    $indicator.find(".indicator__index").text(index);
    emmiter.emit("runCounter");
  }

  $("#fullpage").fullpage({
    menu: "#fullpage-menu",
    recordHistory: false,
    lazyLoading: false,
    navigation: true,
    afterRender: handleAfterRender,
    afterLoad: handleAfterLoad,
    onLeave: handleLeave
  });

  slidePost($.fn.fullpage);
  slideVideo($.fn.fullpage);

  function goDown() {
    $.fn.fullpage.moveSectionDown();
  }

  $(document).on("click", ".section__down", goDown);

  function openNav() {
    $.fn.fullpage.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
    $(".fullpage-nav").addClass("fullpage-nav--open");
    emmiter.on("close:all", () => {
      closeNav();
    });
  }

  function closeNav() {
    $.fn.fullpage.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    $(".fullpage-nav").removeClass("fullpage-nav--open");
  }

  $(".indicator").on("click", openNav);
  $(".fullpage-nav__close").on("click", closeNav);

  function toggleMenuShare() {
    const $a = $(".fullpage--menu__share > a");
    const $ul = $a.parent().find("ul");

    if($ul.hasClass("fullpage--menu__share--open")) {
      $a.find('i').removeClass('ion-close-round');
      $ul.removeClass("fullpage--menu__share--open");
    } else {
      $a.find('i').addClass('ion-close-round');
      $ul.addClass("fullpage--menu__share--open");
    }
  }

  $(".fullpage--menu__share > a").on("click", toggleMenuShare);

  function openSpotContent() {
    $.fn.fullpage.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
    var content = $(this).data("content");

    $(`.spot-content.${content}`).addClass("spot-content--open");
    $(`.section__close-spot-content[data-content="${content}"]`).addClass("section__close-spot-content--open");
    
    emmiter.on("close:all", () => {
      closeSpotContent.call(this);
    });

  }

  $(".map-points__spot").on("click", openSpotContent);

  function closeSpotContent() {
    $.fn.fullpage.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    var content = $(this).data("content");
    $(`.spot-content.${content}`).removeClass("spot-content--open");
  }

  $(".section__close-spot-content").on("click", closeSpotContent)

});
