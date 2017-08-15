import React, { Component } from "react";
import * as actions from "../../actions/donate";

class Four extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleYes = () => {
		actions.stripeToken(this.props).then(res => {
			if (res.id) {
				const stripe = { ...this.props.stripe, token: res.id};
				this.setState({ loading: true, stripe });

				actions
					.stripeCharge({ ...this.props, stripe, donation_type: "monthly", "trial_period_days": 30  })
					.then(res => this.completeTransaction(res.data));
			}
		});
	};

	handleNo = e  => {
		e.preventDefault();
		 const { amount, donation_type, contact } = this.props;
		const base = this.props.redirect["monthly"];
		const url = `${base}?customer_id=${contact.email}&order_revenue=${amount}&amount=${amount}&personname=${contact.name}&donation_type=${donation_type}`;
		window.location = url;
	}

	completeTransaction = ( stripeResponse = {} ) => {
    const { amount, donation_type, contact } = this.props;
    const base = this.props.redirect["monthly"];
    const { customer, id } = stripeResponse;

    actions
      .storeConvertLoop(this.props, this.state)
      .then(actions.storeEventConvertLoop.bind(null, this.props))
      .then(res => {
				const url = `${base}?customer_id=${contact.email}-${id}&order_revenue=${amount}&amount=${amount}&personname=${contact.name}&donation_type=${donation_type}`;
          window.location = url;
      });
  };

	render() {
		const { texts, amount } = this.props;
		let d = parseInt(amount) / 30;
		d = d.toFixed(2);

		return (
			<div style={this.props.show_four ? { display: "block", textAlign: "center" } : { display: "none" }}>
				<h5 style={{fontSize: "18px", color: "#3C515F", marginBottom: "20px"}}>{texts.text_four_step}</h5>
				<h3 style={{ color: "#3C515F", marginBottom: "20px" }}>{`${texts.subtext_four_step} ${d} ?`}</h3>
				<div className="col-6 col-6-l">
					<button
						onClick={this.handleYes}
						style={{ background: "#50B45A", width: "100%" }}
					>
						{texts.yes} {this.state.loading ? "..." : ""}
					</button>
					<h5 style={{
						fontSize: '12px',
				    lineHeight: '1.1',
				    textAlign: 'center',
				    marginTop: '10px',
    				color: '#333'
			}}>{texts.text_footer}</h5>
				</div>

				<div className="col-6 col-6-l">
					<button onClick={this.handleNo} style={{ background: "transparent", border: "1px solid #F1364E", width:"100%", color: "#F1364E" }}>{texts.no}</button>
				</div>


			</div>
		)
	}
}

export default Four;
