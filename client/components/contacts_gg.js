import React, { Component } from 'react';

class ContactsGG extends Component {
  render() {
    const { contacts, continents } = this.props;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <ul className="col-6-lg">
          {continentsKeys.map(continent => {
            return (<li>
              {continent}
                {continents[continent].map(country =>
                  <li>{country}</li>
                )}
              </li>
            )
          })}
        </ul>
        <div className="col-6-lg">
        {contacts.map(contact => {
          <div>
            {contact.post_title}
            {contact.fields}
          </div>
        })}
        </div>
      </div>
    )
  }
}

export default ContactsGG;
