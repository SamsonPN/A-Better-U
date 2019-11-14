import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {WorkoutContext} from '../../../AppContext/ExportContexts';
import {Save, Edit, Delete} from '../../../assets/ExportWorkoutBtns';

class WorkoutButtons extends Component {
  render() {
    const {collection, documentID, workoutIndex} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ ChangeWorkoutDate, DeleteCurrentRoutine, GetWorkoutById, SaveWorkout, tab }) => (
          <div id="WoBtnsWrapper">
            <img
              className="WoBtns"
              src={Save}
              alt="Save Button"
              title="Save this workout"
              onClick={() => SaveWorkout(workoutIndex)}
              />
            <Link
              to={`/workout/routineview/${collection}/${documentID}`}
              className="WoBtns"
              onClick={() => GetWorkoutById(documentID)}
              >
              <img
                id="EditBtn"
                src={Edit}
                alt="Edit Button"
                title="Edit this routine"
                />
            </Link>
            <img
              className="WoBtns"
              src={Delete}
              alt="Delete Button"
              title="Delete this routine"
              onClick={() => DeleteCurrentRoutine(documentID)}
              />
          </div>

        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default WorkoutButtons;
