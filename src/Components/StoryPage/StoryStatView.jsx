import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryStatViewer extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({ user }) => (
          <div id="StoryStatView">
            <div id="StoryStatContent">
              <div id="StoryStatHeader">
                <img src={user.picture} alt="PFP" />
                <p>{user.name}</p>
              </div>
              <div id="StoryStatList">
                <p className="StoryStatListItem">Age</p>
                <p className="StoryStatListItem">Height</p>
                <p className="StoryStatListItem">SW</p>
                <p className="StoryStatListItem">CW</p>
                <p className="StoryStatListItem">GW</p>
                <p className="StoryStatListItem">Goal</p>
              </div>
            </div>
          </div>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default StoryStatViewer;
