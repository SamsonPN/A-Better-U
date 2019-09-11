import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';

class AddExerciseItem extends Component {

  render() {
    const {name, type, muscle} = this.props;
    const id = name + type + muscle + 'checkbox';
    return (
      <div className="AddExerciseItem">
        <p>{name} ({type})</p>
        <div className="AddExerciseCheckboxWrapper">
          <div
            id={id}
            className="AddExerciseCheckBox"
            title="Click to add food"
            onClick={this.props.AddExercise.bind(this, name, type, muscle)}>
          </div>
          <img className="AddExerciseFavorite" src={Heart} alt="Favorites Icon" title="Click to add to favorites"/>
        </div>
      </div>
    );
  }

}

export default AddExerciseItem;
