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
							<i className="ion-person"></i> {placeholders.lastname}
						</div>
						<input 
							type="text" 
							className="input-section__text" 
							onChange={(e) => this.handleInputChange(e, 'lastname')}
							value={lastname} 
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
					<button>{texts.btn}</button>
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
					}

					.input-section__placeholder {
						display: flex;
						flex-direction: row;
						align-items: center;
					}

					.input-section__placeholder i {
						padding: 0 5px 0 15px;
					}

					.input-section__text, .input-section__select {
						border: none;
					}
				`}</style>
			</section>
		)
	}
}

export default ContactCall;
