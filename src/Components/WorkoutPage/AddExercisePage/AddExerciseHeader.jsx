import React, { Component } from 'react';
import BodyOptions from './BodyOptions.jsx';
import {default as EtOptions} from './ExerciseTypeOptions.jsx';

class AddExerciseHeader extends Component {
  render() {
    return (
      <div id="AddExerciseHeader">
        <h1 id="AddExerciseName">Add Exercises</h1>

        <textarea id="ExerciseSearchBar" placeholder="Search for Exercises" onKeyPress={this.props.search}></textarea>

        <div id="AddExerciseOptionsWrapper">
          <BodyOptions muscles={this.props.muscles} searchCategory={this.props.searchCategory}/>
          <EtOptions types={this.props.types} searchCategory={this.props.searchCategory}/>
          <button id="AddExerciseFavoriteBtn">Favorite</button>
        </div>

      </div>
    );
  }

}

export default AddExerciseHeader;
