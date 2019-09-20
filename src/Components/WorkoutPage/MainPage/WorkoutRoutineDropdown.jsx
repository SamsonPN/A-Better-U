import React, { Component } from 'react';

class WorkoutRoutineDropdown extends Component {
  render() {
    const routines = this.props.routines.map( (item, i) =>
      <RoutineDropdownItem key={item.name+i} name={item.name} exercises={item.exercises} showRoutine={this.props.showRoutine}/>
    );

    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Routine</div>
        <ul className="WoViewsDropdown">
          {routines}
        </ul>
      </div>
    );
  }

}

export default WorkoutRoutineDropdown;

class RoutineDropdownItem extends Component {
  render() {
    const {name, exercises} = this.props;
    return (
      <a className="WoDropdownItem" href='#!' onClick={() => this.props.showRoutine(name, exercises, '', 'Routine')}>{name}</a>
    );
  }
}
