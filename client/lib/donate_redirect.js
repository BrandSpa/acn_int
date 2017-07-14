import request from 'axios';
import qs from 'qs';

export default () => {
  if($('.bs-donate a')) {
    $('.bs-donate a').text(bs.donate);
  }

  if($('.bs-donate')) {
    $('.bs-donate').on('click', e => {

      e.preventDefault();
      if(ga !== undefined) ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);

      let data = qs.stringify({action: 'donate_redirect'});

      request
        .post('/wp-admin/admin-ajax.php', data)
        .then(res => window.location = res.data);

    });
  }

};
