import $ from "jquery";
import { ScrollStop } from "./funs";

function modal($fp) {
  const emmiter = window.mitt;

  function openModal(e) {
    if(e) e.preventDefault();
    ScrollStop($fp, true);
    let modalName = $(this).attr("href").replace("#", "");
    let $modal = $(`.section__modal[data-modal="${modalName}"]`);
    $modal.addClass("section__modal--open");
  }

  function closeModal() {
    if($(".section__modal--open").length > 0) {
      ScrollStop($fp, false);
      let $modal = $(".section__modal--open");
      $modal.removeClass("section__modal--open");
    }
  }

  $(".open-modal").on("click", openModal);
  $(".section__modal__close-modal").on("click", closeModal);
  emmiter.on("close:esc", closeModal);

}

export default modal;
