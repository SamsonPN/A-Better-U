import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';

class AddExerciseItem extends Component {

  render() {
    return (
      <div className="AddExerciseItem">
        <p>Exercise</p>
        <div id="AddExerciseCheckboxWrapper">
          <div id="AddExerciseCheckBox" title="Click to add food"></div>
          <img id="AddExerciseFavorite" src={Heart} alt="Favorites Icon" title="Click to add to favorites"/>
        </div>
      </div>
    );
  }

}

export default AddExerciseItem;
