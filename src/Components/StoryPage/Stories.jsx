import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class Stories extends Component {
  render() {
    const {date, id, story, text, type} = this.props;
    const media = `/story/media/${id}`;
    const image = <img src={media} alt="None shown"/>;
    const video = <video width="500px" controls src={media} alt="None Shown"></video>;
    const tag = (type || "").includes("image") ? image : video;

    return (
      <StoryContext.Consumer>
        { ({ DeleteStory, ToggleModal }) => (
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
              <button onClick={() => ToggleModal(story, id, text)}>Edit</button>
              <button onClick={() => DeleteStory(story, id)}>Delete</button>
            </div>
          </React.Fragment>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default Stories;
