import React, { Component } from 'react';

class StoryModal extends Component {
  View = (e) => {
    //puts file name into the button
    let file = e.target.files[0];
    document.getElementById('StoryModalLabel').textContent = (file || {}).name || "Photo / Video";
  }

  GetChanges = () => {
    let newFile = document.getElementById('modalFile').files[0] || false;
    let newText = document.getElementById('StoryModalText').value;
    this.props.save(newText, newFile);
  }
  render() {
    const {editText} = this.props;
    return (
      <div id="StoryModal">
        <div id="StoryModalContent" onClick={(e) => e.stopPropagation()}>
          <div id="StoryModalHeader">
            <p>Edit Story</p>
            <p onClick={this.props.toggleModal}>X</p>
          </div>
          <textarea id="StoryModalText" defaultValue={editText}></textarea>
          <div id="StoryModalBtnWrapper">
            <input type="file" name="file" id="modalFile" className="inputFile" onChange={(e) => this.View(e)}></input>
            <label htmlFor="modalFile" id="StoryModalLabel" className="inputLabel">Photo / Video</label>
            <button id="StoryModalSaveBtn" onClick={() => this.GetChanges()}>Save</button>
          </div>
        </div>
      </div>
    );
  }

}

export default StoryModal;
