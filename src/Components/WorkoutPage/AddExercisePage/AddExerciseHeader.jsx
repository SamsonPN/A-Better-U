import React, { Component } from 'react';
import BodyOptions from './BodyOptions.jsx';
import {default as EtOptions} from './ExerciseTypeOptions.jsx';

class AddExerciseHeader extends Component {

  render() {
    return (
      <div id="AddExerciseHeader">
        <h1 id="AddExerciseName">Add Exercises</h1>

        <textarea id="ExerciseSearchBar">Search for Exercises</textarea>

        <div id="AddExerciseOptionsWrapper">
          <BodyOptions/>
          <EtOptions/>
          <button id="AddExerciseFavoriteBtn">Favorite</button>
        </div>

      </div>
    );
  }

}

export default AddExerciseHeader;
