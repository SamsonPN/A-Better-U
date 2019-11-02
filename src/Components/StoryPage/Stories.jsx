import React, { Component } from 'react';
import {StoryContext} from '../../AppContext/ExportContexts';

class Stories extends Component {
  static contextType = StoryContext;
  render() {
    const userID = this.context.user.user;
    const {date, file, story, text, user} = this.props;
    const media = `/story/media/${file.id}`;
    const image = <img className="StoriesMedia" src={media} alt="None shown"/>;
    const video = <video className="StoriesMedia" width="500px" controls src={media} alt="None Shown"></video>;
    const tag = (file.mimetype || "").includes("image") ? image : video;
    return (
      <StoryContext.Consumer>
        { ({ DeleteStory, ToggleModal }) => (
          <React.Fragment>
            <div className="Stories">
                <div className="StoriesHeader">
                  <img src={user.picture} alt="PFP"/>
                  <p>{`${user.name}\n${date}`}</p>
                </div>
                {text ?
                  <div className="StoriesTextDiv">
                    <p>{text}</p>
                  </div>
                  : null
                }

                {file ?
                  <div className="StoriesMediaDiv">
                    {tag}
                  </div>
                  : null
                }
            </div>
            <div className="StoriesButtonWrapper">
              {userID === user.user ?
                <React.Fragment>
                  <button onClick={() => ToggleModal(story, file, text)}>Edit</button>
                  <button onClick={() => DeleteStory(story, file.id)}>Delete</button>
                </React.Fragment>
              : null
              }
            </div>

          </React.Fragment>
        )}
      </StoryContext.Consumer>
    );
  }

}

export default Stories;
