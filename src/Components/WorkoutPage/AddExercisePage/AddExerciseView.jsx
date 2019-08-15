/*
Component for Add Exercise page where users can search for and select exercises for their routine
*/
import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter.jsx';
import AddExerciseHeader from './AddExerciseHeader.jsx';
import {default as EList} from './AddExerciseList.jsx';

class AddExerciseView extends Component {

  render() {
    return (
      <div id="AddExerciseView">
        <AddExerciseHeader/>
        <EList/>
        <RoutineFooter/>
      </div>
    );
  }

}

export default AddExerciseView;
