function mapPoints($fp) {

  function setMapSize() {
    $(".map-points").attr("width", $(window).width());
    $(".map-points").attr("height", $(window).height());

    if($(window).width() < 767 || $(window).width() <  991) {
      $(".map-points").attr("viewBox", "250 0 1920 1080");
      $(".map-points__spots").attr("transform", "translate(-40, 100)");
    }
  }

  setMapSize();

  $(window).on("resize", function() {
    setMapSize();
    $fp.reBuild();
  });


  function openSpotContent(e) {
    if(e) e.preventDefault();
    var content = $(this).data("content");

    if( $(`.spot-content.${content}`).length > 0 ) {
      $fp.setAllowScrolling(false);
      $("body").addClass("scroll-stoped");
      $(`.spot-content.${content}`).addClass("spot-content--open");
      $(".section__close-spot-content").addClass("section__close-spot-content--open");

      $(document).on('click', `.spot-content.${content}`, function(e) {
        e.preventDefault();
        if(  $(e.target).attr('class') == `spot-content ${content} spot-content--open`) {
          closeSpotContent();
        }
      });
    }

  }

  $(".map-points__spot").on("click", openSpotContent);

  function closeSpotContent(e) {
    if(e) e.preventDefault();
    $fp.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    var content = $(this).data("content");
    $(".spot-content").removeClass("spot-content--open");
    $(".section__close-spot-content").removeClass("section__close-spot-content--open");
  }

  $(".section__close-spot-content").on("click", closeSpotContent);


  function openNinevehGeneralContent(e) {
    if(e) e.preventDefault();
    $fp.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
    $(".section__close-nineveh-general").addClass("section__close-nineveh-general--open");
    $('.nineveh-general-content').addClass('nineveh-general-content--open')
  }

  $('.nineveh-general-point').on('click', openNinevehGeneralContent);

}


export default mapPoints;
