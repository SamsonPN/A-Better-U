import React, { Component } from 'react';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class WorkoutRoutineDropdown extends Component {
  static contextType = WorkoutContext;
  render() {
    const {routines} = this.context;
    const routineItems = routines.map( (item) =>
      <RoutineDropdownItem
        key={item._id}
        _id={item._id}
        name={item.name}
        exercises={item.exercises}
      />
    );

    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Routine</div>
        <ul className="WoViewsDropdown">
          {routineItems}
        </ul>
      </div>
    );
  }

}

export default WorkoutRoutineDropdown;

class RoutineDropdownItem extends Component {
  render() {
    const {name} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ ShowRoutine }) => (
          <a
            className="WoDropdownItem"
            href='#!'
            onClick={() => ShowRoutine({...this.props}, 'Routine')}
          >
            {name}
          </a>
        )}
      </WorkoutContext.Consumer>
    );
  }
}
