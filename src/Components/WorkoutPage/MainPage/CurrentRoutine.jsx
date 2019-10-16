import React, { Component } from 'react';
import RI from './CurrentRoutineItems.jsx';
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
        name={exercise.name}
        type={exercise.type}
        index={i}
        sets={exercise.sets}
      />
    )
    return (
      <div className="CurrentRoutineWorkouts">
        { exercises.length === 0 ?
          <p className="EmptyRoutineMsg">Please add a routine or choose one from the dropdown above</p>
          :
          <div className="CurrentRoutineWorkoutsTitle">
              <p>{collection}: {currentRoutine.name}</p>
              <p>Date: {workoutDate}</p>
          </div>
        }
        {exerciseItems}
      </div>
    );
  }

}

export default CurrentRoutine;
