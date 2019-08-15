import React, { Component } from 'react';
import StorySubmissionButtons from './StorySubmissionButtons.jsx';

class StorySubmission extends Component {

  render() {
    return (
      <div id="StorySubmission">
        <textarea id="StorySubmitText">Your story starts today</textarea>
        <StorySubmissionButtons/>
      </div>
    );
  }

}

export default StorySubmission;
