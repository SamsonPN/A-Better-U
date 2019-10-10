import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StorySubmissionButtons extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({ PutFileInLabel, SubmitStory }) => (
          <div id="StorySubmissionButtons">
            <input
              type="file"
              name="file"
              id="file"
              className="inputFile"
              onChange={(e) => PutFileInLabel(e)}>
            </input>
            <label htmlFor="file" id="StoryMediaLabel" className="inputLabel">Photo / Video</label>
            <button id="StorySubmitBtn" onClick={() => SubmitStory()}>Submit</button>
          </div>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default StorySubmissionButtons;
