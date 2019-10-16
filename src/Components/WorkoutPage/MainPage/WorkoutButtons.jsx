import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {WorkoutContext} from '../../../AppContext/ExportContexts';
import {Add, Save, Edit, Delete} from '../../../assets/ExportWorkoutBtns';

class WorkoutButtons extends Component {
  render() {
    return (
      <WorkoutContext.Consumer>
        { ({ currentRoutine, ChangeWorkoutDate, DeleteCurrentRoutine, SaveWorkout, tab}) => (
          <div id="WoIconWrapper">
            <Link to="/workout/routineview/routines/new">
              <img
                className="WoBtns"
                src={Add}
                alt="Add Routine Button"
                title="Add a routine"
                />
            </Link>

            {Object.keys(currentRoutine).length !== 0 && tab !== 'Date' ?
              <React.Fragment>
                <img
                  className="WoBtns"
                  src={Save}
                  alt="Save Button"
                  onClick={() => SaveWorkout()}
                  title="Save this workout"
                />
              <Link
                to={`/workout/routineview/${tab === 'Routine' ? 'routines' : 'workouts'}/${currentRoutine._id}`}
              >
                  <img
                    className="WoBtns"
                    src={Edit}
                    alt="Edit Button"
                    title="Edit this routine"
                  />
                </Link>
                <img
                  className="WoBtns"
                  src={Delete}
                  alt="Delete Button"
                  onClick={DeleteCurrentRoutine}
                  title="Delete this routine"
                />
              </React.Fragment>
              : null
            }
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default WorkoutButtons;
