import React, { Component } from 'react';
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

class ContactUsForm extends Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    message: '',
    errors: {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    const fields = ['name', 'lastname', 'email', 'message'];
    const errors = {};

    fields.forEach(field => {
      let val = this.state[field];
      errors[field] = field == 'email' ? isEmail(val) : !isEmpty(val);
    });

    this.setState({ errors });

    return fields
      .map(key => {
        let val = this.state[key];
        return key == 'email' ? isEmail(val) : !isEmpty(val);
      });
  }

  handleSubmit = e => {
    if(e) e.preventDefault();
    if(this.validate().every(item => item == true)) {
      console.log(this.state);
    }
  }

  render() {
    const { name, lastname, email, message, errors } = this.state;
    const { placeholders, messages, btnText } = this.props;

    return (
     <form action="#" onSubmit={this.handleSubmit}>
       <div className="input-container">
         <input
           type="text"
           name="name"
           placeholder={placeholders.name}
           onChange={this.handleChange}
           value={name}
         />
         <div className={errors.name ?  "hidden" : "input-error"}>
           {messages.name}
         </div>
       </div>
       <div className="input-container">
         <input
           type="text"
           name="lastname"
           placeholder={placeholders.lastname}
           onChange={this.handleChange}
           value={lastname}
         />
         <div className={errors.lastname ? "hidden" :  "input-error"}>
           {messages.lastname}
         </div>
       </div>
       <div className="input-container">
         <input
           type="text"
           name="email"
           placeholder={placeholders.email}
           onChange={this.handleChange}
           value={email}
         />
         <div className={errors.email ? "hidden" : "input-error"}>
           {messages.email}
         </div>
       </div>
       <div className="input-container">
         <textarea
            placeholder={placeholders.message}
            name="message"
            rows="5"
            onChange={this.handleChange}
          >{message}</textarea>
          <div className={errors.message ? "hidden" :  "input-error"}>
            {messages.message}
          </div>
       </div>
       <button>{btnText}</button>
       <style jsx>{`
         textarea {
           width: 100%;
           background: transparent;
           padding: 6px 12px;
           font-size: .8em
         }
       `}</style>
     </form>
   )
  }
}

export default ContactUsForm;
