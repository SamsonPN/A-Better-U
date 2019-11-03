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
            <p className="StoryStatListItem">Age: {userStats.age || ""}</p>
            <p className="StoryStatListItem">Height: {`${userStats.feet || ""}' ${userStats.inches || ""}"`}</p>
            <p className="StoryStatListItem">Weight: {userStats.weight || ""} lbs</p>
            <p className="StoryStatListItem">Goal: {goal.name || ""}</p>
            <a className="StoryStatListItem" href="http://localhost:9000/auth/logout">Logout</a>
          </div>
        </div>
      </div>
    );
  }

}

export default StoryStatViewer;
