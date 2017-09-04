import React, { Component } from 'react';

class ContactsSearchGG extends Component {
  state = {
    query: '',
    results: [],
    country: '',
    openResults: false
  }

  handleSubmit = (country, e) => {
    e.preventDefault();
  }

  handleChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    const {countries} = this.props;

    let results = countries.filter(country => {
      return country.toLowerCase().indexOf(query.toLowerCase()) != -1;
    });

    this.setState({ openResults: true, query, results });
  }

  handleSelect = (country, e) => {
    e.preventDefault();
    this.setState({ country, openResults: false });
    this.props.onSelect(country);
  }

  render() {
    const { countries } = this.props;
    const { query, results, openResults } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search country" onChange={this.handleChange} value={query} />
        </form>
        <div className={openResults ? "results results--open" : "results"}>
          <ul>
            {results.length > 0
              ?
                results.map(country =>
                  <li><a href="" onClick={this.handleSelect.bind(null, country)}>{country}</a></li>
                )
              :
                countries.map(country =>
                  <li><a href="" onClick={this.handleSelect.bind(null, country)}>{country}</a></li>
                )
          }
          </ul>
        </div>
        <style jsx>{`
          .results {
            position: relative;
            height: 300px;
            background: #fff;
            overflow-y: scroll;
            display: none;
          }

          .results--open {
            display: block;
          }

          .results ul {
            padding: 0;
          }

          .results ul li {
            list-style: none;
          }

          .results ul li a {
            display: block;
            width: 100%;
            height: 40px;
            font-size: 14px;
            text-align: left;
            padding: 10px 20px;
            background: #f7f7f7;
            transition: all .3s ease-in-out;
          }

          .results ul li a:hover {
            background: red;
            color: #fff;
          }

        `}</style>
      </div>
    )
  }
}

export default ContactsSearchGG;
