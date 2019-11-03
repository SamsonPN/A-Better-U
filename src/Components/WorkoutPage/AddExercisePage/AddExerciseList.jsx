import React, { Component } from 'react';
import EItem from './AddExerciseListItems.jsx';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class AddExerciseList extends Component {
  static contextType = AddExerciseContext;
  render() {
    const exercises = this.context.exercises.map((exercise) =>
      <EItem
        key={exercise.name+exercise.muscle+exercise.type}
        name={exercise.name}
        muscle={exercise.muscle}
        type={exercise.type}
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
