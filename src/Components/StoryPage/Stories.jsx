import React, { Component } from 'react';

class Stories extends Component {

  render() {
    const {date, file, text} = this.props;
    const image = `image/${file}`;
    return (
      <React.Fragment>
        <div id="Stories">
          <div className="StoriesDateDiv">
            <p>{date}</p>
          </div>

          {text ?
            <div className="StoriesTextDiv">
              <p>{text}</p>
            </div>
            : null
          }

          {file ?
            <div className="StoriesMediaDiv">
              <img src={image} alt="Media here"/>
            </div>
            : null
          }
        </div>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </React.Fragment>
    );
  }

}

export default Stories;
