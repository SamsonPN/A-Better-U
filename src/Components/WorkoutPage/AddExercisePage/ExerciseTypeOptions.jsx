import React, { Component } from 'react';

class ExerciseTypeOptions extends Component {
  render() {
    return (
      <div className="AddExerciseOptions">
        <div className="AeViews">Exercise Type</div>
        <ul className="AeViewsDropdown">
          <EtOptionItem/>
          <EtOptionItem/>
          <EtOptionItem/>
          <EtOptionItem/>
        </ul>
      </div>

    );
  }
}

export default ExerciseTypeOptions;

class EtOptionItem extends Component {

  render() {
    return (
      <a className="AeOptionItem" href='#!'>Exercise Type</a>
    );
  }
}
