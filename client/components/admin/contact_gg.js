import React, { Component } from 'react';

class ContactGG extends Component {
  state = {
    fields: [''],
    countries: [''],
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

  handleCountry = (index, e) => {
    let { countries } = this.state;
    countries[index] = e.target.value;
    this.setState({ countries });
  }

  handleField = (index, e) => {
    let { fields } = this.state;
    fields[index] = e.target.value;
    this.setState({ fields });
  }

  render() {
    const { countries, fields } = this.state;

    return (
      <div>
        {countries.map((country, i)=>
          <p className="form-group" key={i}>
            <select
              name="countries[]"
              value={country}
              className="form-control"
              onChange={this.handleCountry.bind(null, i)}
            >
              <option value="">Select country</option>
              <option value="Argentina">Argentina</option>
              <option value="Colombia">Colombia</option>
              <option value="Colombia">Chile</option>
            </select>
          </p>
        )}
        <p>
          <button className="button" onClick={this.handleAddCountry}>Add country</button>
        </p>
        {fields.map((field, i) =>
          <p className="form-group" key={i}>
            <input name="info[]" type="text" className="form-control" onChange={this.handleField.bind(null, i)}/>
          </p>
        )}
        <p>
          <button className="button" onClick={this.handleAddField}>Add field</button>
        </p>

      </div>
    )
  }
}

export default ContactGG;
