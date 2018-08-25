import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>
          Emaily!
        </h1>
        Collet feedback from your customers
        <div>
          <h5>How to use this email survey service?</h5>
          <ul className="collection">
            <li className="collection-item">Log in using your email account.</li>
            <li className="collection-item">Buy Credits. Use the test credit card number 4242 4242 4242 4242. Use the expiration date 11/22. Use the CVC code 123. Use a dummy email address. </li>
            <li className="collection-item">Create survey campaign. Make sure to put in one or more valid email address.</li>
            <li className="collection-item">Check your email. And then click Yes or No in your email.</li>
            <li className="collection-item">See the survey results.</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Landing;