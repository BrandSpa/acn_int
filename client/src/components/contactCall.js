import React, { Component } from 'react';
import { storeConvertLoop } from '../actions/contact';
import { storeEvent } from '../lib/events';

class ContactCall extends Component {
	state = {
		name: '',
		lastname: '',
		country: this.props.country,
		city: '',
		phone: '',
		loading: false
	}

	handleInputChange = (e, field) => {
		this.setState({ [e.target.name]: e.target.value });
	} 

	handleStore = async (e) => {
		e.preventDefault();
		const { convertloop, redirect } = this.props;
		this.setState({ loading: true });
		const contact = this.state;
	
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
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		const { placeholders, texts, validation, countries } = this.props;
		const { name, lastname, country, city, phone, loading } = this.state;

		return (
			<section ref={ref => this.container = ref}>
				<form onSubmit={this.handleStore}>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-person"></i> <span>{placeholders.name}</span>
						</div>
						<input 
							name="name"
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e)}
							value={name}
							data-value-missing={validation.name}
							required
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-person"></i> <span>{placeholders.lastname}</span>
						</div>
						<input 
							name="lastname"
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e)}
							value={lastname} 
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-location"></i> <span>{placeholders.country}</span>
						</div>
						<select
							name="country"
							value={country} 
							onChange={(e) => this.handleInputChange(e)}
							className="input-section__select" 
						>
							{
								countries.map((country, i) => (
									<option key={i} value={country}>{country}</option>
								))
							}
						</select>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-location"></i> <span>{placeholders.city}</span>
						</div>
						<input
							name="city" 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e)}
							value={city} 
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-iphone"></i> <span>{placeholders.phone}</span>
						</div>
						<input 
							name="phone"
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e)}
							value={phone}
							data-value-missing={validation.phone}
							required 
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
		)
	}
}

export default ContactCall;
