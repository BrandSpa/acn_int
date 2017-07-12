import * as actions from "../../../client/actions/donate";
import moxios from "moxios";
import qs from "qs";
const endpoint = "/wp-admin/admin-ajax.php";

describe("donate actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("fetch countries", () => {
    const response = ["Argentina", "Colombia"];
    moxios.stubRequest(endpoint, { response });
    return actions
      .fetchCountries()
      .then(countries => expect(countries).toEqual(response));
  });

  it("stripe token", () => {
    const state = { stripe: { card_type: "" } };
    const response = { id: "token_12345" };
    moxios.stubRequest(endpoint, { response });
    return actions
      .stripeToken(state)
      .then(res =>
        expect(res).toEqual(response)
      );
  });

  it("Stripe Charge", () => {
    const state = {
      contact: {},
      currency: "",
      amount: "",
      donation_type: "",
      trial_period_days: 30,
      stripe: { token: "" }
    };

  const exptected =  {
    currency: "",
    amount: "",
    donation_type: "",
    trial_period_days: "30",
    stripe_token: ""
  };

    const response = { customer: "cus_123", id: "id_123" };

    moxios.stubRequest(endpoint, { response });

    return actions
      .stripeCharge(state)
      .then(res => {
        const dataSend = qs.parse(res.config.data);
        expect(dataSend.data).toEqual(exptected);
        expect(res.data).toEqual(response);
      });
  });

  it("convertloop store", () => {
    const state = { contact: {} };
    const response = { ok: true };
    moxios.stubRequest(endpoint, { response });
    return actions
      .storeConvertLoop(state)
      .then(res => expect(res.data).toEqual(response));
  });

  it("convertLoop store event", () => {
    const state = {
      contact: { email: "", country: "" },
      amount: "",
      donation_type: "monthly"
    };

    let expected = {
      name: `Donation-monthly`,
      person: { email: "" },
      country: "",
      metadata: {
        type: "monthly",
        amount: ""
      }
    };

    const response = { ok: true };
    moxios.stubRequest(endpoint, { response });

    return actions.storeEventConvertLoop(state).then(res => {
      const dataSend = qs.parse(res.config.data);
      expect(res.data).toEqual(response);
      expect(expected).toEqual(dataSend.data);
    });
  });

  it("store infusion", () => {
    const state = {
      donation_type: "monthly",
      contact: { country: "", email: "", name: "" }
    };
    const response = { ok: true };
    let expected = { country: "", email: "", name: "", tags: ["870", "924"] };
    moxios.stubRequest(endpoint, { response });

    return actions.storeInfusion(state).then(res => {
      const data = qs.parse(res.request.config.data);
      expect(expected).toEqual(data.data);
      expect(res.data).toEqual(response);
    });
  });

  it("complete transaction", () => {
    const state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: "monthly",
      amount: 30,
      currency: "usd",
      countries: [],
      contact: { name: "", email: "", country: "" },
      stripe: {
        card_type: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        token: ""
      },
      errors: { stripe: {}, contact: {} }
    };

    const response = {};

    moxios.stubRequest(endpoint, { response });

    return actions.storeConvertLoop(state)
      .then(actions.storeEventConvertLoop.bind(null, state))
      .then(actions.storeInfusion)
      .then(res => console.log(res.data));
  });
});
