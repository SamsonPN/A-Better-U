import React, { Component } from 'react';
import SubmissionButtons from './StorySubmissionButtons';
import {StoryContext} from '../../AppContext/ExportContexts';

class StorySubmission extends Component {
  static contextType = StoryContext;
  render() {
    const {preview, type, view} = this.context;
    const img = <img className="StorySubmitMedia" src={preview} alt="No file chosen"/>;
    const video = <video className="StorySubmitMedia" controls src={preview}></video>;
    const media = type.includes("image") ? img : video;
    return (
      <div id="StorySubmission">
        <div id="StorySubmissionContent">
          <textarea
            id="StorySubmitText"
            placeholder="Your Story starts today">
          </textarea>
          <div id="StorySubmitMediaDiv">
            {preview !== "" && view === "submission" ? media : null }
          </div>
        </div>
        <SubmissionButtons />
      </div>
    );
  }
}

export default StorySubmission;
