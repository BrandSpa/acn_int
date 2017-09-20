import React, { Component } from 'react';
import Search from './contacts_search_gg';

class ContactsGG extends Component {
  state = {
    continent: '',
    country: null,
    contacts: []
  }

  setContact = (country, e) => {
    if(e) e.preventDefault();
    const { contacts } = this.props;
    const selectedContacts = contacts.filter(contact => contact.countries.indexOf(country) !== -1);
    console.log(contacts);
    if(contacts.length > 0) {
      this.setState({ contacts: selectedContacts, country });
    }
  }

  setContinent = (continentName, e) => {
    e.preventDefault();
    console.log(continentName);
    if(this.state.continent == continentName) {
      this.setState({ continent: '' });
    } else {
      this.setState({ continent: continentName });
    }
  }

  render() {
    const { contactTitle, contacts, continents, countries } = this.props;
    const { country, continent } = this.state;
    let countrySelected = country;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <Search countries={countries} onSelect={this.setContact} />
        <ul className="col-6-l">
          {continentsKeys.map(continentName => {
            return (<li className={continent == continentName ? "continent__name continent__name--active" : "continent__name" }>
              <a href="#" onClick={this.setContinent.bind(null, continentName)}>
                {continentName}
                <i className={continent == continentName ? "ion-chevron-up": "ion-chevron-down"}></i>
              </a>
              <ul
                className={continent == continentName
                  ? "continent__countries continent__countries--open"
                  : "continent__countries"}
              >
                {continents[continent] ? continents[continent].map(country =>
                  <li>
                    <a
                      href="#"
                      className={country == countrySelected ? 'country-selected' : ''}
                      onClick={this.setContact.bind(null, country)}
                    >
                      {country}
                    </a>
                  </li>
                )
                : ''}
              </ul>
            </li>
            )
          })}
        </ul>
        <div className="col-6-l">
          <h4>{country}</h4>
          {this.state.contacts.map(contact =>
            <div className="contact">
              <p>{contact.hasOwnProperty('post_title') ? contactTitle : ''}</p>
              <img src={contact.image} />
              <h3>{contact.post_title}</h3>
              {contact.hasOwnProperty('fields') && contact.fields.length > 0 ?
                contact.fields.map(field => {
                  return <p>{field}</p>
                })
              : ''}

              <ul className="contact__countries">
                {contact.hasOwnProperty('countries') && contact.countries.length > 0 ?
                  contact.countries.map(countr => {
                    return <li>{countr} ·</li>
                  })
                : ''}
              </ul>
              <p>{contact.post_content}</p>

            </div>
          )}

        </div>
        <style jsx>{`
          ul {
            padding: 0;
          }

          li {
            list-style: none;
          }

          .continent__name > a {
            background: #3C515F;
            display: block;
            padding: 10px 30px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
          }

          .continent__name > a i {
            float: right;
          }

          .continent__name--active > a {
            background: #F1364E;
          }

          .continent__countries {
            display: none;
            background: #fff;
            height: 400px;
            overflow-y: scroll;
            padding: 20px 30px;
          }

          .continent__countries--open {
            display: block;
          }

          .continent__countries li a {
            color: #8E8E8E;
            margin-bottom: 10px;
            display: block;
          }

          .country-selected {
            color: red !important;
            font-weight: bold;
          }

          .contact {
            margin-left: 40px;
          }

          .contact h2 {
            margin: 0 20px 0 0;
            color: #3C515F;
          }

          .contact h4 {
            margin-bottom: 20px;
            color: #3C515F;
          }

          .contact img {
            max-width: 100%;
          }

          .contact h3 {
            margin: 0 20px 0 0;
            color: #3C515F;
          }

          .contact ul {
            margin: 20px 0;
          }

          .contact li {
            float: left;
            color: #3c515f;
            margin-right: 10px;
          }

          .contact__countries li {
            font-weight: 600;
          }

        `}</style>
      </div>
    )
  }
}

export default ContactsGG;
