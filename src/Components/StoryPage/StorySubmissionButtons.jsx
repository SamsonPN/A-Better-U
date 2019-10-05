import React, { Component } from 'react';

class StorySubmissionButtons extends Component {
  View = (e) => {
    //puts file name into the button
    let file = e.target.files[0];
    document.getElementById('StoryMediaLabel').textContent = (file || {}).name || "Photo / Video";
  }

  render() {
    return (
      <div id="StorySubmissionButtons">
        <input type="file" name="file" id="file" className="inputFile" onChange={(e) => this.View(e)}></input>
        <label htmlFor="file" id="StoryMediaLabel" className="inputLabel">Photo / Video</label>
        <button id="StorySubmitBtn" onClick={() => this.props.submit()}>Submit</button>
      </div>
    );
  }

}

export default StorySubmissionButtons;
