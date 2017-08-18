import React, { Component } from 'react';

class ContactsGG extends Component {
  state = {
    continent: 'Asia',
    country: null,
    contact: {}
  }

  getContact = (country, e) => {
    e.preventDefault();
    const { contacts } = this.props;
    const contact = contacts.filter(contact => contact.countries.indexOf(country) !== -1);
    this.setState({ contact });
  }

  render() {
    const { contacts, continents } = this.props;
    const { country, continent, contact } = this.state;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <ul className="col-6-l">
          {continentsKeys.map(continentName => {
            return (<li className="continent__name">
              <a href={`?continent=${continentName}`}>{continentName}</a>
              <ul
                  className={continent ==continentName ? "continent__countries continent__countries--open" : "continent__countries"}>
                {continents[continent].map(country =>
                  <li><a href="#" onClick={this.getContact.bind(null, country)}>{country}</a></li>
                )}
              </ul>
            </li>
            )
          })}
        </ul>
        <div className="col-6-l">
          <div className="contact">
            {contact.post_title}
          </div>
        </div>
        <style jsx>{`
          ul {
            padding: 0;
          }

          li {
            list-style: none;
          }

          .continent__name > a{
            background: #3C515F;
            display: block;
            padding: 10px 30px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 2px;
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
