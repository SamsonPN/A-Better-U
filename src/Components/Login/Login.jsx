import React, { Component } from 'react';
import LoginImg from '../../assets/login-page.jpg';
import GoogleImg from '../../assets/google.jpg';
import './Login.css';

class Login extends Component {
  render() {
    const hostname = window.location.hostname;
    return (
      <div id="LoginPage">
        <img id="LoginImg" src={LoginImg} alt="Login background"/>

        <div id="LoginInfo">
          <div id="SiteNameSlogan">
            <h1>A Better U</h1>
            <p>Helping you strive to be a better version of yourself</p>
          </div>
          <div id="LoginBtnWrapper">
            <a id="googleBtn" className="LoginBtns" href={`http://${hostname}:9000/auth/google`}>
              <img id="googleImg" src={GoogleImg} alt="google button"/>
              <p id="googleBtnText">Sign in with Google</p>
            </a>
            <a
              id="fbBtn"
              href={`http://${hostname}:9000/auth/facebook`}>
              <div
                className="fb-login-button"
                data-width=""
                data-size="large"
                data-button-type="login_with">
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
