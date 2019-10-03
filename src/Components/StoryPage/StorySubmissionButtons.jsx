import React, { Component } from 'react';

class StorySubmissionButtons extends Component {
  View = (e) => {
    // onChange, get the files
    console.log(e.target.files)
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
  }
  render() {
    return (
      <div id="StorySubmissionButtons">
        {/*
        <div id="StorySubmitMediaWrapper">
          <button className="StorySubmitMediaBtns" id="StorySubmitPhoto">Photo</button>
          <button className="StorySubmitMediaBtns" id="StorySubmitVideo">Video</button>
        </div>
      */}
      <form>
        <input type="file" name="file" id="file" className="inputFile" onChange={(e) => this.View(e)}></input>
        <label htmlFor="file" id="StoryMediaLabel">Photo / Video</label>
      </form>
        <button id="StorySubmitBtn">Submit</button>
      </div>
    );
  }

}

export default StorySubmissionButtons;
