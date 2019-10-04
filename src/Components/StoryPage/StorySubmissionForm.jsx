import React, { Component } from 'react';
import StorySubmissionButtons from './StorySubmissionButtons.jsx';

class StorySubmission extends Component {

  render() {
    return (
      <div id="StorySubmission">
        <textarea id="StorySubmitText" placeholder="Your Story starts today"></textarea>
        <StorySubmissionButtons submit={this.props.submit}/>
      </div>
    );
  }
}

export default StorySubmission;
