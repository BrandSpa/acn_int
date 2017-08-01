export const ScrollStop = ($fp, stop = false) => {
  console.log($fp, stop);
  if($fp.hasOwnProperty("setAllowScrolling")) {
    if(stop) {
      $fp.setAllowScrolling(false, "all");
      $fp.setKeyboardScrolling(false);
      $("body").addClass("scroll-stoped");
      return false;
    } else {
      $fp.setAllowScrolling(true);
      $fp.setKeyboardScrolling(true);
      $("body").removeClass("scroll-stoped");
    }
  }
}
