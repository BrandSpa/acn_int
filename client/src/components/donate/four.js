import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/donate';
import { storeEvent } from '../../lib/events';

class FourStep extends Component {
  state = {
    loading: false,
  };

  handleYes = () => {
    this.setState({ loading: true });

    actions.stripeToken(this.props).then((res) => {
      if (res.id) {
        const stripe = { ...this.props.stripe, token: res.id };
        this.setState({ loading: true, stripe });

        actions
					.stripeCharge({ ...this.props, stripe, donation_type: 'monthly', trial_period_days: 30 })
				.then(res => this.completeTransaction(res.data));
      }
    });
  };

  handleNo = (e) => {
    e.preventDefault();
    const { amount, donation_type, contact } = this.props;
    const base = this.props.redirect.monthly;
    const url = `${base}?customer_id=${contact.email}&order_revenue=${amount}&amount=${amount}&personname=${contact.name}&donation_type=${donation_type}`;
    window.location = url;
  }

  completeTransaction = (stripeResponse = {}) => {
    const { amount, contact } = this.props;
    const base = this.props.redirect.monthly;
    const { id } = stripeResponse;

    actions
      .storeConvertLoop(this.props, this.state)
      .then(actions.storeEventConvertLoop.bind(null, this.props))
      .then(() => {
        const action = 'DONATION_MONTHLY';
        
        const label = bs.currentPageLang === 'Español'
          ? 'DONATION_SP'
          : 'DONATION_EN';

        const event = {
          action,
          label,
          category: 'DONATION',
          value: amount,
        };

        storeEvent('ga_event', event);
      })
      .then(() => {
        const url = `${base}?customer_id=${contact.email}-${id}&order_revenue=${amount}&amount=${amount}&personname=${contact.name}&donation_type=monthly`;
        window.location = url;
      });
  };

  render() {
    const { texts, amount } = this.props;
    let d = parseInt(amount) / 30;
    d = d.toFixed(2);

    return (
      <div style={{ width: this.props.width, float: 'left', padding: '1px' }}>
        <h5 className="step-four__text">{texts.text_four_step}</h5>
        <h4 className="step-four__subtext">{`${texts.subtext_four_step} ${d} ?`}</h4>
        <div className="col-12 col-12-l">
          <button
            onClick={this.handleYes}
            className="step-four__handle-yes"
          >
            {this.state.loading ? <img src={texts.preload} width="40px" /> : texts.yes}
          </button>
          <h5 className="step-four__text-footer">{texts.text_footer}</h5>
        </div>

        <div className="col-12 col-12-l">
          <button className="step-four__handle-no" onClick={this.handleNo}>{texts.no}</button>
        </div>

        <style jsx>{`
					.step-four__text {
						font-size: 18px;
            color: #3C515F;
            margin-bottom: 20px;
            text-align: center;
					}

					.step-four__subtext {
            color: #3C515F;
            margin-bottom: 20px;
            text-align: center;
            line-height: 1;
            font-weight: 600;
          }
          
          .col-12-l{
            margin-bottom: 15px;
          }

					.step-four__text-footer {
						font-size: 12px;
					  line-height: 1.1;
					  text-align: center;
					  margin-top: 10px;
	    			color: #333;
					}

					.step-four__handle-yes {
						background: #50B45A; 
						width: 100%;
					}

					.step-four__handle-no {
						background: transparent;
						border: 1px solid #F1364E; 
						width: 100%; 
						color: #F1364E; 
					}
				`}</style>
      </div>
    );
  }
}

FourStep.propTypes = {
  amount: PropTypes.string.isRequired,
  donation_type: PropTypes.string.isRequired,
  show_four: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  redirect: PropTypes.object.isRequired,
  texts: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired,
};

export default FourStep;
