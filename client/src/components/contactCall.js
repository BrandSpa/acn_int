import React, { Component } from 'react';

class ContactCall extends Component {
	state = {
		name: '',
		lastname: '',
		country: this.props.country,
		city: '',
		phone: ''
	}

	handleInputChange = (e, field) => {
		this.setState({ [field]: e.target.value });
	} 

	render() {
		const { placeholders, texts, countries } = this.props;
		const { name, lastname, country, city, phone } = this.state;

		return (
			<section>
				<form>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-person"></i> {placeholders.name}
						</div>
						<input 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e, 'name')}
							value={name}
							required
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-person"></i> {placeholders.lastame}
						</div>
						<input 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e, 'lastname')}
							value={lastame} 
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-location"></i> {placeholders.country}
						</div>
						<select 
							value={country} 
							onChange={(e) => this.handleInputChange(e, 'country')}
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
							<i className="ion-location"></i> {placeholders.city}
						</div>
						<input 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e, 'city')}
							value={city} 
						/>
					</div>
					<div className="input-section">
						<div className="input-section__placeholder">
							<i className="ion-iphone"></i> {placeholders.phone}
						</div>
						<input 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e, 'phone')}
							value={phone}
							required 
						/>
					</div>
				</form>
			</section>
		)
	}
}

export default ContactCall;
