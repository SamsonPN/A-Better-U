import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryModal extends Component {
  render() {
    return (
      <StoryContext.Consumer>
        { ({ editText, PutFileInLabel, SaveChanges, ToggleModal }) => (
          <div id="StoryModal" onClick={() => ToggleModal()} >
            <div id="StoryModalContent" onClick={(e) => e.stopPropagation()}>
              <div id="StoryModalHeader">
                <p>Edit Story</p>
                <p onClick={() => ToggleModal()}>X</p>
              </div>
              <textarea id="StoryModalText" defaultValue={editText} ref={textRef => this.textRef = textRef}></textarea>
              <div id="StoryModalBtnWrapper">
                <input type="file" name="file" id="modalFile" className="inputFile" onChange={(e) => PutFileInLabel(e)} ref={fileRef => this.fileRef = fileRef}></input>
                <label htmlFor="modalFile" id="StoryModalLabel" className="inputLabel">Photo / Video</label>
                <button id="StoryModalSaveBtn" onClick={() => SaveChanges(this.fileRef, this.textRef)}>Save</button>
              </div>
            </div>
          </div>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default StoryModal;
