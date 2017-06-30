
function slidePost($fp) {

  function closePost($postSection) {
    $fp.setAllowScrolling(true);
    $postSection.removeClass("section__post--open");
    $(this).find("i").removeClass("ion-close-round");
    $(this).find("i").addClass("ion-android-open");
  }

  function openPost($postSection) {
    $fp.setAllowScrolling(false);
    $postSection.addClass("section__post--open");
    $(this).find("i").removeClass("ion-android-open");
    $(this).find("i").addClass("ion-close-round");
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
  })

}