import getCookies from "./cookies";
const cookies = getCookies();

export const runEvents = () => {
  const events = [
    "ga_event",
    "fb_event",
    "cl_event"
  ];

  events.forEach(eventName => {
    let dataStr = localStorage.getItem(eventName);
    if(dataStr !== null) {
      console.log(dataStr);
      let data = JSON.parse(JSON.stringify(dataStr));
      runEvent(eventName, data).then(() => {
        console.log("flush");
        // flushEvent(eventName);
      });
    }
  })
}

const runEvent = (eventName, data) => {
  console.log(eventName, data);
  switch (eventName) {
    case "ga_event":
      return eventGoogleAnalytics(data);
      break;
    case "fb_event":
      return eventFacebook(data);
      break;
    case "cl_event":
      return eventConvertloop(data);
      break;
    default:
      return Promise.resolve();
  }
}

export const flushEvent = (name) => {
  localStorage.removeItem(name);
}

export const storeEvent = (name, options = {}) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem( name, JSON.stringify(options) );
    return resolve({name, options});
  })
}

export const eventGoogleAnalytics = ({category, action, label, value = 0}) => {
  return new Promise((resolve, reject) => {
    console.log(category, action, label);
    typeof ga === "function"
      ? ga("send", "event", category, action, label, value, {
        hitCallback: function() { return resolve(); }
      })
      : console.log("ga error");
  })
}

export const eventFacebook = ({eventName = "Lead", content = {}}) => {
  return new Promise((resolve, reject) => {
    typeof fbq === "function"
      ? fbq("track", eventName, content)
      : console.log("fb error");

    return resolve();
  })
}

export const eventConvertloop = ({name, person = {}, metadata = {}}) => {
  person = {...person, pid: cookies.dp_pid};
  return new Promise((resolve, reject) => {
    typeof _dp === "function"
      ? _dp("track", name, {person, metadata})
      : console.log("_dp error");

    return resolve();
  });
}
