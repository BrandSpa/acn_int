import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Amount from './amount';
import CreditCard from './creditCard';
import Contact from './contact';
import FourStep from './four';
import * as actions from '../../actions/donate';
import { storeEvent } from '../../lib/events';
import { ClipLoader } from 'halogenium';

var isoCountries = {
  'AF' : 'Afghanistan',
  'AX' : 'Aland Islands',
  'AL' : 'Albania',
  'DZ' : 'Algeria',
  'AS' : 'American Samoa',
  'AD' : 'Andorra',
  'AO' : 'Angola',
  'AI' : 'Anguilla',
  'AQ' : 'Antarctica',
  'AG' : 'Antigua And Barbuda',
  'AR' : 'Argentina',
  'AM' : 'Armenia',
  'AW' : 'Aruba',
  'AU' : 'Australia',
  'AT' : 'Austria',
  'AZ' : 'Azerbaijan',
  'BS' : 'Bahamas',
  'BH' : 'Bahrain',
  'BD' : 'Bangladesh',
  'BB' : 'Barbados',
  'BY' : 'Belarus',
  'BE' : 'Belgium',
  'BZ' : 'Belize',
  'BJ' : 'Benin',
  'BM' : 'Bermuda',
  'BT' : 'Bhutan',
  'BO' : 'Bolivia',
  'BA' : 'Bosnia And Herzegovina',
  'BW' : 'Botswana',
  'BV' : 'Bouvet Island',
  'BR' : 'Brazil',
  'IO' : 'British Indian Ocean Territory',
  'BN' : 'Brunei Darussalam',
  'BG' : 'Bulgaria',
  'BF' : 'Burkina Faso',
  'BI' : 'Burundi',
  'KH' : 'Cambodia',
  'CM' : 'Cameroon',
  'CA' : 'Canada',
  'CV' : 'Cape Verde',
  'KY' : 'Cayman Islands',
  'CF' : 'Central African Republic',
  'TD' : 'Chad',
  'CL' : 'Chile',
  'CN' : 'China',
  'CX' : 'Christmas Island',
  'CC' : 'Cocos (Keeling) Islands',
  'CO' : 'Colombia',
  'KM' : 'Comoros',
  'CG' : 'Congo',
  'CD' : 'Congo, Democratic Republic',
  'CK' : 'Cook Islands',
  'CR' : 'Costa Rica',
  'CI' : 'Cote D\'Ivoire',
  'HR' : 'Croatia',
  'CU' : 'Cuba',
  'CY' : 'Cyprus',
  'CZ' : 'Czech Republic',
  'DK' : 'Denmark',
  'DJ' : 'Djibouti',
  'DM' : 'Dominica',
  'DO' : 'Dominican Republic',
  'EC' : 'Ecuador',
  'EG' : 'Egypt',
  'SV' : 'El Salvador',
  'GQ' : 'Equatorial Guinea',
  'ER' : 'Eritrea',
  'EE' : 'Estonia',
  'ET' : 'Ethiopia',
  'FK' : 'Falkland Islands (Malvinas)',
  'FO' : 'Faroe Islands',
  'FJ' : 'Fiji',
  'FI' : 'Finland',
  'FR' : 'France',
  'GF' : 'French Guiana',
  'PF' : 'French Polynesia',
  'TF' : 'French Southern Territories',
  'GA' : 'Gabon',
  'GM' : 'Gambia',
  'GE' : 'Georgia',
  'DE' : 'Germany',
  'GH' : 'Ghana',
  'GI' : 'Gibraltar',
  'GR' : 'Greece',
  'GL' : 'Greenland',
  'GD' : 'Grenada',
  'GP' : 'Guadeloupe',
  'GU' : 'Guam',
  'GT' : 'Guatemala',
  'GG' : 'Guernsey',
  'GN' : 'Guinea',
  'GW' : 'Guinea-Bissau',
  'GY' : 'Guyana',
  'HT' : 'Haiti',
  'HM' : 'Heard Island & Mcdonald Islands',
  'VA' : 'Holy See (Vatican City State)',
  'HN' : 'Honduras',
  'HK' : 'Hong Kong',
  'HU' : 'Hungary',
  'IS' : 'Iceland',
  'IN' : 'India',
  'ID' : 'Indonesia',
  'IR' : 'Iran, Islamic Republic Of',
  'IQ' : 'Iraq',
  'IE' : 'Ireland',
  'IM' : 'Isle Of Man',
  'IL' : 'Israel',
  'IT' : 'Italy',
  'JM' : 'Jamaica',
  'JP' : 'Japan',
  'JE' : 'Jersey',
  'JO' : 'Jordan',
  'KZ' : 'Kazakhstan',
  'KE' : 'Kenya',
  'KI' : 'Kiribati',
  'KR' : 'Korea',
  'KW' : 'Kuwait',
  'KG' : 'Kyrgyzstan',
  'LA' : 'Lao People\'s Democratic Republic',
  'LV' : 'Latvia',
  'LB' : 'Lebanon',
  'LS' : 'Lesotho',
  'LR' : 'Liberia',
  'LY' : 'Libyan Arab Jamahiriya',
  'LI' : 'Liechtenstein',
  'LT' : 'Lithuania',
  'LU' : 'Luxembourg',
  'MO' : 'Macao',
  'MK' : 'Macedonia',
  'MG' : 'Madagascar',
  'MW' : 'Malawi',
  'MY' : 'Malaysia',
  'MV' : 'Maldives',
  'ML' : 'Mali',
  'MT' : 'Malta',
  'MH' : 'Marshall Islands',
  'MQ' : 'Martinique',
  'MR' : 'Mauritania',
  'MU' : 'Mauritius',
  'YT' : 'Mayotte',
  'MX' : 'Mexico',
  'FM' : 'Micronesia, Federated States Of',
  'MD' : 'Moldova',
  'MC' : 'Monaco',
  'MN' : 'Mongolia',
  'ME' : 'Montenegro',
  'MS' : 'Montserrat',
  'MA' : 'Morocco',
  'MZ' : 'Mozambique',
  'MM' : 'Myanmar',
  'NA' : 'Namibia',
  'NR' : 'Nauru',
  'NP' : 'Nepal',
  'NL' : 'Netherlands',
  'AN' : 'Netherlands Antilles',
  'NC' : 'New Caledonia',
  'NZ' : 'New Zealand',
  'NI' : 'Nicaragua',
  'NE' : 'Niger',
  'NG' : 'Nigeria',
  'NU' : 'Niue',
  'NF' : 'Norfolk Island',
  'MP' : 'Northern Mariana Islands',
  'NO' : 'Norway',
  'OM' : 'Oman',
  'PK' : 'Pakistan',
  'PW' : 'Palau',
  'PS' : 'Palestinian Territory, Occupied',
  'PA' : 'Panama',
  'PG' : 'Papua New Guinea',
  'PY' : 'Paraguay',
  'PE' : 'Peru',
  'PH' : 'Philippines',
  'PN' : 'Pitcairn',
  'PL' : 'Poland',
  'PT' : 'Portugal',
  'PR' : 'Puerto Rico',
  'QA' : 'Qatar',
  'RE' : 'Reunion',
  'RO' : 'Romania',
  'RU' : 'Russian Federation',
  'RW' : 'Rwanda',
  'BL' : 'Saint Barthelemy',
  'SH' : 'Saint Helena',
  'KN' : 'Saint Kitts And Nevis',
  'LC' : 'Saint Lucia',
  'MF' : 'Saint Martin',
  'PM' : 'Saint Pierre And Miquelon',
  'VC' : 'Saint Vincent And Grenadines',
  'WS' : 'Samoa',
  'SM' : 'San Marino',
  'ST' : 'Sao Tome And Principe',
  'SA' : 'Saudi Arabia',
  'SN' : 'Senegal',
  'RS' : 'Serbia',
  'SC' : 'Seychelles',
  'SL' : 'Sierra Leone',
  'SG' : 'Singapore',
  'SK' : 'Slovakia',
  'SI' : 'Slovenia',
  'SB' : 'Solomon Islands',
  'SO' : 'Somalia',
  'ZA' : 'South Africa',
  'GS' : 'South Georgia And Sandwich Isl.',
  'ES' : 'Spain',
  'LK' : 'Sri Lanka',
  'SD' : 'Sudan',
  'SR' : 'Suriname',
  'SJ' : 'Svalbard And Jan Mayen',
  'SZ' : 'Swaziland',
  'SE' : 'Sweden',
  'CH' : 'Switzerland',
  'SY' : 'Syrian Arab Republic',
  'TW' : 'Taiwan',
  'TJ' : 'Tajikistan',
  'TZ' : 'Tanzania',
  'TH' : 'Thailand',
  'TL' : 'Timor-Leste',
  'TG' : 'Togo',
  'TK' : 'Tokelau',
  'TO' : 'Tonga',
  'TT' : 'Trinidad And Tobago',
  'TN' : 'Tunisia',
  'TR' : 'Turkey',
  'TM' : 'Turkmenistan',
  'TC' : 'Turks And Caicos Islands',
  'TV' : 'Tuvalu',
  'UG' : 'Uganda',
  'UA' : 'Ukraine',
  'AE' : 'United Arab Emirates',
  'GB' : 'United Kingdom',
  'US' : 'United States',
  'UM' : 'United States Outlying Islands',
  'UY' : 'Uruguay',
  'UZ' : 'Uzbekistan',
  'VU' : 'Vanuatu',
  'VE' : 'Venezuela',
  'VN' : 'Viet Nam',
  'VG' : 'Virgin Islands, British',
  'VI' : 'Virgin Islands, U.S.',
  'WF' : 'Wallis And Futuna',
  'EH' : 'Western Sahara',
  'YE' : 'Yemen',
  'ZM' : 'Zambia',
  'ZW' : 'Zimbabwe'
};

function isAllValid(errors = {}) {
  return Object.keys(errors).every(key => errors[key] === true);
}

class Donate extends Component {
  static defaultProps = {
    texts: {},
    redirect: {},
    tags: '',
    is_blue: false,
  };

  state = {
    section: 0,
    left: 0,
    loading: false,
    isLoading: false,
    donation_type: 'monthly',
    amount: 30,
    currency: 'usd',
    prefix: this.props.prefixes[this.props.texts.country],
    isoCode: '',
    contact: {
      name: '',
      email: '',
      country: this.props.texts.country,
      phone: ''
    },
    stripe: {
      card_type: '',
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
      token: '',
    },
    errors: { stripe: {}, contact: {} },
    is_blue: false,
    show_four_step: false,
    show_titles: true,
  };

  componentDidMount() {
    this.donateForm.addEventListener('keydown', (e) => {
      if (e.which === 9) {
        e.preventDefault();
        this.nextSection();
      }
    });
  }

  handleChange = (field) => {
    this.setState({ ...this.state, ...field });
    if(field.contact){
      this.changeIso(field.contact.country);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.nextSection();
  };

  componentDidMount = () => {
    this.changeIso(this.state.contact.country);
    console.log(this.props)
  }

  completeTransaction = (stripeResponse = {}) => {
    const { amount, donation_type, contact } = this.state;
    const base = this.props.redirect[donation_type];
    const { id } = stripeResponse;

    this.setState({ loading: true });

    actions
      .storeConvertLoop(this.props.tags, contact)
      .then(() => {
        const action = donation_type === 'monthly'
          ? 'DONATION_MONTHLY'
          : 'DONATION_UNIQUE';

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

        if(this.props.call_center == 'true'){
          contact.pid = '_' + Math.random().toString(36).substr(2, 9);
        }

        const event = {
          name: `Donation ${donation_type}`,
          person: contact,
          metadata: {
            amount,
            type: donation_type,
            url: window.location.href,
          },
        };

        return storeEvent('cl_event', event);
      })
      .then(() => {
        const event = {
          eventName: 'Purchase',
          content: { value: amount, currency: 'USD' },
        };

        return storeEvent('fb_event', event);
      })
      .then(() => {
        const event = {
          customerId: `${contact.email}-${id}`,
          revenue: amount,
        };

        return storeEvent('ga_ecm_event', event);
      })
      .then(() => {
        if (donation_type == 'monthly') {
          const url = `${base}?amount=${amount}&personname=${contact.name}&donation_type=${donation_type}`;
          setTimeout(() => {
            window.location = url;
          }, 0);
        } else {
          this.setState({isLoading: false, show_four_step: true});
          this.nextSection();
          this.changeSection(1);
        }
      });
  }

  creditCardIsValid = () => {
    const errs = this.creditCard.validateAll();
    return isAllValid(errs.stripe);
  };

  contactIsValid = () => {
    const errs = this.contact.validateAll();
    return isAllValid(errs.contact);
  };

  getIsoByName = (object, value) => {
    var iso = Object.keys(object).find(key => object[key] === value);
    return iso ? iso : ''; 
  }
  
  changeIso = ( country ) => {
    this.setState({
      isoCode: this.getIsoByName(isoCountries, country)
    });
  }

  nextSection = () => {
    const section = this.state.section < 3 ? this.state.section + 1 : 3;
    if (this.state.section == 1) {
      if (!this.creditCardIsValid()) return false;

      actions.stripeToken(this.state).then((res) => {
        if (res.id) {
          const stripe = { ...this.state.stripe, token: res.id };
          this.setState({ ...this.state, stripe });
          return stripe;
        }

        if (res.stripeCode) {
          this.setState({ ...this.state, loading: false, declined: true });
          return null;
        }
      });
    }

    if (this.state.section === 2) {
      this.setState({isLoading: true}, function(){
        if (!this.contactIsValid()) return false;
        actions
        .stripeCharge(this.state)
        .then( (res) => {
          if(!('id' in res.data)){
            this.setState({declined: true, isLoading: false});
          }else{
            this.completeTransaction(res.data);
          }
        });
      });
    }

    const left = `-${section * 100}%`;

    if (this.state.section === 0) {
      this.setState({ section, left, loading: false });
    } else if( section < 3 || this.state.show_four_step ) {
      this.setState({ section, left });
    }
  };

  prevSection = (e) => {
    e.preventDefault();
    const section = this.state.section >= 0 ? this.state.section - 1 : 0;
    const left = `-${section * 100}%`;
    this.setState({ section, left });
  };

  render() {
    const sectionWidth = `${100 / 4}%`;
    const viewPortStyle = { width: '400%', left: this.state.left };
    const donationTypeStyle = {
      display: 'inline',
      marginLeft: '15px',
      color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff',
    };

    const backBtnStyle = {
      float: 'right',
      background: 'transparent',
      border: 'none',
      padding: '0 20px',
      color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff',
    };

    return (
      <div>

        <form
          onSubmit={this.handleSubmit}
          className={this.props.is_blue ? 'donate_react donate_inline' : 'donate_react'}
          ref={(donate) => { this.donateForm = donate; }}
        >
          <div className="donate_react__viewport" style={viewPortStyle}>

            <Amount
              {...this.state}
              {...this.props}
              width={sectionWidth}
              onChange={this.handleChange}
            />

            <CreditCard
              ref={(creditCard) => { this.creditCard = creditCard; }}
              {...this.state}
              {...this.props}
              width={sectionWidth}
              onChange={this.handleChange}
            />

            <Contact
              ref={(contact) => { this.contact = contact; }}
              {...this.state}
              {...this.props}
              width={sectionWidth}
              onChange={this.handleChange}
              getIso={this.getIsoByName}
            />

            <FourStep 
              {...this.props} 
              {...this.state}
              width={sectionWidth}
            />
          </div>
          {this.state.section < 3? 
            <div className="form-group btn_group">
              <button
                className={`donate_react__submit pull-left ${ this.state.section == 0 ? "btn-large": "" }`} 
                onClick={this.handleSubmit}
                disabled={this.state.loading}
              >
                {this.state.section === 1
                ? this.props.texts.next
                : this.props.texts.donate}
                {this.state.section == 0 ?
                <div className="hidden-md-down">
                  {`${this.state.amount} USD ${this.props.texts[this.state.donation_type]}`}
                </div>
                :""}
                { this.state.isLoading && <ClipLoader color="#FFFFFF" size="16px" margin="4px"/> }
              </button>
              
              {this.state.section > 0
              ? <button style={backBtnStyle} onClick={this.prevSection}>
                {this.props.texts.back}
              </button>
              : ''}
            </div>
          : ''}
          <div
            style={
              this.state.declined
                ? {
                  display: 'block',
                  background: 'red',
                  color: '#fff',
                  float: 'left',
                  width: '100%',
                  padding: '10px',
                }
                : { display: 'none' }
            }
          >
            {this.props.texts.validation_declined}
          </div>
        </form>

      </div>
    );
  }
}

Donate.propTypes = {
  texts: PropTypes.object,
  redirect: PropTypes.object,
  tags: PropTypes.string,
  is_blue: PropTypes.bool,
  changeSection: PropTypes.func,
};

export default Donate;
