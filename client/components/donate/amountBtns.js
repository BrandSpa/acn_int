import React from 'react';
import propTypes from 'prop-types';

const BtnAmount = ({ changeAmount, amount, amountText }) => (
  <a
    href="#"
    className={amount === amountText ? 'active' : ''}
    onClick={e => changeAmount(e, amountText)}
  >
    ${amountText}
  </a>
);

const AmountBtns = (props) => {
  const { changeAmount, texts = {}, amount = 30 } = props;

  return (
    <ul className="change-amount" style={{ padding: 0 }}>
      <li className="col-1-4">
        <BtnAmount
          changeAmount={changeAmount}
          amount={amount}
          amountText={10}
        />
      </li>
      <li className="col-1-4">
        <BtnAmount
          changeAmount={changeAmount}
          amount={amount}
          amountText={30}
        />
      </li>
      <li className="col-1-4">
        <a
          href="#"
          className={amount === 50 ? 'active' : ''}
          onClick={e => changeAmount(e, 50)}
        >$50</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          className={amount === 100 ? 'active' : ''}
          onClick={e => changeAmount(e, 100)}
        >$100</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          onClick={e => changeAmount(e, 5)}
        >{texts.other}</a>
      </li>
    </ul>
  );
};

AmountBtns.propTypes = {
  changeAmount: propTypes.func.isRequired,
  texts: propTypes.object,
  amount: propTypes.number,
};

export default AmountBtns;
