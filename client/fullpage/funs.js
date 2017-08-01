const emmiter = window.mitt;

export const stopScroll = ($fp) => {
  emmiter.on("stop:scroll", function() {
    console.log('stop');
    $fp.setAllowScrolling(false);
    $fp.setKeyboardScrolling(false);
    $("body").addClass("scroll-stoped");
  });
}

export const allowScroll = ($fp) => {
  emmiter.on("allow:scroll", function() {
    console.log('allow');
    $fp.setAllowScrolling(true);
    $fp.setKeyboardScrolling(true);
    $("body").removeClass("scroll-stoped");
  })
}
