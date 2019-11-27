import React, { Component } from 'react';
import Img from 'react-image';
import Spinner from './Spinner';
import {StoryContext} from '../../AppContext/ExportContexts';
import './Story.css';

class Stories extends Component {
  static contextType = StoryContext;
  render() {
    const userID = this.context.user.user;
    const {date, file, story, text, user} = this.props;
    return (
      <StoryContext.Consumer>
        { ({ DeleteStory, showModal, ToggleModal }) => (
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
                    { (file.resource_type || "").includes("image") ?
                      <Img
                        className="StoriesMedia"
                        src={file.secure_url}
                        loader={<Spinner/>}
                        />
                      : <video
                          className="StoriesMedia"
                          width="500px"
                          controls
                          src={file.secure_url}
                          alt="None Shown">
                        </video>
                    }
                  </div>
                  : null
                }
            </div>
            <div className="StoriesButtonWrapper">
              {userID === user.user ?
                <React.Fragment>
                  <button onClick={() => ToggleModal(story, file, text)}>Edit</button>
                  <button onClick={() => DeleteStory(story, file)}>Delete</button>
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
