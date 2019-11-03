import React, { Component } from 'react';
import IconName from './HeaderIconName';
import TabWrapper from './HeaderTabWrapper';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div id='Header'>
        <IconName />
        <TabWrapper/>
      </div>
    );
  }
}

export default Header;
