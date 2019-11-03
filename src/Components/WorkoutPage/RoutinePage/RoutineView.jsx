import React, { Component } from 'react';
import RoutineHeader from './RoutineHeader';
import RoutineList from './RoutineList';
import RoutineFooter from './RoutineFooter';
import {WorkoutContext} from '../../../AppContext/ExportContexts';
import './Routine.css';

class RoutineView extends Component {
  static contextType = WorkoutContext;

  componentDidMount(){
    let {match} = this.props;
    if (match.params.id === 'new'){
      this.context.InsertNewRoutine()
    }
  }
  render() {
    return (
      <div id="RoutineView">
        <RoutineHeader {...this.props}/>
        <RoutineList />
        <RoutineFooter {...this.props}/>
      </div>
    );
  }
}

export default RoutineView;
