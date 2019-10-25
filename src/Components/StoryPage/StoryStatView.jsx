import React, { Component } from 'react';

class StoryStatViewer extends Component {

  render() {
    const text = "Samson Nguyen";
    const newText = text.replace(" ", "\n");
    return (
      <div id="StoryStatView">
        <div id="StoryStatContent">
          <div id="StoryStatHeader">
            <img src={'https://graph.facebook.com/3050368568323011/picture?type=large'} alt="FB PfP" />
            <p>{newText}</p>
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
    );
  }

}

export default StoryStatViewer;
