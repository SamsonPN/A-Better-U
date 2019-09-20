import React, { Component } from 'react';

class WorkoutSavedDropdown extends Component {
  render() {
    const workouts = this.props.workouts.map( item =>
      <DropdownItem key={item.name + item.date} workout={item} showRoutine={this.props.showRoutine}/>
    )

    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Saved</div>
        <ul className="WoViewsDropdown">
        {workouts}
        </ul>
      </div>

    );
  }
}
export default WorkoutSavedDropdown;

class DropdownItem extends Component {
  render() {
    const {name, date, exercises} = this.props.workout;
    return (
      <a className="WoDropdownItem" href="#!" onClick={() => this.props.showRoutine(name, exercises, date, 'Saved')}>{date} : {name}</a>
    );
  }
}
