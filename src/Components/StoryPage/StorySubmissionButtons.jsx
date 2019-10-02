import React, { Component } from 'react';

class StorySubmissionButtons extends Component {

  render() {
    return (
      <div id="StorySubmissionButtons">
        {/*
        <div id="StorySubmitMediaWrapper">
          <button className="StorySubmitMediaBtns" id="StorySubmitPhoto">Photo</button>
          <button className="StorySubmitMediaBtns" id="StorySubmitVideo">Video</button>
        </div>
      */}
        <button className="StorySubmitMediaBtns">Photo/Video</button>
        <button id="StorySubmitBtn">Submit</button>
      </div>
    );
  }

}

export default StorySubmissionButtons;
