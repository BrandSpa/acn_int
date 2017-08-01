import { ScrollStop } from "./funs";

function slidePost($fp) {

  const emmiter = window.mitt;

  function closePost($postSection) {
    if($(".section__post--open").length > 0) {
      emmiter.emit("allow:scroll");
      $(".section__post--open").removeClass("section__post--open");
      $(".section__close-post").removeClass("section__close-post--open");
    }
  }

  function openPost($postSection) {
    emmiter.emit("stop:scroll");
    $postSection.addClass("section__post--open");
    $(".section__close-post").addClass("section__close-post--open");
  }

  function handleTogglePost(e) {
    var $postSection = $(this).closest(".fp-tableCell").find(".section__post");

    if ($postSection.hasClass("section__post--open")) {
      closePost.call(this, $postSection);
    } else {
      openPost.call(this, $postSection);
    }
  }

  //Events
  $(document).on("click", ".section__open-post", handleTogglePost);
  $(document).on("click", ".section__close-post", handleTogglePost);
  emmiter.on("close:esc", closePost);
  emmiter.on("close:all", closePost);
}

export default slidePost;
