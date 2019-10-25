import React, { Component } from 'react';
import LoginImg from '../../assets/login-page.jpg';
import GoogleImg from '../../assets/google.jpg';
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

          <a id="googleBtn" href="http://localhost:9000/auth/google">
            <img id="GoogleImg" src={GoogleImg} alt="google button"/>
            <p id="googleBtnText">Sign in with Google</p>
          </a>
          <a id="googleBtn" href="http://localhost:9000/auth/facebook">
            Login with facebook!
          </a>
        </div>
      </div>
    );
  }

}

export default Login;
