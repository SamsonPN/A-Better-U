import React, { Component } from 'react';
import Stories from './Stories.jsx';

class UserStories extends Component {
  render() {
    const stories = this.props.stories.map(story =>
      <Stories
        key={story._id}
        date={story.date}
        deleteStory={this.props.deleteStory}
        id={story.file_id}
        text={story.text}
        story={story._id}
        toggleModal={this.props.toggleModal}
        type={story.file_type}
        user={story.user}
        />
    )
    return (
      <div id="StoriesList">
        {stories}
      </div>
    );
  }

}

export default UserStories;
