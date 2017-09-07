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
           onChange={this.handleChange}
           value={name}
         />
       </div>
       <div className="input-container">
         <input
           type="text"
           name="lastname"
           placeholder={placeholders.lastname}
           onChange={this.handleChange}
           value={lastname}
         />
       </div>
       <div className="input-container">
         <input
           type="text"
           name="email"
           placeholder={placeholders.email}
           onChange={this.handleChange}
           value={email}
         />
       </div>
       <div className="input-container">
         <textarea
            placeholder={placeholders.message}
            name="message"
            rows="5"
            onChange={this.handleChange}
          >{message}</textarea>
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
