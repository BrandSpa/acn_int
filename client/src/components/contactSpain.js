import React, { Component } from 'react';
import spainProvinces from '../lib/provinces_spain';
import SelectArrow from './selectArrow';

class ContactSpain extends Component {
	state = {
		'name': '',
		'lastname': '',
		'email': '',
		'country': '',
		'postalCode': '',
		'province': '',
		'terms': false
	}

	handleChange = e => 
		this.setState({ [e.target.name]: e.target.value })

	handleTerms = e => 
		this.setState({ terms: !this.state.terms })

	handleSubmit = e => {
		e.preventDefault();
		if(this.state.terms) {
			console.log(this.state);
		}
	
	}
	
	render() {
		const { 
			name, 
			lastname, 
			email, 
			country, 
			postalCode, 
			province,
			terms
		} = this.state;

		const {
			countries,
			placeholder = {name: 'Nombre'},
			texts = {'terms': 'He leído y acepto el “Aviso de Privacidad” y la “Política de Privacidad” de Ayuda a la Iglesia Necesitada.'}
		} = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col-12 col-6-m col-4-l">
						<input 
							type="text"
							name="name" 
							placeholder={placeholder.name}
							value={name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<input 
							type="text" 
							name="lastname" 
							placeholder={placeholder.name}
							value={lastname}
							onChange={this.handleChange}
						/>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<input 
							type="email" 
							name="email" 
							placeholder={placeholder.name}
							value={email}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-6-m col-4-l">
						<div className="select-container">
							<select name="country" id="">
								{countries.map(country => 
									<option value={country}>{country}</option>
								)}
							</select>
							<SelectArrow />
						</div>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<input 
							type="text" 
							placeholder={'Código postal'}
							onChange={this.handleChange}
							value={postalCode}
						/>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<div className="select-container">
							<select name="province" id="">
								{spainProvinces.map(province => 
									<option value={province.name}>{province.name}</option>
								)}
							</select>
							<SelectArrow />
						</div>
					</div>
				</div>
				<div className="checkbox">
            <label htmlFor="terms">
              <input 
								id="terms" 
								type="checkbox" 
								onChange={this.handleTerms} 
								checked={terms} /> {'He leído y acepto el “Aviso de Privacidad” y la “Política de Privacidad” de Ayuda a la Iglesia Necesitada.'}
            </label>
          </div>
					<button>{'Rezar'}</button>
				<style jsx>{`
					input, select {
						height: 40px;
						width: 100%;
						font-size: 14px;
						color: #2B3740;
						background: #fff;
						border: 2px solid #2B3740;
						font-family: 'Open Sans';
						border-radius: 5px;
						margin-bottom: 20px !important;
					}

					button {
						display: flex;
						background: #FC3938;
						text-align: center;
						font-family: 'Open Sans';
						font-weight: 600;
						font-size: 23px;
						width: 100%;
						padding: 5px 0 7px 0;
						margin: 0 auto;
    				box-sizing: content-box;
						align-self: center;
    				justify-content: center;
						
					}

					#terms {
						width: 15px;
						height: 15px;
						top: 5px;
					}

					.checkbox {
						display: flex;
						justify-content: center;
						color: #fff;
						font-size: 12px;
						font-weight: 600;
					}

					.select-container {
						position: relative;
					}

					@media (min-width: 992px) {
						input, select {
							height: 50px;
							font-size: 16px;
						}
						
						.checkbox {
							font-size: 20px;
						}

						button {
							font-size: 35px;
							width: 380px;
						}
					}

				`}</style>
			</form>
		)
	}
}

export default ContactSpain;
