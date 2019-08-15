/*
Full component for the routine viewer where people can add/edit/delete routines from their full exercise
*/
import React, { Component } from 'react';

import RoutineHeader from './RoutineHeader.jsx';
import RoutineList from './RoutineList.jsx';
import RoutineFooter from './RoutineFooter.jsx';


class RoutineView extends Component {

  render() {
    return (
      <div>
          <RoutineHeader/>
          <RoutineList/>
          <RoutineFooter/>
      </div>
    );
  }

}

export default RoutineView;
