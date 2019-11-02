import React, {Component} from 'react';

export const StoryContext = React.createContext();

export class StoryProvider extends Component {
  ClearSubmissionForm = () => {
    document.getElementById('file').value = [];
    document.getElementById('StoryMediaLabel').textContent = "Photo / Video";
    document.getElementById('StorySubmitText').value = "";
    this.setState({
      preview: "",
      type: ""
    })
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
    let type = newFile.type;
    let label = e.target.nextElementSibling;
    label.textContent = (newFile || {}).name || "Photo / Video";
    if(newFile){
      let preview = URL.createObjectURL(newFile);
      let view = e.target.parentElement.id === 'StoryModalBtnWrapper' ? "modal" : "submission";
      this.setState({
        preview,
        type,
        view
      })
    }
  }

  SaveChanges = (fileRef, textRef) => {
    let newFile = fileRef.files[0] || false;
    let newText = textRef.value;
    let {editFile, editStory, editText} = this.state;
    let text = editText === newText ? editText : newText;
    let uri = '/story/editStories';
    let formData = new FormData();
    formData.append('file', newFile);
    formData.append('oldFile', JSON.stringify(editFile));
    formData.append('_id', editStory);
    formData.append('text', text);
    fetch(uri, {
      method: 'PUT',
      body: formData
    })
      .then(() => {
        this.GetStories();
        URL.revokeObjectURL(this.state.preview);
        this.setState({
          preview: "",
          type: ""
        })
      })
    this.ToggleModal()
  }

  SubmitStory = (e) => {
    let file = document.getElementById('file').files[0];
    let text = document.getElementById('StorySubmitText').value;
    if (file || text){
      let uri = '/story/uploadStories';
      let formData = new FormData();
      formData.append('file', file);
      formData.append('text', text);
      fetch(uri, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          URL.revokeObjectURL(this.state.preview);
          this.ClearSubmissionForm();
          this.GetStories();
          window.location.href = "http://localhost:3000/story"
       })
    }
  }

  ToggleModal = (story_id, file, story_text) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      editStory: story_id !== undefined ? story_id : "",
      editFile: file !== undefined ? file : "",
      editText: story_text !== undefined ? story_text : ""
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
