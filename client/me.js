import $ from "jquery";
import "fullpage.js";
import "lazysizes";

$(function() {
  $(document).on("click", ".section__open-post", function(e) {
    var $postSection = $(this).closest(".fp-tableCell").find(".section__post");
    if ($postSection.hasClass("section__post--open")) {
      $.fn.fullpage.setAllowScrolling(true);
      $postSection.removeClass("section__post--open");
    } else {
      $.fn.fullpage.setAllowScrolling(false);
      $postSection.addClass("section__post--open");
    }
  });

  $(document).on("click", ".section__down", function() {
    $.fn.fullpage.moveSectionDown();
  });
});
