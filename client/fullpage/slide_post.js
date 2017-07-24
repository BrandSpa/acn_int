import { ScrollStop } from "./funs";

function slidePost($fp) {

  const emmiter = window.mitt;

  function closePost($postSection) {
    ScrollStop($fp, false);
    $postSection.removeClass("section__post--open");
    $(".section__close-post").removeClass("section__close-post--open");
  }

  function openPost($postSection) {
    ScrollStop($fp, true);
    $postSection.addClass("section__post--open");
    $(".section__close-post").addClass("section__close-post--open");

    emmiter.off("close:esc", () => closePost.call(this, $postSection));
    emmiter.off("close:all", () => closePost.call(this, $postSection));
    emmiter.on("close:esc", () => closePost.call(this, $postSection));
    emmiter.on("close:all", () => closePost.call(this, $postSection));
  }

  function handleTogglePost(e) {
    var $postSection = $(this).closest(".fp-tableCell").find(".section__post");

    if ($postSection.hasClass("section__post--open")) {
      closePost.call(this, $postSection);
    } else {
      openPost.call(this, $postSection);
    }
  }

  $(function() {
    $(document).on("click", ".section__open-post", handleTogglePost);
    $(document).on("click", ".section__close-post", handleTogglePost);
  })

}

export default slidePost;
