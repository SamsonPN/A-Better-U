import React, { Component } from 'react';
import logo from '../../assets/ABU-Icon.svg';

class IconName extends Component {
  render() {
    return (
      <div className="IconWrapper">
        <img id="icon" src={logo} alt="Unable to load"/>
        <p id="icon_name">A Better U</p>
      </div>
    );
  }

}

export default IconName;
