import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class AddExerciseItem extends Component {

  render() {
    const {name, type, muscle} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ AddExercise, FavoriteExercise }) => (
          <div className="AddExerciseItem">
            <p>{type} {name} ({muscle})</p>
            <div className="AddExerciseCheckboxWrapper">
              <div
                className="AddExerciseCheckBox"
                title="Click to add food"
                onClick={(e) => AddExercise(e, {...this.props})}>
              </div>
              <img
                className="AddExerciseFavorite"
                src={Heart}
                alt="Favorites Icon"
                title="Click to add to favorites"
                onClick={(e) => FavoriteExercise(e, {...this.props})}/>
            </div>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default AddExerciseItem;
