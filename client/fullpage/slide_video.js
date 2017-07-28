import $ from "jquery";
import { ScrollStop } from "./funs";

function slideVideo($fp) {

  const emmiter = window.mitt;

  function closeVideo($videoSection) {
    if($videoSection.length > 0) {
      ScrollStop($fp, false);
      var $iframe = $videoSection.find("iframe");
      $iframe.attr("src", "");
      $videoSection.removeClass("section__video--open");
    }
  }

  function openVideo($videoSection) {
    ScrollStop($fp, true);
    $videoSection.addClass("section__video--open");
    var $iframe = $videoSection.find("iframe");
    var src = $iframe.data("src");
    $iframe.attr("src", src);
    emmiter.off("close:esc", () => closeVideo($videoSection));
    emmiter.on("close:esc", () => closeVideo($videoSection));
  }

  function handleToggleVideo(e) {
    if(e) e.preventDefault();

    var $videoSection = $(this).closest(".fp-tableCell").find(".section__video");

    if ($videoSection.hasClass("section__video--open")) {
      closeVideo($videoSection);
    } else {
      openVideo($videoSection);
    }

  }

  $(document).on("click", ".section__open-video", handleToggleVideo);
}

export default slideVideo;
