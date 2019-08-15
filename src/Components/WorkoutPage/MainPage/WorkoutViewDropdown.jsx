import React, { Component } from 'react';

class WorkoutViewDropdown extends Component {

  render() {
    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">View</div>
        <ul className="WoViewsDropdown">
          <a className="WoDropdownItem" href="#!">Weekly</a>
          <a className="WoDropdownItem" href="#!">Monthly</a>
          <a className="WoDropdownItem" href="#!">All-Time</a>
        </ul>
      </div>

    );
  }

}

export default WorkoutViewDropdown;
