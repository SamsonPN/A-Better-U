import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class StoryModal extends Component {
  static contextType = StoryContext;

  GetChanges = () => {
    let newFile = document.getElementById('modalFile').files[0] || false;
    let newText = document.getElementById('StoryModalText').value;
    this.context.SaveChanges(newText, newFile);
  }

  render() {
    const {editText, PutFileInLabel, ToggleModal} = this.context;
    return (
      <div id="StoryModal">
        <div id="StoryModalContent" onClick={(e) => e.stopPropagation()}>
          <div id="StoryModalHeader">
            <p>Edit Story</p>
            <p onClick={() => ToggleModal()}>X</p>
          </div>
          <textarea id="StoryModalText" defaultValue={editText}></textarea>
          <div id="StoryModalBtnWrapper">
            <input type="file" name="file" id="modalFile" className="inputFile" onChange={(e) => PutFileInLabel(e)}></input>
            <label htmlFor="modalFile" id="StoryModalLabel" className="inputLabel">Photo / Video</label>
            <button id="StoryModalSaveBtn" onClick={() => this.GetChanges()}>Save</button>
          </div>
        </div>
      </div>
    );
  }

}

export default StoryModal;
