import $ from "jquery";
import { ScrollStop } from "./funs";

function nav($fp) {

  const emmiter = window.mitt;

  function openNav(e) {
    if(e) e.preventDefault();
    ScrollStop($fp, true);
    $(".fullpage-nav").addClass("fullpage-nav--open");
    $(".fullpage__menu").addClass("fullpage__menu--dark");
  }

  function closeNav(e) {
    if($(".fullpage-nav--open").length > 0) {
      ScrollStop($fp, false);
      $(".fullpage-nav").removeClass("fullpage-nav--open");
      $(".fullpage__menu").removeClass("fullpage__menu--dark");
    }
  }

  //Events
  $(".indicator").on("click", openNav);
  $(".fullpage-nav__close").on("click", closeNav);
  $(".fullpage-nav a").on("click", closeNav);
  emmiter.on("close:all", closeNav);
  emmiter.on("close:esc", closeNav);

}

export default nav;
