import React, {Component} from 'react';

export const StoryContext = React.createContext();

export class StoryProvider extends Component {
  ClearSubmissionForm = () => {
    document.getElementById('file').value = [];
    document.getElementById('StoryMediaLabel').textContent = "Photo / Video";
    document.getElementById('StorySubmitText').value = "";
    document.getElementById('StorySubmitMediaDiv').style.display = "none";
    this.setState({
      preview: "",
      type: ""
    })
  }

  DeleteStory = (story_id, file) => {
    let confirm = window.confirm('Do you want to delete this story?');
    if(confirm){
      let storyParam = `?story_id=${story_id}`;
      let fileParam = file ? `&public_id=${file.public_id}&resource_type=${file.resource_type}` : "";
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

  GetUserInfo = () => {
    fetch('/user/getUserInfo')
     .then(res => res.json())
     .then(data => {
       if(data.error && window.location.pathname !== '/'){
         window.location.href = '/';
       }
       else{
         this.setState({
           user: data
         })
       }
     });
  }

  PutFileInLabel = (e) => {
    let newFile = e.target.files[0];
    let label = e.target.nextElementSibling;
    label.childNodes[0].textContent = (newFile || {}).name || "Photo / Video";
    let {preview} = this.state;
    if(preview){
      URL.revokeObjectURL(this.state.preview)
    }
    if(newFile){
      let preview = URL.createObjectURL(newFile);
      let view = e.target.parentElement.id === 'StoryModalBtnWrapper' ? "modal" : "submission";
      document.getElementById('StorySubmitMediaDiv').style.display = view === 'submission' ? 'flex' : 'none';
      this.setState({
        preview,
        type: newFile.type,
        view,
        file: newFile
      })
    }
  }

  SaveChanges = (textRef) => {
    let newText = textRef.value;
    let {editFile, editStory, editText, file, preview} = this.state;
    if(file){
      if( file.size / 1000000 > 10){
        alert('This file is pretty large so it will take a bit of time to be uploaded!')
      }
      let formData = new FormData();
      formData.append('file', file);
      formData.append('oldFile', JSON.stringify(editFile));
      formData.append('_id', editStory);
      formData.append('text', newText);
      fetch('/story/editCloudinary', {
        method: 'POST',
        body: formData
      })
        .then(() => {
          this.GetStories();
          URL.revokeObjectURL(preview);
          this.ClearSubmissionForm()
        })
    }
    else if (newText !== editText){
      fetch('/story/editText', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: editStory, text: newText })
      })
        .then(() => {
          this.GetStories();
        })
    }
    this.ToggleModal()
  }

  SubmitStory = () => {
    let {file, preview} = this.state;
    let text = document.getElementById('StorySubmitText').value;
    if(file){
      if( file.size / 1000000 > 10){
        alert('This file is pretty large so it will take a bit of time to be uploaded!')
      }
      let formData = new FormData();
      formData.append('file', file);
      formData.append('text', text);
      fetch('/story/uploadCloudinary', {
        method: 'POST',
        body: formData
      })
        .then(() => {
        URL.revokeObjectURL(preview);
        this.GetStories();
        })
        .catch(err => console.error(err))
    }
    else if (text){
      fetch('/story/uploadText', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file: false, text })
      })
        .then(() => {
          this.GetStories()
        })
        .catch(err => console.error(err))
    }
    this.ClearSubmissionForm();
  }

  ToggleModal = (story, file, text) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      editStory: story ? story : "",
      editFile: file ? file : "",
      editText: text ? text : "",
      file: false
    }), function(){
      let {showModal} = this.state;
      document.body.style.overflow = showModal ? 'hidden' : 'auto';
    })
  }

  state = {
    user: {},
    stories: [],
    showModal: false,
    preview: "",
    type: "",
    view: "",
    editFile: "",
    editStory: "",
    editText: "",
    file: false
  }

  componentDidMount(){
    this.GetStories();
    this.GetUserInfo();
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
