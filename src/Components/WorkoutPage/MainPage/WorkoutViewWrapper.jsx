import React, { Component } from 'react';
import {default as SavedDropdown} from './WorkoutSavedDropdown.jsx';
import {default as RoutineDropdown} from './WorkoutRoutineDropdown.jsx';
import {default as ViewDropdown} from './WorkoutViewDropdown.jsx';

class WorkoutViewWrapper extends Component {

  render() {
    return (
      <div id="WoWrapper">
        <SavedDropdown
          workouts={this.props.workouts}
          showRoutine={this.props.showRoutine}
          />
        <RoutineDropdown
          routines={this.props.routines}
          showRoutine={this.props.showRoutine}
          />
        <ViewDropdown />
      </div>
    );
  }

}

export default WorkoutViewWrapper;
