import React, { Component } from 'react';
import { storeConvertLoop } from '../actions/contact';
import { storeEvent } from '../lib/events';

const validate = (str) => {
  const s = typeof str === 'string' ? str.trim() : '';
  return s.length === 0;
};

class ContactCall extends Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    country: this.props.country,
    city: '',
    phone: '',
    prefix: this.props.prefixes[this.props.country],
    loading: false,
    errors: {
      name: false,
      lastname: false,
      email: false,
      country: false,
      city: false,
      phone: false,
    },
  }

  handleInputChange = (e, field) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const errors = Object.keys(this.state.errors).reduce((obj, field) => {
      const v = validate(this.state[field]);
      obj[field] = v;
      return obj;
    }, {});

    this.setState({ errors });

    const invalid = Object.keys(errors).some(err => errors[err]);
    return !invalid;
  }

  handleStore = async (e) => {
    e.preventDefault();
    const { convertloop, redirect } = this.props;
    this.setState({ loading: true });
    const contact = {
      name: `${this.state.name} ${this.state.lastname}`,
      phone: `${this.state.prefix} ${this.state.phone}`,
      country: this.state.country,
      city: this.state.city,
    };

    const isValid = this.isValid();
    console.log(contact);

    if (isValid) {
      try {
        await storeConvertLoop(convertloop.tags, contact);
        const language = window.bs.currentPageLang === 'Español' ? 'SP' : 'EN';

        const gaEventData = { category: 'SUBSCRIBE', action: 'SUBSCRIBE', label: `SUBSCRIBE_${language}` };
        await storeEvent('ga_event', gaEventData);

        const clEventData = { name: convertloop.event, person: contact };
        await storeEvent('cl_event', clEventData);

        const fbEventData = { eventName: 'Lead' };
        await storeEvent('fb_event', fbEventData);

        setTimeout(() => window.location = redirect, 0);
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { placeholders, texts, countries, prefixes } = this.props;
    const {
			name,
			lastname,
			email,
			country,
			city,
			phone,
			loading,
			prefix,
			errors,
		} = this.state;

    return (
      <section ref={ref => this.container = ref}>
        <form onSubmit={this.handleStore}>
          <div className={errors.name ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-person" /> <span>{placeholders.name}</span>
            </div>
            <input
              name="name"
              type="text"
              className="input-section__text"
              onChange={e => this.handleInputChange(e)}
              value={name}
            />
          </div>
          <div className={errors.lastname ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-person" /> <span>{placeholders.lastname}</span>
            </div>
            <input
              name="lastname"
              type="text"
              className="input-section__text"
              onChange={e => this.handleInputChange(e)}
              value={lastname}
            />
          </div>
          <div className={errors.email ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-person" /> <span>{placeholders.email}</span>
            </div>
            <input
              name="email"
              type="email"
              className="input-section__text"
              onChange={e => this.handleInputChange(e)}
              value={email}
            />
          </div>
          <div className={errors.country ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-location" /> <span>{placeholders.country}</span>
            </div>
            <select
              name="country"
              value={country}
              onChange={e => this.handleInputChange(e)}
              className="input-section__select"
            >
              { countries.map((countr, i) => (
                <option key={i} value={countr}>{countr}</option>
							))}
            </select>
          </div>
          <div className={errors.city ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-location" /> <span>{placeholders.city}</span>
            </div>
            <input
              name="city"
              type="text"
              className="input-section__text"
              onChange={e => this.handleInputChange(e)}
              value={city}
            />
          </div>
          <div className={errors.phone ? 'input-section input-err ' : 'input-section'}>
            <div className="input-section__placeholder">
              <i className="ion-iphone" /> <span>{placeholders.phone}</span>
            </div>
            <select className="prefix" name="prefix" value={prefix} onChange={e => this.handleInputChange(e)}>
              {prefixes && Object.keys(prefixes).map(contr => <option value={prefixes[contr]}>{`+ ${prefixes[contr]}`}</option>)}
            </select>
            <input
              name="phone"
              type="text"
              className="input-section__text"
              onChange={e => this.handleInputChange(e)}
              value={phone}
            />
          </div>
          <button disabled={loading}>{loading ? texts.loading : texts.btn}</button>
        </form>
        <style jsx>{`
							
					form button {
						height: 50px;
						width: 100%;
						background-color: #7ed321;
						font-size: 20px;
						font-weight: bold;
						text-align: center;
						color: #ffffff;
					}

					.input-section {
						display: flex;
						border: solid 1px #d0d0d0;
						height: 50px;
						width: 100%;
						justify-content: center;
						font-size: 16px;
						color: #1b1b1b;
						margin-bottom: 15px;
					}

					.input-err {
						border-color: red
					}

					.prefix {
						width: 50%;
						border: none;
						background: #f1f1f1;
						height: 100%;
						margin-left: 10px;
					}

					.input-section__placeholder {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-weight: bold;
					}

					.input-section__placeholder i {
						padding: 0 5px 0 15px;
						font-size: 18px;
					}

					.input-section__text, .input-section__select {
						border: none;
						height: auto;
					}

					input:invalid {

					}
				`}</style>
      </section>
    );
  }
}

export default ContactCall;
