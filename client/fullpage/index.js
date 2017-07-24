import $ from "jquery";
import "fullpage.js";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
import slidePost from  "./slide_post";
import slideVideo from "./slide_video";
import counter from "./counter";
import slideMap from "./spot";

//lazyload configuration
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

$(function domLoaded() {

  const emmiter = window.mitt;

  $(".section__content").on("click", () => emmiter.emit("close:all"));

  $(document).keyup(function(e) {
    if (e.keyCode === 27) emmiter.emit("close:esc");   // esc
  });

  function handleAfterRender() {
    lazySizes.init();
  }

  function handleLeave(index, nextIndex, direction) {
    var next = nextIndex - 1;
    var $section = $(".section:eq(" + next + ")");
    $section.addClass("load-bgs");
  }

  function handleAfterLoad(section, index) {
    let next = index - 1;
    let $section = $(".section:eq(" + next + ")");
    let story = $section.data("story");
    let slideIndex = $section.data("index");
    let redirectUrl = $section.data("redirect");
    let $indicator = $(".indicator");
    let title = fp_options["titles"].filter(title => title.story == story);

    $indicator.find(".indicator__story").text(story);
    $indicator.find(".indicator__index").text(slideIndex);

    if(title[0] && title[0].title) {
      $indicator.find(".indicator__title").text(title[0].title);
    }

    if(redirectUrl && redirectUrl.length > 0) window.location = redirectUrl;

    if( $section.find(".bs-counter").length > 0 ) emmiter.emit("runCounter");
  }

  $("#fullpage").fullpage({
    menu: "#fullpage-menu",
    recordHistory: false,
    lazyLoading: false,
    navigation: false,
    afterRender: handleAfterRender,
    afterLoad: handleAfterLoad,
    onLeave: handleLeave
  });

  slidePost($.fn.fullpage);
  slideVideo($.fn.fullpage);
  slideMap($.fn.fullpage);

  function goDown() {
    $.fn.fullpage.moveSectionDown();
  }

  $(document).on("click", ".section__down", goDown);

  function openNav() {
    $.fn.fullpage.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
    $(".fullpage-nav").addClass("fullpage-nav--open");
    $(".fullpage__menu").addClass("fullpage__menu--dark");

    emmiter.off("close:all", () => closeNav());
    emmiter.off("close:esc", () => closeNav());

    emmiter.on("close:all", () => closeNav());
    emmiter.on("close:esc", () => closeNav());

  }

  function closeNav() {
    $.fn.fullpage.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    $(".fullpage-nav").removeClass("fullpage-nav--open");
    $(".fullpage__menu").removeClass("fullpage__menu--dark");
  }

  $(".indicator").on("click", openNav);
  $(".fullpage-nav__close").on("click", closeNav);

  function toggleMenuShare() {
    const $a = $(".fullpage__menu__share > a");
    const $ul = $a.parent().find("ul");

    if($ul.hasClass("fullpage__menu__share--open")) {
      $a.find("i").removeClass("ion-close-round");
      $ul.removeClass("fullpage__menu__share--open");
    } else {
      $a.find("i").addClass("ion-close-round");
      $ul.addClass("fullpage__menu__share--open");
    }
  }

  $(".fullpage__menu__share > a").on("click", toggleMenuShare);


  $(".section__down--end").on("click", function(e) {
    e.preventDefault();
    const url = $(this).data("redirect");
    window.location = url;
  })



});
