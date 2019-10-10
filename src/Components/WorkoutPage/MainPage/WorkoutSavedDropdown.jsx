import React, { Component } from 'react';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class WorkoutSavedDropdown extends Component {
  static contextType = WorkoutContext;
  render() {
    const savedWorkouts = this.context.savedWorkouts.map( item =>
      <DropdownItem
        key={item._id}
        objectID={item._id}
        name={item.name}
        date={item.date}
      />
    )

    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Saved</div>
        <ul className="WoViewsDropdown">
        {savedWorkouts}
        </ul>
      </div>

    );
  }
}
export default WorkoutSavedDropdown;

class DropdownItem extends Component {
  render() {
    const {date, name, objectID} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ GetWorkoutById }) => (
          <a
            className="WoDropdownItem"
            href="#!"
            onClick={() => GetWorkoutById(objectID)}
          >
         {date} : {name}
          </a>
        )}
      </WorkoutContext.Consumer>
    );
  }
}
