import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoutineHeader extends Component {
  //might add states here for whether placeholder is empty or not
  //if it is empty, then revert to Routine Name, else, don't do anything
  render() {
    return (
      <div id="RoutineHeader">
        <div id="RoutineHeaderWrapper">
          <textarea id="RoutineName" placeholder="Routine Name"></textarea>
          <Link id="RoutineFinish" to="/workout">Finish</Link>
        </div>
      </div>
    );
  }

}

export default RoutineHeader;
