import request from 'axios';
import qs from 'qs';
import { eventGoogleAnalytics, eventConvertloopAsync } from './events';

export default () => {
  if ($('.bs-donate a')) {
    $('.bs-donate a').text(window.bs.donate);
  }

  if ($('.bs-donate')) {
    $('.bs-donate').on('click', function onClickDonate(e) {
      e.preventDefault();
      const $el = $(this);

      eventGoogleAnalytics({ category: 'CLICK', action: 'DONATE', label: 'CLICKDONATE_EN' })
        .then(() => eventConvertloopAsync({ name: 'Donate Click' }))
        .then(() => {
          const data = qs.stringify({ action: 'donate_redirect_2' });

          if ($el.attr('href') && $el.attr('href') !== '#' && $el.attr('href') !== '') {
            window.location = $el.attr('href');
          }

          request
            .post('/wp-admin/admin-ajax.php', data)
            .then((res) => {
              if (res.data !== false) {
                window.location = res.data;
              }

              window.location = $el.attr('href');
            });
        });
    });
  }
};
