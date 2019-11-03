import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoutineFooter extends Component {
  render() {
    const {collection, id} = this.props.match.params;
    const _id = id === 'new' ? id + '1' : id;
    return (
      <div id="RoutineFooter">
        <Link
          id="RoutineBtn"
          className="FooterBtns"
          to={`/workout/routineview/${collection}/${_id}`}>
          Routine
        </Link>
        <Link
          id="ExerciseBtn"
          className="FooterBtns"
          to={`/workout/addroutine/${collection}/${_id}`}>
          Exercise
        </Link>
      </div>
    );
  }

}

export default RoutineFooter;
