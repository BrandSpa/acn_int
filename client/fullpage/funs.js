import $ from "jquery";

export const ScrollStop = ($fp, stop = false) => {
  console.log(stop);
  if(stop) {
    $fp.setAllowScrolling(false);
    $fp.setKeyboardScrolling(false);
    $("body").addClass("scroll-stoped");
  } else {
    $fp.setAllowScrolling(true);
    $fp.setKeyboardScrolling(true);
    $("body").removeClass("scroll-stoped");
  }
}
