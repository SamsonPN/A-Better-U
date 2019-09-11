import React, { Component } from 'react';
import {default as Li} from './RoutineListItems.jsx';

class RoutineList extends Component {

  render() {
    const exercises = this.props.exercises.map( item => (
      <Li key={item.name + item.type + item.muscle} name={item.name} type={item.type} />
    ))
    return (
      <div id="RoutineList">
        {exercises}
      </div>
    );
  }

}

export default RoutineList;
