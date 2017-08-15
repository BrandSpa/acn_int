import cookies from './cookies';
import fetchwp from './fetch_wp';

export const runEvents = () => {
  const events = [
    'ga_event',
    'ga_ecm_event',
    'fb_event',
    'cl_event',
  ];

  events.forEach(eventName => {
    let dataStr = localStorage.getItem(eventName);

    if (dataStr !== null) {
      const data = JSON.parse(dataStr);
      fetchwp('store_event', {title: eventName, content: data})
      .then(() => runEvent(eventName, data) )
      .then(() => flushEvent(eventName) );
    }
  })
};

export const storeEvent = (name, options = {}) => {
  const p = new Promise((resolve, reject) => {
    localStorage.setItem( name, JSON.stringify(options) );
    return resolve({name, options});
  });

  return p;
};

export const eventGoogleEcommerce = ({ customerId, revenue }) => {
  const p = new Promise((resolve) => {
    if(typeof ga === 'function') {
      ga('ecommerce:addTransaction', {
        revenue,
        id: customerId,
        currency: 'USD',
      });

      ga('ecommerce:send');

      return resolve();
    }
  });

  return p;
};

export const eventGoogleAnalytics = (data) => {
  const { category, action, label, value = 0 } = data;

  const p = new Promise((resolve) => {
    typeof ga === 'function'
      ? ga('send', 'event', category, action, label, value, {
        hitCallback: () => resolve()
      })
      : console.log('ga error');
  });

  return p;
};

export const eventFacebook = ({eventName = 'Lead', content = {}}) => {
  const p = new Promise((resolve) => {
    typeof fbq === 'function'
      ? fbq('track', eventName, content)
      : console.log('fb error');

    return resolve();
  });

  return p;
};

export const eventConvertloop = ({ name, person = {}, metadata = {} }) => {
  const personWithPid = { ...person, pid: cookies.dp_pid };

  const p = new Promise((resolve) => {
    typeof _dp === 'function'
      ? _dp('track', name, { person: personWithPid, metadata })
      : console.log('_dp error');

    return resolve();
  });

  return p;
};

export const eventConvertloopAsync = ({ name, person = {}, metadata = {} }) => {
  const personWithPid = { ...person, pid: cookies.dp_pid };

  const p = fetchwp("convertloop_event", { name, metadata, person: personWithPid });
  return p;
};

const runEvent = (eventName, data) => {
  switch (eventName) {
    case 'ga_event':
      return eventGoogleAnalytics(data);
      break;
    case 'ga_ecm_event':
      return eventGoogleEcommerce(data);
      break;
    case 'fb_event':
      return eventFacebook(data);
      break;
    case 'cl_event':
      return eventConvertloop(data);
      break;
    default:
      return Promise.resolve();
  }

};

export const flushEvent = (name) => {
  localStorage.removeItem(name);
};
