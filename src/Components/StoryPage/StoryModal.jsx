import React, { Component } from 'react';
import Img from 'react-image';
import Spinner from './Spinner';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryModal extends Component {
  static contextType = StoryContext;
  componentDidMount(){
    let {editFile} = this.context;
    document.getElementById('StoryModalMediaWrapper').style.display = editFile ? 'flex' : 'none';
  }
  render() {
    const {editFile, preview, type} = this.context;
    const src = preview !== "" ? preview : editFile.secure_url;
    const contentType = preview !== "" ? type : editFile.resource_type;
    const img = <Img className="StoryModalMedia" src={src} loader={<Spinner/>}/>;
    const video = <video className="StoryModalMedia" controls src={src}></video>;
    const media = (contentType || "").includes("image") ? img : video;
    return (
      <StoryContext.Consumer>
        { ({ editText, PutFileInLabel, SaveChanges, ToggleModal }) => (
          <div id="StoryModal">
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
                {media}
              </div>

              <div id="StoryModalBtnWrapper">
                <input
                  type="file"
                  name="file"
                  id="modalFile"
                  className="inputFile"
                  onChange={(e) => PutFileInLabel(e)}
                  >
                </input>
                <label
                  htmlFor="modalFile"
                  id="StoryModalLabel"
                  className="inputLabel">
                  <span>Photo / Video</span>
                </label>
                <button
                  id="StoryModalSaveBtn"
                  onClick={() => SaveChanges(this.textRef)}>
                  <span>Save</span>
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
