import React, { Component } from 'react';
import SubmissionForm from './StorySubmissionForm';
import StoriesList from './StoriesList';
import StoryModal from './StoryModal';
import {StoryContext} from '../../AppContext/ExportContexts';

class Story extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({showModal}) => (
        <div id="Story">
          <SubmissionForm/>
          <StoriesList/>
          {showModal ?
            <StoryModal/>
            : null
          }
        </div>
      )}
      </StoryContext.Consumer>
    );
  }

}

export default Story;
