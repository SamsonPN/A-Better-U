import React, { Component } from 'react';
import SubmissionForm from './StorySubmissionForm';
import StoriesList from './StoriesList';

class Story extends Component {
  render() {
    return (
      <div id="Story">
        <SubmissionForm/>
        <StoriesList/>
      </div>
    );
  }

}

export default Story;
