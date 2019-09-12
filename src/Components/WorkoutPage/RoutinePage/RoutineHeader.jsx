import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoutineHeader extends Component {
  //might add states here for whether placeholder is empty or not
  //if it is empty, then revert to Routine Name, else, don't do anything
  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  render() {
    return (
      <div id="RoutineHeader">
        <div id="RoutineHeaderWrapper">
          <textarea id="RoutineName" defaultValue={this.props.RoutineName} onKeyPress={this.PreventEnter}></textarea>
          <Link id="RoutineFinish" to="/workout" onClick={this.props.store}>Finish</Link>
        </div>
      </div>
    );
  }

}

export default RoutineHeader;
