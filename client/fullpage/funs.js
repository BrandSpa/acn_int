
export function ScrollStop($fp, stop = false) {
  if(stop) {
    $fp.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
  } else {
    $fp.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
  }
}
