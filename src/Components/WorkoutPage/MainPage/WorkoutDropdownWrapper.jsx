import React, { Component } from 'react';
import SavedDropdown from './WorkoutSavedDropdown.jsx';
import RoutineDropdown from './WorkoutRoutineDropdown.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class WorkoutDropdownWrapper extends Component {
  render() {
    return (
      <WorkoutContext.Consumer>
        { ({ ChangeWorkoutDate, workoutDate }) => (
          <div id="WoWrapper">
            <DatePicker
              selected={new Date(workoutDate)}
              onSelect={(e) => ChangeWorkoutDate(e)}
              onChange={(e) => ChangeWorkoutDate(e)}
              className="WoViews"
              withPortal
              utcOffset
            />
            <RoutineDropdown />
            <SavedDropdown />
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default WorkoutDropdownWrapper;
