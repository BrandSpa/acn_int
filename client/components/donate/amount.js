import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountBtns from './amountBtns';
import { onlyNum } from '../../lib/clean_inputs';


class Amount extends Component {
  static defaultProps = {
    texts: {},
    amount: 30,
    show_titles: false,
  };

  changeAmount = (amount, e) => {
    if (e) e.preventDefault();
    const el = this.amountInput;
    if (amount === 5) el.focus();
    this.props.onChange({ amount });
  };

  handleAmount = (e) => {
    const val = e.currentTarget.value;
    const amount = onlyNum(val);
    this.props.onChange({ amount });
  };

  changeType = (donationType, e) => {
    if (e) e.preventDefault();
    this.props.onChange({ donationType });
  };

  render() {
    const { texts, donation_type, amount, width, show_titles } = this.props;

    return (
      <div style={{ width, float: 'left', padding: '1px' }}>
        { show_titles ? <h5 style={{ color: '#3C515F', paddingBottom: '20px' }}>{texts.step_amount_text}</h5> : '' }
        <AmountBtns
          amount={amount}
          texts={texts}
          changeAmount={this.changeAmount}
        />
        <div className="row">
          <div className="form-group form-group--addon col-5-l">
            <span className="form-group__addon">
              US$
            </span>
            <input
              ref={amountInput => (this.amountInput = amountInput)}
              className="form-control"
              type="text"
              onChange={this.handleAmount}
              value={amount}
            />
          </div>
          <div className="form-group col-7-l">
            <a
              href="#"
              onClick={this.changeType.bind(null, 'monthly')}
              className={
                donation_type == 'monthly'
                  ? 'donate_react__type donate_react__type--active'
                  : 'donate_react__type '
              }
            >
              {texts.monthly}
            </a>
            <a
              href="#"
              onClick={this.changeType.bind(null, 'once')}
              className={
                donation_type == 'once'
                  ? 'donate_react__type donate_react__type--active'
                  : 'donate_react__type '
              }
            >
              {texts.once}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Amount.propTypes = {
  onChange: PropTypes.func,
  texts: PropTypes.object,
  donation_type: PropTypes.string,
  amount: PropTypes.number,
  width: PropTypes.string,
  show_titles: PropTypes.bool,
};

export default Amount;
