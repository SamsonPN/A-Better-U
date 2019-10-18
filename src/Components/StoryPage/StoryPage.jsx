import React, { Component } from 'react';
import StoriesList from './StoriesList';
import StoryModal from './StoryModal';
import SubmissionButtons from './StorySubmissionButtons';
import {StoryContext} from '../../AppContext/ExportContexts';

class Story extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({showModal}) => (
        <div id="Story">
          <StorySubmission />
          <StoriesList />
          { showModal ? <StoryModal/> : null }
        </div>
      )}
      </StoryContext.Consumer>
    );
  }
}

export default Story;

class StorySubmission extends Component {
  render() {
    return (
      <div id="StorySubmission">
        <textarea
          id="StorySubmitText"
          placeholder="Your Story starts today">
        </textarea>
        <SubmissionButtons />
      </div>
    );
  }
}
