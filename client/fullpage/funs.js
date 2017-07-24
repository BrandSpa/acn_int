
export const ScrollStop = ($fp, stop = false) => {
  console.log("ScrollStop", $fp, stop);
  
  if(stop) {
    $fp.setAllowScrolling(false);
    $("body").addClass("scroll-stoped");
  } else {
    $fp.setAllowScrolling(true);
    $("body").removeClass("scroll-stoped");
  }
}
