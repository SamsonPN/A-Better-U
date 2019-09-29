import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';

class AddExerciseItem extends Component {

  render() {
    const {name, type, muscle, AddExercise, FavoriteExercise} = this.props;
    const id = name + type + muscle;

    return (
      <div className="AddExerciseItem">
        <p>{name} ({type})</p>
        <div className="AddExerciseCheckboxWrapper">
          <div
            id={id + 'checkbox'}
            className="AddExerciseCheckBox"
            title="Click to add food"
            onClick={() => AddExercise(name, type, muscle)}>
          </div>
          <img
            id={id + 'favorite'}
            className="AddExerciseFavorite"
            src={Heart}
            alt="Favorites Icon"
            title="Click to add to favorites"
            onClick={(e) => FavoriteExercise(name, type, muscle, e)}/>
        </div>
      </div>
    );
  }

}

export default AddExerciseItem;
