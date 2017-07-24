import { ScrollStop } from "./funs";

function nav($fp) {

  const emmiter = window.mitt;

  function openNav(e) {
    if(e) e.preventDefault();
    ScrollStop($fp, true);
    $(".fullpage-nav").addClass("fullpage-nav--open");
    $(".fullpage__menu").addClass("fullpage__menu--dark");

    emmiter.off("close:all", () => closeNav());
    emmiter.off("close:esc", () => closeNav());
    emmiter.on("close:all", () => closeNav());
    emmiter.on("close:esc", () => closeNav());
  }

  function closeNav(e) {
    if(e) e.preventDefault();
    ScrollStop($fp, false);
    $(".fullpage-nav").removeClass("fullpage-nav--open");
    $(".fullpage__menu").removeClass("fullpage__menu--dark");
  }

  $(".indicator").on("click", openNav);
  $(".fullpage-nav__close").on("click", closeNav);

}

export default nav;
