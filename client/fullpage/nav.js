
function nav($fp) {

  function openNav() {
    $fp.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
    $(".fullpage-nav").addClass("fullpage-nav--open");
    $(".fullpage__menu").addClass("fullpage__menu--dark");

    emmiter.off("close:all", () => closeNav());
    emmiter.off("close:esc", () => closeNav());
    emmiter.on("close:all", () => closeNav());
    emmiter.on("close:esc", () => closeNav());
  }

  function closeNav() {
    $fp.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    $(".fullpage-nav").removeClass("fullpage-nav--open");
    $(".fullpage__menu").removeClass("fullpage__menu--dark");
  }

  $(".indicator").on("click", openNav);
  $(".fullpage-nav__close").on("click", closeNav);


}

export default nav;
