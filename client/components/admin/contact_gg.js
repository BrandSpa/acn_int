import React, { Component } from 'react';

class ContactGG extends Compenent {
  state = {
    fields: ['phone: 1234546', 'mail: alejandro@brandspa.com', ''],
    countries: ['Colombia', 'Argentina', ''],
  }

  componentDidMount() {
    if (Array.isArray(this.props.countries)) {
      this.setState({ countries: this.props.countries });
    }

    if (Array.isArray(this.props.fields)) {
      this.setState({ fields: this.props.fields });
    }
  }

  handleAddCountry = (e) => {
    e.preventDefault();
    const countries = [...this.state.countries, ''];
    this.setState({countries});
  }

  handleAddField = (e) => {
    e.preventDefault();
    const fields = [...this.state.fields, ''];
    this.setState({fields});
  }

  render() {
    const { countries, fields } = this.state;

    return (
      <div>
        {countries.map((country, i)=>
          <div className="form-group" key={i}>
            <select value={country} className="form-control">
              <option value="">Select country</option>
              <option value="Argentina">Argentina</option>
              <option value="Colombia">Colombia</option>
              <option value="Colombia">Chile</option>
            </select>
          </div>
        )}

        <button className="button" onClick={this.handleAddCountry}>Add country</button>
        {fields.map((field, i) =>
          <div className="form-group">
            <input type="text" className="form-control"/>
          </div>
        )}
        <button className="button" onClick={this.handleAddField}>Add field</button>
      </div>
    )
  }
}

export default ContactGG;
