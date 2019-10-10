import React, {Component} from 'react';

export const StoryContext = React.createContext();

// all methods should be declared first BEFORE they are
// put into the state!
export class StoryProvider extends Component {
  GetStories = () => {
    fetch('/getStories')
      .then(res => res.json())
      .then(data => {
        this.setState({
          stories: data
        })
     })
  }

  ClearSubmissionForm = () => {
    document.getElementById('file').value = [];
    document.getElementById('StoryMediaLabel').textContent = "Photo / Video";
    document.getElementById('StorySubmitText').value = "";
  }

  PutFileInLabel = (e) => {
    let file = e.target.files[0];
    let label = e.target.nextElementSibling;
    label.textContent = (file || {}).name || "Photo / Video";
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
      let uri = '/uploadStoriesWithFile';
      let formData = new FormData();
      formData.append('file', file);
      formData.append('text', text);
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
      fetch('/uploadStoriesWithoutFile', {
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

  ToggleModal = (story_id, file_id, story_text) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      editStory: story_id !== undefined ? story_id : "",
      editFile: file_id !== undefined ? file_id : "",
      editText: story_text !== undefined ? story_text : ""
    }), function(){
      let modalToggle = this.state.showModal;
      document.body.style.overflow = modalToggle ? 'hidden' : 'auto';
    })
  }

  SaveChanges = (newText, newFile) => {
    let {editFile, editStory, editText, mediaTypes} = this.state;
    let text = editText === newText ? editText : newText;
    if(newFile){
      if(mediaTypes.indexOf(newFile.type) === -1){
        alert("Please upload a photo or a video only!");
        return
      }
      let uri = '/editStoriesWithFile';
      let formData = new FormData();
      formData.append('file', newFile);
      formData.append('_id', editStory);
      formData.append('oldFile', editFile);
      formData.append('text', text);
      fetch(uri, {
        method: 'PUT',
        body: formData
      })
        .then(res => {
          this.GetStories();
        })
    }
    else {
      fetch('/editStoriesWithoutFile', {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({"text" : text, "_id" : editStory})
      })
        .then(res => {
          this.GetStories();
        })
    }
    this.ToggleModal()
  }

  state = {
    stories: [],
    GetStories: this.GetStories,
    SubmitStory: this.SubmitStory,
    DeleteStory: this.DeleteStory,
    ToggleModal: this.ToggleModal,
    SaveChanges: this.SaveChanges,
    PutFileInLabel: this.PutFileInLabel,
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
    return (
      <StoryContext.Provider value={this.state}>
        {this.props.children}
      </StoryContext.Provider>
    );
  }

}
