import React, { Component } from 'react';

class ContactsGG extends Component {
  state = {
    continent: 'Asia',
    country: null
  }

  render() {
    const { contacts, continents } = this.props;
    const { country, continent } = this.state;
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
                  <li><a href={`?country=${continent}`}>{country}</a></li>
                )}
              </ul>
            </li>
            )
          })}
        </ul>
        <div className="col-6-l">
        {contacts.map(contact => {
          return (
            <div>
            {contact.post_title}
            {contact.fields}
          </div>
        )
        })}
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
            padding: 10px 0;
            font-weight: 500;
            color: #fff;
          }

          .continent__countries--open {
            display: block;
          }

          .continent__countries {
            display: none;
            background: #fff;
            height: 400px;
            overflow-y: scroll;
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
