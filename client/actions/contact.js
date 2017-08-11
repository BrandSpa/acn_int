import fetchwp from "../lib/fetch_wp";
import cookies from "../lib/cookies";

export const storeConvertLoop = (tags, contact) => {
  let add_tags = typeof tags == "string"
    ? tags.trim().split(",")
    : [];

  add_tags = add_tags.filter(tag => tag !== '');
  const pid = cookies.dp_pid;
  const data = { ...contact, add_tags, pid };
  return fetchwp("convertloop_contact", data);
}

export const storeEventConvertLoop = (props, state) => {
  const { email, country } = state.contact;
  const pid = cookies.dp_pid;
  const data = { name: props.cl.event, country, person: { email, pid } };
  return fetchwp("convertloop_event", data);
}

export const fetchOfficesCountries = () => {
  return fetchwp("office_countries");
}
