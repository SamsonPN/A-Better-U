import React, { Component } from 'react';
import StorySubmission from './StorySubmission.jsx';
import UserStories from './UserStories.jsx';
// import UserContext from '../../UserContext.js'

class Story extends Component {
  // static contextType = UserContext;

  componentDidMount(){
    // const user = this.context.user;
    // console.log(user);
  }

  render() {
    return (
      <div id="Story">
        <StorySubmission/>
        <UserStories/>
      </div>
    );
  }

}

export default Story;
