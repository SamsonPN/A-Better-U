import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryModal extends Component {
  static contextType = StoryContext;
  render() {
    const {editFile, preview, type} = this.context;
    const src = preview !== "" ? preview : `/story/media/${editFile.id}`;
    const contentType = preview !== "" ? type : editFile.mimetype;
    const img = <img className="StoryModalMedia" src={src} alt="No file chosen"/>;
    const video = <video className="StoryModalMedia" controls src={src}></video>;
    const media = (contentType || "").includes("image") ? img : video;
    return (
      <StoryContext.Consumer>
        { ({ editText, PutFileInLabel, SaveChanges, ToggleModal }) => (
          <div id="StoryModal" onClick={() => ToggleModal()} >
            <div id="StoryModalContent" onClick={(e) => e.stopPropagation()}>
              <div id="StoryModalHeader">
                <p>Edit Story</p>
                <p onClick={() => ToggleModal()}>X</p>
              </div>
              <textarea
                id="StoryModalText"
                defaultValue={editText}
                ref={textRef => this.textRef = textRef}>
              </textarea>
              <div id="StoryModalMediaWrapper">
                { editFile !== false || preview !== "" ? media : null }
              </div>
              <div id="StoryModalBtnWrapper">
                <input
                  type="file"
                  name="file"
                  id="modalFile"
                  className="inputFile"
                  onChange={(e) => PutFileInLabel(e)}
                  ref={fileRef => this.fileRef = fileRef}>
                </input>
                <label
                  htmlFor="modalFile"
                  id="StoryModalLabel"
                  className="inputLabel">
                  Photo / Video
                </label>
                <button
                  id="StoryModalSaveBtn"
                  onClick={() => SaveChanges(this.fileRef, this.textRef)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default StoryModal;
