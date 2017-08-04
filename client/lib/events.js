
export const eventGoogleAnalytics = ({category, action, label}) => {
  return new Promise((resolve, reject) => {
    typeof ga === "function"
      ? ga("send", "event", category, action, label)
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

export const eventConvertloop = () => {
  return new Promise((resolve, reject) => {
    typeof _dp === "function"
      ? _dp("track", "Billed")
      : console.log("_dp error");

    return resolve();
  });
}
