import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TabWrapper extends Component {

  render() {
    return (
      <div className="TabWrapper">
        <Link to="/story" className="tabs">Story</Link>
        <Link to="/nutrition" className="tabs">Nutrition</Link>
        <Link to="/workout" className="tabs">Workout</Link>
      </div>
    );
  }

}

export default TabWrapper;
