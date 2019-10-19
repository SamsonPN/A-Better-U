import React, {Component} from 'react';

export const StoryContext = React.createContext();

export class StoryProvider extends Component {
  ClearSubmissionForm = () => {
    document.getElementById('file').value = [];
    document.getElementById('StoryMediaLabel').textContent = "Photo / Video";
    document.getElementById('StorySubmitText').value = "";
  }

  DeleteStory = (story_id, file_id) => {
    let confirm = window.confirm('Do you want to delete this story?');
    if(confirm){
      let storyParam = `?story_id=${story_id}`;
      let fileParam = file_id ? `&file_id=${file_id}` : "";
      let uri = '/story/deleteStory' + storyParam + fileParam;

      fetch(uri, {
        method: "DELETE",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(() => {
        this.GetStories()
      })
    }
  }

  GetStories = () => {
    fetch('/story/getStories')
      .then(res => res.json())
      .then(data => {
        this.setState({
          stories: data
        })
     })
  }

  PutFileInLabel = (e) => {
    let file = e.target.files[0];
    let label = e.target.nextElementSibling;
    label.textContent = (file || {}).name || "Photo / Video";
  }

  SaveChanges = (fileRef, textRef) => {
    let newFile = fileRef.files[0] || false;
    let newText = textRef.value;
    let {editFile, editStory, editText, mediaTypes} = this.state;
    let text = editText === newText ? editText : newText;
    if(newFile){
      if(mediaTypes.indexOf(newFile.type) === -1){
        alert("Please upload a photo or a video only!");
        return
      }
    }
    let uri = '/story/editStories';
    let formData = new FormData();
    formData.append('file', newFile);
    formData.append('_id', editStory);
    formData.append('oldFile', editFile);
    formData.append('text', text);
    fetch(uri, {
      method: 'PUT',
      body: formData
    })
      .then(() => {
        this.GetStories();
      })
    this.ToggleModal()
  }

  SubmitStory = () => {
    let {mediaTypes} = this.state;
    let file = document.getElementById('file').files[0];
    let text = document.getElementById('StorySubmitText').value;
    if(file){
      if(mediaTypes.indexOf(file.type) === -1){
        alert("Please upload a photo or a video only!");
        return
      }
    }
    let uri = '/story/uploadStories';
    let formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    fetch(uri, {
      method: 'POST',
      body: formData
    })
      .then(() => {
        this.ClearSubmissionForm();
        this.GetStories();
      })
  }

  ToggleModal = (story_id, file_id, story_text) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      editStory: story_id !== undefined ? story_id : "",
      editFile: file_id !== undefined ? file_id : "",
      editText: story_text !== undefined ? story_text : ""
    }), function(){
      let {showModal} = this.state;
      document.body.style.overflow = showModal ? 'hidden' : 'auto';
    })
  }

  state = {
    stories: [],
    showModal: false,
    editFile: "",
    editStory: "",
    editText: "",
    mediaTypes : ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/quicktime",
                 "video/x-flv", "application/x-mpegURL", "video/MP2T", "video/3gpp",
                 "video/x-msvideo", "video/x-ms-wmv"]
  }

  componentDidMount(){
    this.GetStories()
  }

  render() {
    const {state, ...methods} = this;
    return (
      <StoryContext.Provider value={{...methods, ...state}}>
        {this.props.children}
      </StoryContext.Provider>
    );
  }
}
