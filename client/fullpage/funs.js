

export const stopScroll = ($fp) => {
  const emmiter = window.mitt;
  console.log("stop", emmiter);
  emmiter.on("stop:scroll", function() {
    console.log('stop');
    $fp.setAllowScrolling(false);
    $fp.setKeyboardScrolling(false);
    $("body").addClass("scroll-stoped");
  });
}

export const allowScroll = ($fp) => {
  const emmiter = window.mitt;
  console.log("allow", emmiter);
  emmiter.on("allow:scroll", function() {
    console.log('allow');
    $fp.setAllowScrolling(true);
    $fp.setKeyboardScrolling(true);
    $("body").removeClass("scroll-stoped");
  })
}
