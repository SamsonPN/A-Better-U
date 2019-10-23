import React, { Component } from 'react';
import LoginImg from './assets/login-page.jpg';
import GoogleImg from './assets/google.jpg';
import './Login.css';

class Login extends Component {

  render() {
    return (
      <div id="LoginPage">
        <img id="LoginImg" src={LoginImg} alt="Login background"/>

        <div id="LoginInfo">
          <div id="SiteNameSlogan">
            <h1>A Better U</h1>
            <p>Helping you strive to be a better version of yourself</p>
          </div>

          {/*<div id="googleBtn">
            <img id="GoogleImg" src={GoogleImg} alt="google button"/>
            <p id="googleBtnText">Sign in with Google</p>
          </div>*/}

          <div
            class="fb-login-button"
            data-width=""
            data-size="large"
            data-button-type="continue_with"
            data-auto-logout-link="false"
            data-use-continue-as="false">
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
