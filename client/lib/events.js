import getCookies from "./cookies";
const cookies = getCookies();

export const eventGoogleAnalytics = ({category, action, label, value = 0}) => {
  return new Promise((resolve, reject) => {
    typeof ga === "function"
      ? ga("send", "event", category, action, label, value)
      : console.log("ga error");

    return resolve();
  })
}

export const eventFacebook = ({eventName = "Lead"}) => {
  return new Promise((resolve, reject) => {
    typeof fbq === "function"
      ? fbq("track", eventName)
      : console.log("fb error");

    return resolve();
  })
}

export const eventConvertloop = ({name, person = {}, metadata = {}}) => {
  person = {...person, pid: cookies.dp_pid};
  console.log(person);
  return new Promise((resolve, reject) => {
    typeof _dp === "function"
      ? _dp("track", name, {person, metadata})
      : console.log("_dp error");

    return resolve();
  });
}
