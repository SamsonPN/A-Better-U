import React, { Component } from 'react';
import StorySubmission from './StorySubmission.jsx';
import UserStories from './UserStories.jsx';

class Story extends Component {

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
