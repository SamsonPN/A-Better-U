import React, { Component } from 'react';

class BodyOptions extends Component {
  render() {
    return (
      <div className="AddExerciseOptions">
        <div className="AeViews">Body Part</div>
        <ul className="AeViewsDropdown">
          <BodyOptionItem/>
          <BodyOptionItem/>
          <BodyOptionItem/>
          <BodyOptionItem/>
        </ul>
      </div>

    );
  }
}

export default BodyOptions;

class BodyOptionItem extends Component {

  render() {
    return (
      <a className="AeOptionItem" href='#!'>Body Part</a>
    );
  }
}
