import React, { Component } from 'react';
import Stories from './Stories.jsx';

class UserStories extends Component {

  render() {
    return (
      <div id="StoriesList">
        <Stories/>
        <Stories/>
        <Stories/>
        <Stories/>
      </div>
    );
  }

}

export default UserStories;
