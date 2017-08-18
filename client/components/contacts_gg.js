import React, { Component } from 'react';

class ContactsGG extends Component {
  render() {
    const { contacts, continents } = this.props;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <ul className="col-6-l">
          {continentsKeys.map(continent => {
            return (<li>
              {continent}
              <ul>
                {continents[continent].map(country =>
                  <li>{country}</li>
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
      </div>
    )
  }
}

export default ContactsGG;
