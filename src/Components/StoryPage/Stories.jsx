import React, { Component } from 'react';

class Stories extends Component {
  render() {
    const {date, deleteStory, toggleModal, id, story, text, type} = this.props;
    const media = `media/${id}`;
    const tag = (type || "").includes("image") ? <img src={media} alt="None shown"/> : <video width="500px" controls src={media}></video>;

    return (
      <React.Fragment>
        <div className="Stories">
          <div className="StoriesDateDiv">
            <p>{date}</p>
          </div>

          {text ?
            <div className="StoriesTextDiv">
              <p>{text}</p>
            </div>
            : null
          }

          {id ?
            <div className="StoriesMediaDiv">
              {tag}
            </div>
            : null
          }
        </div>
        <div className="StoriesButtonWrapper">
          <button onClick={() => toggleModal(story, id, text)}>Edit</button>
          <button onClick={() => deleteStory(story, id)}>Delete</button>
        </div>
      </React.Fragment>
    );
  }

}

export default Stories;
