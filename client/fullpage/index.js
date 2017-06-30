import $ from 'jquery';
import "fullpage.js";
import "lazysizes";
import './slide_post';
import './slide_video';

//lazyload configuration
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

$(function() {

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

  function handleAfterRender() {
    lazySizes.init();
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

  $(document).on("click", ".section__down", function goDown() {
    $.fn.fullpage.moveSectionDown();
  });

});
