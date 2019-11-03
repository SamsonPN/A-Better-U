import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter';
import AddExerciseHeader from './AddExerciseHeader';
import EList from './AddExerciseList';
import {WorkoutContext} from '../../../AppContext/ExportContexts';
import './AddExercise.css';

class AddExerciseView extends Component {
  static contextType = WorkoutContext;
  componentDidMount(){
    let {currentRoutine, InsertNewRoutine} = this.context;
    if(Object.keys(currentRoutine).length === 0){
      InsertNewRoutine()
    }
  }
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
