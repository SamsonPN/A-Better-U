import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';
import Img from 'react-image';
import DefaultPicture from '../../assets/default-profile-pic.jpg';

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
            <Img
              src={user.picture}
              loader={ <img src={DefaultPicture} alt="pfp"/> }
            />
            <p>{user.name}</p>
          </div>
          {userStats.age ?
            <div id="StoryStatList">
              <div className="StoryStatListItem">Age: {"\n"}{userStats.age || ""}</div>
              <p className="StoryStatListItem">Height: {"\n"}{`${userStats.feet || ""}' ${userStats.inches || ""}"`}</p>
              <p className="StoryStatListItem">Weight: {"\n"}{userStats.weight || ""} lbs</p>
              <p className="StoryStatListItem">Goal: {"\n"}{goal.name || ""}</p>
            </div>
            : null
          }
        </div>
      </div>
    );
  }

}

export default StoryStatViewer;
