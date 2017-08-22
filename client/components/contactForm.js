import React, { Component } from "react";
import isEmpty from "validator/lib/isEmpty";
import getCountries from "../lib/getCountries";
import { storeEvent } from "../lib/events";
import cookies from "../lib/cookies";

import {
  fetchOfficesCountries,
  storeConvertLoop,
  storeEventConvertLoop
} from "../actions/contact";

class contactForm extends Component {

  static defaultProps = {
    validationMessages: {},
    placeholders: {},
    texts: {},
    redirect: "",
    btnBg: "",
    cl: {
      event: "Subscription",
      tags: ""
    },
    vertical: false,
    terms: ""
  }

  state = {
    contact: {
      name: "",
      lastname: "",
      email: "",
      country: ""
    },
    errors: { name: false, lastname: false, email: false },
    countries: getCountries,
    officeCountries: [],
    inOffice: false,
    loading: false,
    showMemberExists: false,
    terms: true
  }

  componentDidMount() {
    this.setCountry();
  }

  setCountry = (res) => {
    const countries = this.props.countries;
    this.setState({
      contact: {
        ...this.state.contact,
        country: this.props.country
      },
      officeCountries: countries,
      inOffice: countries.indexOf(this.props.country) !== -1
    });
  }

  checkEmpty = field => {
    return  Object.keys(this.state.contact).indexOf(field) !== -1
      ? isEmpty(this.state.contact[field])
      : false;
  }

  validate = () => {
    let errors = {};
    let validations = Object.keys(this.state.errors).map(field => {
      let val =  this.checkEmpty(field);
      errors = { ...errors, [field]: val };
      return val;
    });

    if(this.props.terms == "true") {
      if( this.state.terms == false ) {
        errors = { ...errors, terms: true };
        validations = validations.concat(true);
      }
    }

    this.setState({ errors });

    return Promise.all(validations);
  }

  isValid = () => {
    return this.validate()
      .then(arr => arr.every(item => item == false))
      .catch(err => console.error(err));
  }

  handleSubmit = e => {
    e.preventDefault();

    this.isValid()
    .then(this.storeContact)
    .catch(err => console.log(err));
  }

  storeContact = isValid => {
    const {props, state} = this;
    if (isValid) {

      this.setState({ loading: true });

      storeConvertLoop(this.props.cl.tags, this.state.contact)
      .then(() => {
        const l = bs.currentPageLang == "Español" ? "SP" : "EN";
        const event = {category: "SUBSCRIBE", action: "SUBSCRIBE_PRAY", label: `PRAY_${l}`};
        return storeEvent("ga_event", event);
      })
      .then(() => {
        const event = {name: this.props.cl.event, person: this.state.contact};
        return storeEvent("cl_event", event);
      })
      .then(() => {
        const event = {eventName: "Lead"};
        return storeEvent("fb_event", event);
      })
      .then(() => {
        setTimeout(() => {
          window.location = this.props.redirect;
        }, 0);
      });
    }
  }

  handleChange = (field, e) => {
    let contact = { ...this.state.contact, [field]: e.target.value };
    this.setState({ contact });
  }

  handleCheckbox = () => {
    this.setState({terms: !this.state.terms});
  }

  render() {
    let { contact, errors } = this.state;
    let { placeholders, validationMessages, texts } = this.props;

    let inputContainerStyle = {
      width: this.props.vertical == "true" ? "100%" : "20%",
      "@media (maxWidth: 767px)": {
        width: "100%"
      }
    };

    let inputStyle = {
      borderRadius: this.props.vertical == "true" ? "0" : "",
    };

    return (
      <form
        style={{ textAlign: "center" }}
        className="form-inline contact-form"
        onSubmit={this.handleSubmit}
      >
        <div style={inputContainerStyle} className="input-container">
          <input
            type="text"
            placeholder={placeholders.name}
            onChange={this.handleChange.bind(null, "name")}
            value={contact.name}
            style={inputStyle}
          />
          <div className={errors.name ? "input-error" : "hidden"}>
            {errors.name} {validationMessages.name}
          </div>
        </div>
        <div style={inputContainerStyle} className="input-container">
          <input
            type="text"
            placeholder={placeholders.lastname}
            onChange={this.handleChange.bind(null, "lastname")}
            value={contact.lastname}
            style={inputStyle}
          />
          <div className={errors.lastname ? "input-error" : "hidden"}>
            {validationMessages.lastname}
          </div>
        </div>
        <div style={inputContainerStyle} className="input-container">
          <input
            type="text"
            placeholder={placeholders.email}
            onChange={this.handleChange.bind(null, "email")}
            value={contact.email}
            style={inputStyle}
          />
          <div className={errors.email ? "input-error" : "hidden"}>
            {validationMessages.email}
          </div>
        </div>
        <div style={inputContainerStyle} className="input-container">
          <select
            onChange={this.handleChange.bind(null, "country")}
            value={contact.country}
          >
            <option value="">{texts.select_country}</option>
            {this.state.countries.map((country, i) => (
              <option key={i} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <button
          style={{
            marginLeft: "-2px",
            background: this.props.btnBg,
            color: "#fff"
          }}
          className="btn"
          onClick={this.handleSubmit}
          disabled={this.state.loading}
        >
          {texts.button}{this.state.loading ? "..." : ""}
        </button>

        {this.props.terms == "true" ?
          <div className="checkbox">
            <label>
              <input type="checkbox" onChange={this.handleCheckbox} checked={this.state.terms} /> {this.props.texts.terms}
            </label>

          </div>
        : ""}

        <div className="input-container">
          <div className={errors.terms ? "input-error" : "hidden"}>
            {validationMessages.terms}
          </div>
        </div>

        <span
          style={
            this.state.showMemberExists
              ? {
                  color: "#fff",
                  display: "inline-block",
                  width: "90%",
                  padding: "10px",
                  margin: "5px auto",
                  background: "#f4334a",
                  color: "#fff"
                }
              : { display: "none" }
          }
        >
          {"you're already praying"}
        </span>
      </form>
    );
  }
}

export default contactForm;
