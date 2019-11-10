import React, { Component } from 'react';
import logo from '../../assets/ABU-Icon.svg';

class IconName extends Component {
  render() {
    return (
      <div id="IconWrapper">
        <img id="Icon" src={logo} alt="Unable to load"/>
        <p id="IconName">A Better U</p>
        <a id="LogoutBtn" href="http://localhost:9000/auth/logout">Logout</a>
      </div>
    );
  }
}

export default IconName;
