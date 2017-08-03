import fetchwp from "../lib/fetch_wp";

export const storeConvertLoop = (props, state) => {
  const add_tags = typeof props.cl.tags == "string"
    ? props.cl.tags.trim().split(",")
    : [];

  const data = { ...state.contact, add_tags };
  return fetchwp("convertloop_contact", data);
}

export const storeEventConvertLoop = (props, state) => {
  const { email, country } = state.contact;
  const data = { name: props.cl.event, country, person: { email } };
  return fetchwp("convertloop_event", data);
}

export const fetchOfficesCountries = () => {
  return fetchwp("office_countries");
}
