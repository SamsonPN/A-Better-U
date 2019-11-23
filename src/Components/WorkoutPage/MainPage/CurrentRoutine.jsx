import React, { Component } from 'react';
import RI from './CurrentRoutineItems.jsx';
import WorkoutButtons from './WorkoutButtons';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class CurrentRoutine extends Component {
  static contextType = WorkoutContext;
  render() {
    const {currentRoutine, workoutDate, tab} = this.context;
    const collection = tab === 'Saved' ? 'Workout' : 'Routine';
    const exercises = currentRoutine.exercises || [];
    const exerciseItems = exercises.map( (exercise, i) =>
      <RI
        key={exercise.name + exercise.type + exercise.muscle}
        muscle={exercise.muscle}
        name={exercise.name}
        type={exercise.type}
        index={i}
        sets={exercise.sets}
        workoutIndex={""}
      />
    )
    return (
      <React.Fragment>
        {exercises.length === 0 ?
          <p className="EmptyRoutineMsg">Please add a routine or choose one from the dropdown above</p>
          :
          <div className="CurrentRoutineWorkouts">
            <div className="CurrentRoutineWorkoutsHeader">
              <div className="CurrentRoutineWorkoutsTitle">
                <p>{collection}: <span>{currentRoutine.name}</span></p>
                <p><span>Date:</span> {workoutDate}</p>
              </div>
              <WorkoutButtons
                documentID={currentRoutine._id}
                collection={"routines"}
                workoutIndex={""}
              />
            </div>
            {exerciseItems}
        </div>
        }
     </React.Fragment>
    );
  }

}

export default CurrentRoutine;
