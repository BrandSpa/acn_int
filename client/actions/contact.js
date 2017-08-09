import fetchwp from "../lib/fetch_wp";

export const storeConvertLoop = (tags, contact) => {
  let add_tags = typeof tags == "string"
    ? tags.trim().split(",")
    : [];

  add_tags = add_tags.filter(tag => tag !== '');

  const data = { ...contact, add_tags };
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
