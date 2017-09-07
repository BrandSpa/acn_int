import React, { Component } from 'react';
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

class ContactUsForm extends Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    message: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    return Object.keys(this.state)
      .map(key => {
        let val = this.state[key];
        let isValid = false;
        if(key == 'email') return isEmail(val);
        return !isEmpty(val);
      })
      .every(item => item == true);
  }

  handleSubmit = e => {
    if(e) e.preventDefault();
    console.log(this.validate());
  }

  render() {
    const { name, lastname, email, message } = this.state;
    const { placeholders, btnText } = this.props;

    return (
     <form action="#" onSubmit={this.handleSubmit}>
       <div className="input-container">
         <input
           type="text"
           name="name"
           placeholder={placeholders.name}
           value={name}
         />
       </div>
       <div className="input-container">
         <input
           type="text"
           name="lastname"
           placeholder={placeholders.lastname}
           value={lastname}
         />
       </div>
       <div className="input-container">
         <input
           type="text"
           name="email"
           placeholder={placeholders.email}
           value={email}
         />
       </div>
       <div className="input-container">
         <textarea placeholder={placeholders.message} name="message" rows="3">{message}</textarea>
       </div>
       <button>{btnText}</button>
     </form>
   )
  }
}

export default ContactUsForm;
