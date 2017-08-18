import React, { Component } from 'react';

class ContactsGG extends Component {
  state = {
    continent: 'Afrika',
    country: null,
    contact: {}
  }

  setContact = (country, e) => {
    e.preventDefault();
    const { contacts } = this.props;
    const contact = contacts.filter(contact => contact.countries.indexOf(country) !== -1);
    if(contact.length > 0) {
      this.setState({ contact: contact[0], country });
    }
  }

  setContinent = (continentName, e) => {
    e.preventDefault();
    this.setState({ continent: continentName });
  }

  render() {
    const { contacts, continents } = this.props;
    const { country, continent, contact } = this.state;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <ul className="col-6-l">
          {continentsKeys.map(continentName => {
            return (<li className={continent == continentName ? "continent__name continent__name--active" : "continent__name" }>
              <a href="#" onClick={this.setContinent.bind(null, continentName)}>{continentName}</a>
              <i className={continent == continentName ? "ion-chevron-up": "ion-chevron-down"}></i>
              <ul
                className={continent == continentName
                  ? "continent__countries continent__countries--open"
                  : "continent__countries"}
              >
                {continents[continent].map(country =>
                  <li><a href="#" onClick={this.setContact.bind(null, country)}>{country}</a></li>
                )}
              </ul>
            </li>
            )
          })}
        </ul>
        <div className="col-6-l">
          <div className="contact">
            {country}
            <img src={contact.image} alt=""/>
            {contact.post_title}
            {contact.countries}
            {contact.post_content}
          </div>
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
          }

          .continent__name--active > a {
            background: #F1364E;
          }

          .continent__countries {
            display: none;
            background: #fff;
            height: 400px;
            overflow-y: scroll;
            padding: 30px;
          }

          .continent__countries--open {
            display: block;
          }

          .continent__countries li a{
            color: #8E8E8E;

          }
        `}</style>
      </div>
    )
  }
}

export default ContactsGG;
