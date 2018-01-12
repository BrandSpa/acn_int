import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

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

class Contact extends Component {
  static defaultProps = {
    contact: {},
    countries: [],
    prefixes: [],
    isoCode: '',
    prefix: '',
    errors: { contact: {} },
    texts: {},
    inline: false,
  };

  validate = (field, val = '') => {
    let valid = !isEmpty(val);
    if (field === 'email') valid = isEmail(val);
    const contact = { ...this.props.errors.contact, [field]: valid };
    return { ...this.props.errors, contact };
  };

  handleChange = (field, e) => {
    const val = e.currentTarget.value;
    const errors = this.validate(field, val);

    this.props.onChange({
      contact: { ...this.props.contact, [field]: val },
      errors,
    });
  };

  showErr = (field) => {
    const err = this.props.errors.contact[field] === false
      ? 'form-group__error'
      : 'hidden';

    return err;
  }

  sortProperties = (obj) => {
    var sortable=[];
    for(var key in obj)
      if(obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); 
    
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; 
    });
    return sortable;
  }

  handleOnlyNumbers = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value == '' || re.test(e.target.value)) {
      this.props.onChange({
        contact: { ...this.props.contact, phone: e.target.value }
      });
    }
  }

  handlePrefix = (e) => {
   console.log(this.props.getIso);
  } 

  handleCountryChange = (e) => {

    this.props.onChange({
      contact: { ...this.props.contact, country: e.target.value},
      prefix: this.props.prefixes[e.target.value]
    });
  }

  inputErrStyle = (field) => {
    const err = this.props.errors.contact[field] === false ? 'form-group--error' : '';
    return err;
  }

  validateAll = () => {
    const { contact, texts } = this.props;
    const name = this.validate('name', contact.name);
    const email = this.validate('email', contact.email);
    const phone = this.validate('phone', contact.phone);
    const country = contact.country || texts.country;
    const countryValidation = this.validate('country', country);

    const errors = {
      ...this.props.errors,
      contact: {
        ...name.contact,
        ...email.contact,
        ...countryValidation.contact,
        ...phone.contact
      },
    };

    this.props.onChange({ errors });
    return errors;
  };

  render() {
    const { texts, contact, isoCode, prefix, prefixes } = this.props;
    const prefixesArr = this.sortProperties(prefixes);

    return (
      <div style={{ width: this.props.width, float: 'left', padding: '1px' }}>
        { this.props.show_titles ? <h5 style={{ color: '#3C515F', paddingBottom: '20px' }}>{texts.step_contact_text}</h5> : '' }
        <div className="row">
          <div className="form-group col-12-l">
            <input
              type="text"
              className={`form-control ${this.inputErrStyle('name')}`}
              placeholder={texts.placeholder_name}
              onChange={this.handleChange.bind(null, 'name')}
              value={contact.name}
            />
            <div className={this.showErr('name')}>
                <span>
                  {texts.validation_name}
                </span>
            </div>
          </div>

          <div className={this.props.inline ? 'form-group col-6-l' : 'form-group col-12-l'}>
            <input
              type="text"
              className={`form-control ${this.inputErrStyle('email')}`}
              placeholder={texts.placeholder_email}
              onChange={this.handleChange.bind(null, 'email')}
              value={contact.email}
            />
            <div className={this.showErr('email')}>
                <span>
                  {texts.validation_email}
                </span>
            </div>
          </div>

          <div className={this.props.inline ? 'form-group col-6-l' : 'form-group col-12-l'}>
            <select
              type="text"
              className="form-control"
              placeholder={texts.placeholder_country}
              onChange={e => this.handleCountryChange(e)}
              value={contact.country || texts.country}
            >
              {this.props.countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </select>
          </div>
  
          <div className={this.props.inline ? 'form-group col-6-l' : 'form-group col-12-l'}>
            <div className="input-section">
              <div className="iso-code">
                {`${isoCode} `}
              </div>
              <select 
                className="prefix" 
                value={prefix}
              >
                {   prefixesArr
                    .map( contr => 
                  <option value={contr[1]}>{`+ ${contr[1]}`}</option>
                )}
              </select>
              <input
                name="phone"
                type="number"
                pattern="\d*"
                placeholder={texts.placeholder_phone}
                className="input-section__text"
                pattern="[0-9]*" 
                onChange={this.handleOnlyNumbers}
                value={contact.phone}
              />
            </div>
            <div className={this.showErr('phone')}>
                <span>
                  {texts.validation_phone}
                </span>
            </div>
          </div>
        </div>
        <style jsx>{`
              .prefix, .iso-code{
                width: 20%;
                background: #f1f1f1;
                height: 100%;
                overflow: initial;
                border: 1px solid;
                border-left: none;
                border-right: none;
              }
              .iso-code{
                width: 10%;
                text-align: center;
                line-height: 48px;
                border: 1px solid;
                border-right: none;
                padding: 0px 0px 0 10px
              }
              .input-section {
                display: flex;
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
                font-weight: bold;
              }
    
              .input-section__placeholder i {
                padding: 0 5px 0 15px;
                font-size: 18px;
              }
    
              .input-section__text, .input-section__select {
                border: none;
                height: auto;
              }
              .input-section__text{
                border: 1px solid;
                border-left: 0px;
                border-radius: 0px;
                heigth: 50px;
              }
              .no-border{
                border: none;
                height: 22px;
                justify-content: left;
              }
              input:invalid {
    
              }
            `}</style>
      </div>
    );
  }
}

Contact.propTypes = {
  countries: PropTypes.array,
  errors: PropTypes.object,
  texts: PropTypes.object,
  contact: PropTypes.object,
  width: PropTypes.string,
  show_titles: PropTypes.string,
  inline: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Contact;
