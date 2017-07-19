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

  $(document).keyup(function(e) {
    if (e.keyCode === 27) emmiter.emit("close:all");   // esc
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
    $indicator.find(".indicator__story").text(story);
    $indicator.find(".indicator__index").text(slideIndex);

    if(redirectUrl && redirectUrl.length > 0) window.location = redirectUrl;

    if( $section.find(".bs-counter").length > 0 ) {
      emmiter.emit("runCounter");
    }

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

  function goDown() {
    $.fn.fullpage.moveSectionDown();
  }

  $(document).on("click", ".section__down", goDown);

  function openNav() {
    $.fn.fullpage.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
    $(".fullpage-nav").addClass("fullpage-nav--open");
    $(".fullpage__menu").addClass("fullpage__menu--dark");

    emmiter.on("close:all", () => {
      closeNav();
    });
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

  function openSpotContent() {
    var content = $(this).data("content");

    if( $(`.spot-content.${content}`).length > 0 ) {
      $.fn.fullpage.setAllowScrolling(false);
      $("body").addClass("scroll-stoped");
      $(`.spot-content.${content}`).addClass("spot-content--open");
      $(".section__close-spot-content").addClass("section__close-spot-content--open");
      emmiter.off("close:all");
      emmiter.on("close:all", () => {
        if($('.section__close-spot-content--open')) {

        }

        setTimeout(function() {
          console.count('close spot');
        }, 0);

        // closeSpotContent();
      });
    }

  }

  $(".map-points__spot").on("click", openSpotContent);

  function closeSpotContent() {
    $.fn.fullpage.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    var content = $(this).data("content");
    $(".spot-content").removeClass("spot-content--open");
    $(".section__close-spot-content").removeClass("section__close-spot-content--open");
  }

  $(".section__close-spot-content").on("click", closeSpotContent);

  function setMapSize() {
    $(".map-points").attr("width", $(window).width());
    $(".map-points").attr("height", $(window).height());

    if($(window).width() < 767 || $(window).width() <  991) {
      $(".map-points").attr("viewBox", "250 0 1920 1080");
      $(".map-points__spots").attr("transform", "translate(-40, 100)");
    }
  }

  setMapSize();

  $(window).on("resize", function() {
    setMapSize();
    $.fn.fullpage.reBuild();
  });

  $(".section__down--end").on("click", function(e) {
    e.preventDefault();
    const url = $(this).data("redirect");
    window.location = url;
  })

});
