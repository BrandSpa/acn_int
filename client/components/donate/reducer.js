const TYPE = 'DONATION';

const initialState = {
  stripe: {},
  contact: {},
  errors: {
    stripe: {},
    contact: {},
  },
  section: 0,
  left: 0,
  loading: false,
  donation_type: 'monthly',
  amount: 30,
  currency: 'usd',
  is_blue: false,
  show_four_step: false,
  show_titles: true,
};

