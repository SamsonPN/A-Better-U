import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter';
import AddExerciseHeader from './AddExerciseHeader';
import EList from './AddExerciseList';

class AddExerciseView extends Component {
  render() {
    return (
      <div id="AddExerciseView">
        <AddExerciseHeader />
        <EList />
        <RoutineFooter {...this.props}/>
      </div>
    );
  }

}

export default AddExerciseView;
