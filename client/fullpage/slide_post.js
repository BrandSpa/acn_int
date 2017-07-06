
function slidePost($fp) {

  function closePost($postSection) {
    $fp.setAllowScrolling(true);
    $('body').removeClass('scroll-stoped');
    $postSection.removeClass("section__post--open");
    $('.section__close-post').removeClass('section__close-post--open');
  }

  function openPost($postSection) {
    $fp.setAllowScrolling(false);
    $('body').addClass('scroll-stoped');
    $postSection.addClass("section__post--open");
    $('.section__close-post').addClass('section__close-post--open');
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
