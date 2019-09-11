import React, { Component } from 'react';
import {default as EItem} from './AddExerciseListItems.jsx';

class AddExerciseList extends Component {

  render() {
    const exercises = this.props.exercises.map((exercise) =>
      <EItem
        key={exercise.name+exercise.muscle+exercise.type}
        name={exercise.name}
        muscle={exercise.muscle}
        type={exercise.type}
        AddExercise={this.props.AddExercise}
      />
    )
    return (
      <div id="AddExerciseList">
        {exercises}
      </div>
    );
  }

}

export default AddExerciseList;
