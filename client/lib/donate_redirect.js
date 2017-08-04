import request from "axios";
import qs from "qs";
import {eventGoogleAnalytics, eventConvertloop} from "./events";

"Donate Click"
export default () => {
  if($(".bs-donate a")) {
    $(".bs-donate a").text(bs.donate);
  }

  if($(".bs-donate")) {
    $(".bs-donate").on("click", e => {
      e.preventDefault();

      eventGoogleAnalytics({category: "CLICK", action: "DONATE", label: "CLICKDONATE_EN"})
        .then(() => {
          return eventConvertloop({name: "Donate Click"});
        })
        .then(() => {
          let data = qs.stringify({action: "donate_redirect"});
          request
            .post("/wp-admin/admin-ajax.php", data)
            .then(res => window.location = res.data);
        })
    });
  }

};
