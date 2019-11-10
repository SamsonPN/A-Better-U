import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryStatViewer extends Component {
  static contextType = StoryContext;
  render() {
    const {user} = this.context;
    const userStats = user.userStats || {};
    const goal = userStats.goal || {};
    return (
      <div id="StoryStatView">
        <div id="StoryStatContent">
          <div id="StoryStatHeader">
            <img src={user.picture} alt="PFP" />
            <p>{user.name}</p>
          </div>
          <div id="StoryStatList">
            <div className="StoryStatListItem">Age: {"\n"}{userStats.age || ""}</div>
            <p className="StoryStatListItem">Height: {"\n"}{`${userStats.feet || ""}' ${userStats.inches || ""}"`}</p>
            <p className="StoryStatListItem">Weight: {"\n"}{userStats.weight || ""} lbs</p>
            <p className="StoryStatListItem">Goal: {"\n"}{goal.name || ""}</p>
          </div>
        </div>
      </div>
    );
  }

}

export default StoryStatViewer;
