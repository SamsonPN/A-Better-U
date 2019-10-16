import React, { Component } from 'react';
import BodyOptions from './BodyOptions.jsx';
import {default as EtOptions} from './ExerciseTypeOptions.jsx';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class AddExerciseHeader extends Component {
  render() {
    return (
      <AddExerciseContext.Consumer>
        { ({ GetFavorites, SearchExercise }) => (
          <div id="AddExerciseHeader">
            <h1 id="AddExerciseName">Add Exercises</h1>

            <textarea
              id="ExerciseSearchBar"
              placeholder="Search for Exercises"
              onKeyPress={(e) => SearchExercise(e)}>
            </textarea>

            <div id="AddExerciseOptionsWrapper">
              <BodyOptions />
              <EtOptions />
              <button
                id="AddExerciseFavoriteBtn"
                onClick={() => GetFavorites()}
              >
              Favorites
              </button>
            </div>
          </div>
        )}
      </AddExerciseContext.Consumer>
    );
  }

}

export default AddExerciseHeader;
