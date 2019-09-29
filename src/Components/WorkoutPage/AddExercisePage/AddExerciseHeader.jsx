import React, { Component } from 'react';
import BodyOptions from './BodyOptions.jsx';
import {default as EtOptions} from './ExerciseTypeOptions.jsx';

class AddExerciseHeader extends Component {
  render() {
    const {getFavorites, search, searchCategory} = this.props;
    return (
      <div id="AddExerciseHeader">
        <h1 id="AddExerciseName">Add Exercises</h1>

        <textarea id="ExerciseSearchBar" placeholder="Search for Exercises" onKeyPress={search}></textarea>

        <div id="AddExerciseOptionsWrapper">
          <BodyOptions muscles={this.props.muscles} searchCategory={searchCategory}/>
          <EtOptions types={this.props.types} searchCategory={searchCategory}/>
          <button id="AddExerciseFavoriteBtn" onClick={() => getFavorites()}>Favorites</button>
        </div>

      </div>
    );
  }

}

export default AddExerciseHeader;
