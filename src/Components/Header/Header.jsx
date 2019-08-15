import React, { Component } from 'react';
import TabWrapper from './HeaderTabWrapper.jsx';
import IconName from './HeaderIconName.jsx';


class Header extends Component {

  render() {
    return (
      <div id='header'>
        <IconName />
        <TabWrapper />
      </div>
    );
  }
}

export default Header;
