import React from 'react';
import propTypes from 'prop-types';

const AmountBtns = (props) => {
  const { changeAmount, texts = {}, amount = 30 } = props;

  return (
    <ul className="change-amount" style={{ padding: 0 }}>
      <li className="col-1-4">
        <a
          href="#"
          className={amount === 10 ? 'active' : ''}
          onClick={() => changeAmount(10)}
        >$10</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          className={amount == 30 ? 'active' : ''}
          onClick={() => changeAmount(30)}
        >$30</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          className={amount === 50 ? 'active' : ''}
          onClick={() => changeAmount(50)}
        >$50</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          className={amount === 100 ? 'active' : ''}
          onClick={() => changeAmount(100)}
        >$100</a>
      </li>
      <li className="col-1-4">
        <a
          href="#"
          onClick={() => changeAmount(5)}
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
