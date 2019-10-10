import React, { Component } from 'react';
import Stories from './Stories.jsx';
import {StoryContext} from '../../AppContext/ExportContexts';

class UserStories extends Component {
  static contextType = StoryContext;
  render() {
    const stories = this.context.stories.map(story =>
      <Stories
        key={story._id}
        date={story.date}
        id={story.file_id}
        text={story.text}
        story={story._id}
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
