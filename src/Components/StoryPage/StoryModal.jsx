import React, { Component } from 'react';

class StoryModal extends Component {
  render() {
    return (
      <div id="StoryModal" onClick={this.props.edit}>
        <div id="StoryModalContent" onClick={(e) => e.stopPropagation()}>
          <textarea id="StoryModalText" defaultValue="Previous Text Here"></textarea>
          <input type="file" name="file" id="modalFile" className="inputFile" onChange={(e) => this.View(e)}></input>
          <label htmlFor="modalFile" id="StoryMediaLabel" className="inputLabel">Photo / Video</label>
          <button id="StoryModalSaveBtn">Save</button>
        </div>
      </div>
    );
  }

}

export default StoryModal;
