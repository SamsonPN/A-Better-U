import React, { Component } from 'react';
import Img from 'react-image';
import {StoryContext} from '../../AppContext/ExportContexts';
import './Story.css';
import Spinner from '../../assets/ajax-loader.gif';

class Stories extends Component {
  static contextType = StoryContext;
  render() {
    const userID = this.context.user.user;
    const {date, file, story, text, user} = this.props;
    const media = `/story/media/${file.id}`;
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
                    { (file.mimetype || "").includes("image") ?
                      <Img
                        className="StoriesMedia"
                        src={media}
                        loader={ <img src={Spinner} alt="AJAX loader"/> }
                        />
                      : <video
                          className="StoriesMedia"
                          width="500px"
                          controls
                          src={media}
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
