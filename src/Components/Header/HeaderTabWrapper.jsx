import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TabWrapper extends Component {
  render() {
    return (
      <div id="TabWrapper">
        <Link to="/story" id="/story" className="tabs">Story</Link>
        <Link to="/nutrition" id="/nutrition" className="tabs">Nutrition</Link>
        <Link to="/workout" id="/workout" className="tabs">Workout</Link>
      </div>
    );
  }
}

export default TabWrapper;
