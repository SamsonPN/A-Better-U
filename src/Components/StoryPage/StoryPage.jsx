import React, { Component } from 'react';
import StoryStatView from './StoryStatView';
import StoriesList from './StoriesList';
import StoryModal from './StoryModal';
import StorySubmission from './StorySubmission';
import {StoryContext} from '../../AppContext/ExportContexts';

class Story extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({showModal}) => (
        <div id="Story">
          <StoryStatView />
          <div id="StoryTimeline">
            <StorySubmission />
            <StoriesList />
          </div>
          { showModal ? <StoryModal/> : null }
        </div>
      )}
      </StoryContext.Consumer>
    );
  }
}

export default Story;
