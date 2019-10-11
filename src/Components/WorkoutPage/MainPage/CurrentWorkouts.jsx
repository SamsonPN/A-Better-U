import React, { Component } from 'react';
import RI from './CurrentRoutineItems';

class CurrentWorkouts extends Component {
  render() {
    const {workout} = this.props;
    const exerciseItems = workout.exercises.map( (exercise, i) =>
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
        <div className="CurrentRoutineWorkoutsTitle">
            <p><span>Workout:</span> {workout.name}</p>
            <p><span>Date:</span> {workout.date}</p>
        </div>
        {exerciseItems}
      </div>
    );
  }

}

export default CurrentWorkouts;
