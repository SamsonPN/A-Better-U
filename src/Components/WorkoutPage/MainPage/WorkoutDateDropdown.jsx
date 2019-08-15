import React, { Component } from 'react';

class WorkoutDateDropdown extends Component {

  render() {
    return (
      <div className="WoDropdownDiv">
        <div className="WoViews">Date</div>
        <ul className="WoViewsDropdown">
          <a className="WoDropdownItem" href="#!">08/14/2019</a>
          <a className="WoDropdownItem" href="#!">08/13/2019</a>
          <a className="WoDropdownItem" href="#!">08/12/2019</a>
          <a className="WoDropdownItem" href="#!">08/11/2019</a>
          <a className="WoDropdownItem" href="#!">08/10/2019</a>
          <a className="WoDropdownItem" href="#!">08/09/2019</a>
          <a className="WoDropdownItem" href="#!">08/08/2019</a>
        </ul>
      </div>

    );
  }

}

export default WorkoutDateDropdown;
