import React, { Component } from 'react';
import {default as RI} from './CurrentRoutineItems.jsx';

class CurrentRoutine extends Component {
  render() {
    const exercises = this.props.currentRoutine.map( (item, i) =>
      <RI
        key={item.name + item.type + item.muscle}
        name={item.name}
        type={item.type}
        index={i}
        sets={item.sets}
        DeleteSet={this.props.DeleteSet}
        AddSet={this.props.AddSet}
        save={this.props.save}
      />
    )
    return (
      <div id="CurrentRoutine">
        {this.props.currentRoutine.length === 0 ?
          <p className="EmptyRoutineMsg">Please add a routine or choose one from the dropdown above</p>
          :
          <div id="CurrentRoutineTitle">
            <p>Routine: {this.props.routineName}</p>
            <p>Date: {this.props.routineDate}</p>
          </div>
        }
        {exercises}
      </div>
    );
  }

}

export default CurrentRoutine;
