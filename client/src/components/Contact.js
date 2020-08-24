import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    sent: false,
    buttonText: 'Send Message',
    disabled: false
  };

  formSubmit(e) {
    e.preventDefault();
    this.setState({ buttonText: 'Sending...', disabled: true });

    let data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };

    axios.post('/api/contact/', data, { timeout: 10000 })
    .then(res => {
      console.log('The Message Was Sent!!');
      this.setState({
        sent: true },
        this.resetForm());
    }).catch((err) => {
      console.error(`Message could not be sent: ${err}`);
    })
  }

  resetForm = () => {
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
      buttonText: 'Send Message!',
      disabled: false
    })
    setTimeout(() => { this.setState({ sent: false })}, 3000)
  }

  render() {
    return(
      <form id="contact" className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>
        <label className="message-name" htmlFor="message-name">Your Name</label>
        <input onChange={ e => this.setState({ name: e.target.value })} name="name" className="message-name" type="text" placeholder="Your Name" required value={this.state.name}/>

        <label className="message-email" htmlFor="message-email">Your Email</label>
        <input onChange={ (e) => this.setState({ email: e.target.value })} name="email" className="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />

        <label className="message-subject" htmlFor="message-subject">Your Subject</label>
        <input onChange={ e => this.setState({ subject: e.target.value })} name="subject" className="message-name" type="text" placeholder="Subject" required value={this.state.subject}/>

        <label className="message" htmlFor="message-input">Your Message</label>
        <textarea onChange={ e => this.setState({ message: e.target.value })} name="message" className="message-input" type="text" placeholder="Please write your message here" required value={this.state.message} />

        <div className="button--container">
          <button disabled={ this.state.disabled } type="submit" className="button button-primary">{ this.state.buttonText }</button>
        </div>
      </form>
    )
  }
}
