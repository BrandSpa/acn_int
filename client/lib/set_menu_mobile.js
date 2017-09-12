const setMenuMobile = function() {
  const $menu = $('.menu--mobile');
  const currentLang = $('.menu--mobile .current-lang > a');
  $('.menu--mobile .current-lang').addClass('dropdown');
  $('.menu--mobile .current-lang').append('<div class="dropdown-content"></div>');

  const langs = $('.menu--mobile .lang-item').not($('.current-lang'));

  langs.each(function() {
    $menu.find('.dropdown-content').append($(this).html());
    $(this).remove();
  });

  $(".open-menu").on("click", () => {
    if ($(".menu--mobile").hasClass("menu--mobile--open")) {
      $(document.body).removeClass("menu-open");
      $(".menu--mobile").removeClass("menu--mobile--open");
    } else {
      $(document.body).addClass("menu-open");
      $(".menu--mobile").addClass("menu--mobile--open");
    }
  });

  $(".close-menu").on("click", (e) => {
    $(document.body).removeClass("menu-open");
    $(".menu--mobile").removeClass("menu--mobile--open");
  });

};

export default setMenuMobile;
