import React, { Component } from 'react';
import spainProvinces from '../../src/lib/spain_provinces';

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
	
	render() {
		const { 
			name, 
			lastname, 
			email, 
			country, 
			postalCode, 
			province 
		} = this.state;

		const {
			placeholder = {name: 'Nombre'},
			texts = {'terms': 'He leído y acepto el “Aviso de Privacidad” y la “Política de Privacidad” de Ayuda a la Iglesia Necesitada.'}
		} = this.props;

		return (
			<form>
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
							value={lastame}
							onChange={this.handleChange}
						/>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<input 
							type="text" 
							name="email" 
							placeholder={placeholder.name}
							value={email}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-6-m col-4-l">
						<select name="" id="">
							<option value="Country">Country</option>
						</select>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<input type="text"/>
					</div>
					<div className="col-12 col-6-m col-4-l">
						<select name="" id="">
							{spainProvinces.map(province => 
								<option value={province.name}>{province.name}</option>
							)}
						</select>
					</div>
				</div>
				<div className="checkbox">
            <label htmlFor="terms">
              <input id="terms" 
								type="checkbox" 
								onChange={this.handleTerms} 
								checked={terms} /> {this.props.texts.terms}
            </label>
          </div>
					<button>{'Rezar'}</button>
				<style jsx>{`
					input, select {
						height: 40px;
						width: 100%;
						font-size: 14px;
						color: #2B3740;
						border: 2px solid #2B3740;
						padding: 15px 20px;
						font-family: 'Open Sans';

					}

					button {
						background: #FC3938;
						padding: 12px 0;
						text-align: center;
						font-family: 'Open Sans';
						font-weight: 600;
						font-size: 23px;
					}

					@media (min-width: 992px) {
						input, select {
							height: 50px;
							font-size: 16px;
						}

						button {
							font-size: 35px;
						}
					}

				`}</style>
			</form>
		)
	}
}

export default ContactSpain;
