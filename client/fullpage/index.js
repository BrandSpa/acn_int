import $ from 'jquery';
import "fullpage.js";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
import slidePost from  './slide_post';
import slideVideo from './slide_video';

//lazyload configuration
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

$(function domLoaded() {

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
    $indicator.find(".indicator__index").text("/" + index);
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

  $(document).on("click", ".section__down", function goDown() {
    $.fn.fullpage.moveSectionDown();
  });

  $('.indicator').on('click', function openNav() {
    $('.fullpage-nav').addClass('fullpage-nav--open');
  });

  $('.fullpage-nav__close').on('click', function closeNav() {
    $('.fullpage-nav').removeClass('fullpage-nav--open');
  });

});
