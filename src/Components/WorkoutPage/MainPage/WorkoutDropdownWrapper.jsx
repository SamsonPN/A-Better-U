import React, { Component } from 'react';
import {default as SavedDropdown} from './WorkoutSavedDropdown.jsx';
import {default as RoutineDropdown} from './WorkoutRoutineDropdown.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class WorkoutDropdownWrapper extends Component {
  render() {
    return (
      <div id="WoWrapper">
        <DatePicker
          selected={this.props.calendarDate}
          onSelect={(e) => this.props.changeDate(e)}
          onChange={(e) => this.props.changeDate(e)}
          className="WoViews"
          withPortal
          utcOffset
        />
        <RoutineDropdown
          routines={this.props.routines}
          showRoutine={this.props.showRoutine}
          />
        <SavedDropdown
          workouts={this.props.workouts}
          showRoutine={this.props.showRoutine}
          />
      </div>
    );
  }

}

export default WorkoutDropdownWrapper;
