import React, { Component } from 'react';
import LoginImg from './assets/login-page.jpg';
import GoogleImg from './assets/google.jpg';
import './Login.css';

class Login extends Component {

  render() {
    return (
      <div id="LoginPage">
        <img src={LoginImg} alt="Login background"/>

        <div id="LoginInfo">
          <div id="SiteNameSlogan">
            <h1>A Better U</h1>
            <p>Helping you strive to be a better version of yourself</p>
          </div>
          <div id="googleBtn">
            <img id="GoogleImg" src={GoogleImg} alt="google button"/>
            <p id="googleBtnText">Sign in with Google</p>
          </div>
        </div>

      </div>
    );
  }

}

export default Login;
