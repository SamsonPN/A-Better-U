import React, { Component } from 'react';

class RoutineListItems extends Component {

  render() {
    return (
      <div className="RoutineLi">
        <p className="RoutineLiInfo">Exercise Name (Exercise Type)</p>
        <p className="RoutineLiInfo RoutineLiDelBtn">X</p>
      </div>
    );
  }

}

export default RoutineListItems;
