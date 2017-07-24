import { ScrollStop } from "./funs";

function mapPoints($fp) {

  const emmiter = window.mitt;

  function setMapSize() {
    $(".map-points").attr("width", $(window).width());
    $(".map-points").attr("height", $(window).height());

    if($(window).width() < 767 || $(window).width() <  991) {
      $(".map-points").attr("viewBox", "250 0 1920 1080");
      $(".map-points__spots").attr("transform", "translate(-40, 100)");
    }
  }

  function openSpotContent(e) {
    if(e) e.preventDefault();
    var content = $(this).data("content");
    if( $(`.spot-content.${content}`).length > 0 ) {
      ScrollStop($fp, true);
      $(`.spot-content.${content}`).addClass("spot-content--open");
      $(".section__close-spot-content").addClass("section__close-spot-content--open");

      $(document).on("click", `.spot-content.${content}`, function(e) {
        e.preventDefault();
        if(  $(e.target).attr("class") == `spot-content ${content} spot-content--open`) {
          closeSpotContent();
        }
      });
    }

  }

  function closeSpotContent(e) {
    if(e) e.preventDefault();
    ScrollStop($fp, false);
    $(".spot-content").removeClass("spot-content--open");
    $(".section__close-spot-content").removeClass("section__close-spot-content--open");
  }

  function openNinevehGeneralContent(e) {
    console.log("openNinevehGeneralContent");
    ScrollStop($fp, true);
    $(".section__close-nineveh-general").addClass("section__close-nineveh-general--open");
    $(".nineveh-general-content").addClass("nineveh-general-content--open")
  }

  function closeNinevehGeneralContent(e) {
    if($(".section__close-nineveh-general--open").length > 0) {
      ScrollStop($fp, false);
      $(".section__close-nineveh-general").removeClass("section__close-nineveh-general--open");
      $(".nineveh-general-content").removeClass("nineveh-general-content--open")
    }
  }

  setMapSize();

  //Events
  $(window).on("resize", () => {
    setMapSize();
    $fp.reBuild();
  });

  $(".map-points__spot").on("click", openSpotContent);
  $(".section__close-spot-content").on("click", closeSpotContent);
  $(".nineveh-general-point").on("click", openNinevehGeneralContent);
  $(".section__close-nineveh-general").on("click", closeNinevehGeneralContent);

  emmiter.on("close:esc", closeNinevehGeneralContent);
  emmiter.on("close:esc", closeSpotContent);
}


export default mapPoints;
