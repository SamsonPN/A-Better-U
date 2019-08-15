import React, { Component } from 'react';
import WoWrapper from './WorkoutViewWrapper.jsx';
import CurrentRoutine from './CurrentRoutine.jsx';
import AddRoutineBtn from '../../../assets/add-routine.svg';
import EditBtn from '../../../assets/edit-button.svg';
import {Link} from 'react-router-dom';

class Workout extends Component {

  render() {
    return (
      <div id="WoContainer">
        <WoWrapper />
        <CurrentRoutine/>
        <Link to="/workout/routineview"><img id="routineBtn" src={AddRoutineBtn} alt="No button uploaded" title="Add a routine"/></Link>
        <img id="editBtn" src={EditBtn} alt="Edit Button" title="Edit this routine"/>
      </div>
    );
  }

}

export default Workout;
