import React, { Component } from 'react';
import RI from './CurrentRoutineItems';
import WorkoutButtons from './WorkoutButtons';

class CurrentWorkouts extends Component {
  render() {
    const {workout, workoutIndex} = this.props;
    const exerciseItems = workout.exercises.map( (exercise, i) =>
      <RI
        key={exercise.name + exercise.type + exercise.muscle}
        muscle={exercise.muscle}
        name={exercise.name}
        type={exercise.type}
        index={i}
        sets={exercise.sets}
        workoutIndex={workoutIndex}
      />
    )
    return (
      <div className="CurrentRoutineWorkouts">
        <div className="CurrentRoutineWorkoutsHeader">
          <div className="CurrentRoutineWorkoutsTitle">
            <p><span>Routine:</span> {workout.name}</p>
            <p><span>Date:</span> {workout.date}</p>
          </div>
          <WorkoutButtons
            documentID={workout._id}
            collection={"workouts"}
            workoutIndex={workoutIndex}
          />
        </div>
        {exerciseItems}
      </div>
    );
  }

}

export default CurrentWorkouts;
