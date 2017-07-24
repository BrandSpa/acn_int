import { ScrollStop } from "./funs";

function slideVideo($fp) {

  const emmiter = window.mitt;

  function closeVideo() {
    ScrollStop($fp, false);
    var $videoSection = $(this).parent();
    var $iframe = $videoSection.find("iframe");
    $iframe.attr("src", "");
    $videoSection.removeClass("section__video--open");
    console.log('close video', $videoSection);
  }

  function openVideo($videoSection) {
    ScrollStop($fp, true);
    $videoSection.addClass("section__video--open");
    var $iframe = $videoSection.find("iframe");
    var src = $iframe.data("src");
    $iframe.attr("src", src);
    console.log('open video', this);
    emmiter.off("close:esc", () => closeVideo.bind(this));
    emmiter.on("close:esc", () => closeVideo.bind(this));
  }

  function handleToggleVideo(e) {
    if(e) e.preventDefault();

    var $videoSection = $(this).closest(".fp-tableCell").find(".section__video");

    if ($videoSection.hasClass("section__video--open")) {
      closeVideo.call(this);
    } else {
      openVideo.call(this, $videoSection);
    }

  }

  $(document).on("click", ".section__open-video", handleToggleVideo);
}

export default slideVideo;
