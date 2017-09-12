import request from "axios";
import qs from "qs";
import { eventGoogleAnalytics, eventConvertloopAsync } from "./events";

export default () => {
  if($(".bs-donate a")) {
    $(".bs-donate a").text(bs.donate);
  }

  if($(".bs-donate")) {
    $(".bs-donate").on("click", function(e) {
      e.preventDefault();
      const $el = $(this);

      const txt = $el.text();
      
      if(txt) {
        $el.text(`${txt}...`);
      }


      eventGoogleAnalytics({category: "CLICK", action: "DONATE", label: "CLICKDONATE_EN"})
        .then(() => {
          return eventConvertloopAsync({name: "Donate Click"});
        })
        .then(() => {
          let data = qs.stringify({action: "donate_redirect_2"});

          if($el.attr('href') && $el.attr('href') !== '#' && $el.attr('href') !== '') {
            return window.location = $el.attr('href');
          }

          request
            .post("/wp-admin/admin-ajax.php", data)
            .then(res => {

              if(res.data !== false) {
                return window.location = res.data
              }

              return window.location = $el.attr('href');
            });

        })
    });
  }

};
