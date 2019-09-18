import React, { Component } from 'react';
import {default as DateDropdown} from './WorkoutDateDropdown.jsx';
import {default as RoutineDropdown} from './WorkoutRoutineDropdown.jsx';
import {default as ViewDropdown} from './WorkoutViewDropdown.jsx';

class WorkoutViewWrapper extends Component {

  render() {
    return (
      <div id="WoWrapper">
        <DateDropdown/>
        <RoutineDropdown routines={this.props.routines} showRoutine={this.props.showRoutine}/>
        <ViewDropdown/>
      </div>
    );
  }

}

export default WorkoutViewWrapper;
