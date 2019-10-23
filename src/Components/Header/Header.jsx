import React, { Component } from 'react';
import TabWrapper from './HeaderTabWrapper';
import IconName from './HeaderIconName';


class Header extends Component {
  render() {
    return (
      <div id='header'>
        <IconName />
        <TabWrapper/>
      </div>
    );
  }
}

export default Header;
