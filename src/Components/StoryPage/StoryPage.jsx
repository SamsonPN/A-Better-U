import React, { Component } from 'react';
import SubmissionForm from './StorySubmissionForm';
import StoriesList from './StoriesList';
import StoryModal from './StoryModal';

class Story extends Component {
  state = {
    stories: [],
    toggleModal: false
  }
  componentDidMount(){
    this.GetStories()
  }

  GetStories = () => {
    fetch('/getStories')
      .then(res => res.json())
      .then(data => {
        this.setState({
          stories: data
        })
      })
  }

  SubmitStory = () => {
    let mediaTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/quicktime",
                      "video/x-flv", "application/x-mpegURL", "video/MP2T", "video/3gpp",
                      "video/x-msvideo", "video/x-ms-wmv"];
    let file = document.getElementById('file').files[0];
    let text = document.getElementById('StorySubmitText').value;
    if(file){
      if(mediaTypes.indexOf(file.type) === -1){
        alert("Please upload a photo or a video only!");
        return
      }
      let uri = `/uploadStories?text=${text}`;
      let formData = new FormData();
      formData.append('file', file);
      fetch(uri, {
        method: 'POST',
        body: formData
      })
        .then(res => {
          this.ClearSubmissionForm();
          this.GetStories();
        })
    }
    else {
      fetch('/uploadText', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({text})
      })
        .then(res => {
          this.ClearSubmissionForm();
          this.GetStories();
        })
    }
  }

  DeleteStory = (story_id, file_id) => {
    let confirm = window.confirm('Do you want to delete this story?');

    if(confirm){
      let storyParam = `?story_id=${story_id}`;
      let fileParam = file_id ? `&file_id=${file_id}` : "";
      let uri = '/deleteStory' + storyParam + fileParam;

      fetch(uri, {
        method: "DELETE",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(res => {
        this.GetStories()
      })
    }
  }

  ToggleModal = () => {
    this.setState(prevState => ({
      toggleModal: !prevState.toggleModal
    }), function(){
      let modalToggle = this.state.toggleModal;
      document.body.style.overflow = modalToggle ? 'hidden' : 'auto';
    })
  }

  ClearSubmissionForm = () => {
    document.getElementById('file').value = [];
    document.getElementById('StoryMediaLabel').textContent = "Photo / Video";
    document.getElementById('StorySubmitText').value = "";
  }

  render() {
    const {showStoryModal, stories} = this.state;
    return (
      <div id="Story">
        <SubmissionForm submit={this.SubmitStory}/>
        <StoriesList stories={stories} deleteStory={this.DeleteStory} toggleModal={this.ToggleModal}/>
        {showStoryModal ?
          <StoryModal edit={this.EditStory}/>
          : null
        }
      </div>
    );
  }

}

export default Story;
