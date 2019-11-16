import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import SavedDropdown from './WorkoutSavedDropdown.jsx';
import RoutineDropdown from './WorkoutRoutineDropdown.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class WorkoutDropdownWrapper extends Component {
  static contextType = WorkoutContext;
  render() {
    return (
      <WorkoutContext.Consumer>
        { ({ ChangeWorkoutDate, savedWorkouts, workoutDate }) => (
          <div id="WoWrapper">
              <DatePicker
                selected={new Date(workoutDate)}
                onChange={(e) => ChangeWorkoutDate('Date', e)}
                onSelect={(e) => ChangeWorkoutDate('Date', e)}
                className="WoViews"
                withPortal
                utcOffset
                highlightDates={savedWorkouts}
                todayButton="Refresh"
              />
            <RoutineDropdown />
            <Link
              to="/workout/routineview/routines/new">
              <button
                className="WoViews"
                >
                Add Routine
              </button>
            </Link>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default WorkoutDropdownWrapper;
