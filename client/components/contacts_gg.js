import React, { Component } from 'react';

class ContactsGG extends Component {
  render() {
    const { contacts, continents } = this.props;
    let continentsKeys = Object.keys(continents);

    return (
      <div>
        <ul className="col-6-l">
          {continentsKeys.map(continent => {
            return (<li className="continent__name">
              <a href="#">{continent}</a>
              <ul className="continent__countries">
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
        <style jsx>{`
          .continent__name a{
            background: #3C515F;
            display: block;
            padding: 10px 0;
            font-weight: 500;
            color: #fff;
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
