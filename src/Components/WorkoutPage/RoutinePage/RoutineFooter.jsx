import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoutineFooter extends Component {

  render() {
    return (
      <div id="RoutineFooter">
        <Link id="RoutineBtn" className="FooterBtns" to="/workout/routineview">Routine</Link>
        <Link id="ExerciseBtn" className="FooterBtns"to="/workout/addroutine">Exercise</Link>
      </div>
    );
  }

}

export default RoutineFooter;
