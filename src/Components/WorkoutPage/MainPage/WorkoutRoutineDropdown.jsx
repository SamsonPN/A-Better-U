import React, { Component } from 'react';

class WorkoutRoutineDropdown extends Component {

  render() {
    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Routine</div>
        <ul className="WoViewsDropdown">
          <RoutineDropdownItem ListNum="1"/>
          <RoutineDropdownItem ListNum="2"/>
          <RoutineDropdownItem ListNum="3"/>
          <RoutineDropdownItem ListNum="4"/>
          <RoutineDropdownItem ListNum="5"/>
        </ul>
      </div>

    );
  }

}

export default WorkoutRoutineDropdown;

class RoutineDropdownItem extends Component {

  render() {
    return (
      <a className="WoDropdownItem" href='#!'>Routine {this.props.ListNum}</a>
    );
  }
}
