import React, { Component } from 'react';
import {default as Li} from './RoutineListItems.jsx';

class RoutineList extends Component {

  render() {
    return (
      <div id="RoutineList">
        <Li/>
        <Li/>
        <Li/>
        <Li/>
        <Li/>
      </div>
    );
  }

}

export default RoutineList;
